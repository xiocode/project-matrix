import type {EntityWatcher, EntityWatchHandlerContext, IRpdServer} from "@ruiapp/rapid-core";
import {map, uniqWith} from "lodash";
import {MomInventoryOperationType} from "~/_definitions/meta/data-dictionary-types";
import {
  type BaseLot,
  MomGood,
  MomGoodTransfer,
  type MomInspectionSheet,
  type MomInventoryBusinessType,
  type MomInventoryOperation,
  MomInventoryStatTable,
  MomInventoryStatTrigger,
  type SaveBaseLotInput,
  type SaveMomInspectionSheetInput,
} from "~/_definitions/meta/entity-types";
import InventoryStatService, {StatTableConfig} from "~/services/InventoryStatService";

export default [
  {
    eventName: "entity.create",
    modelSingularCode: "mom_inventory_operation",
    handler: async (ctx: EntityWatchHandlerContext<"entity.create">) => {
      const {server, payload} = ctx;
      const changes = payload.after;
      try {
        if (changes?.application_id) {
          const applicationManager = server.getEntityManager<MomGood>("mom_inventory_application");
          await applicationManager.updateEntityById({
            id: changes.application_id,
            entityToSave: {
              operationState: "processing",
            },
          });
        }
      } catch (e) {
        console.error(e);
      }
    },
  },
  {
    eventName: "entity.delete",
    modelSingularCode: "mom_good_transfer",
    handler: async (ctx: EntityWatchHandlerContext<"entity.delete">) => {
      const {server, payload} = ctx;
      const changes = payload.before;
      try {
        const momInventoryOperation = await server.getEntityManager<MomInventoryOperation>("mom_inventory_operation").findById(changes.operation_id);

        if (momInventoryOperation?.operationType === "in") {
          if (changes.good_id) {
            const goodManager = server.getEntityManager<MomGood>("mom_good");
            const good = await goodManager.findById(changes.good_id);

            if (good) {
              await goodManager.deleteById(good.id);
            }
          }
        }
      } catch (e) {
        console.error(e);
      }
    },
  },
  {
    eventName: "entity.update",
    modelSingularCode: "mom_inventory_operation",
    handler: async (ctx: EntityWatchHandlerContext<"entity.update">) => {
      const {server, payload} = ctx;
      const changes: Partial<MomInventoryOperation> = payload.changes;
      const after = payload.after;
      if (after.operationType === "in") {
        if (changes.hasOwnProperty("state") && changes.state === "done") {
          const transfers = await listTransfersOfOperation(server, after.id);

          const businessTypeManager = server.getEntityManager<MomInventoryBusinessType>("mom_inventory_business_type");
          const businessType = await businessTypeManager.findById(after.business_id);

          for (const transfer of transfers) {
            // 生成批次信息
            try {
              await saveMaterialLotInfo(server, {
                lotNum: transfer.lotNum,
                material: {id: (transfer as any).material_id},
                sourceType: businessType?.config?.defaultSourceType || null,
                qualificationState: businessType?.config?.defaultQualificationState || "qualified",
                isAOD: false,
              });
            } catch (e) {
              console.error(e);
            }

          }

          if (businessType?.name === "采购入库") {
            const materialLotsToInspect = uniqWith(
              map(transfers, (item) => {
                return {material_id: (item as any).material_id, lot_num: item.lotNum};
              }),
              (item1, item2) => {
                return item1.material_id === item2.material_id && item1.lot_num === item2.lot_num;
              },
            );

            for (const materialLot of materialLotsToInspect) {
              await saveInspectionSheet(server, {
                inventoryOperation: {id: after.id},
                lotNum: materialLot.lot_num,
                material: {id: materialLot.material_id},
                state: "pending",
              });
            }
          }
        }

        if (changes.hasOwnProperty("approvalState") && changes.approvalState === "approved") {
          const transfers = await listTransfersOfOperation(server, after.id);

          await updateInventoryStats(server, after.business_id, after.operationType, transfers);
        }
      }

      if (after.operationType === "out") {
        if (changes.hasOwnProperty("approvalState") && changes.approvalState === "approved") {
          const transfers = await server.queryDatabaseObject(`select * from mom_good_transfers where operation_id=$1;`, [after.id]);

          await updateInventoryStats(server, after.business_id, after.operationType, transfers);
        }
      }
    },
  },
] satisfies EntityWatcher<any>[];

async function listTransfersOfOperation(server: IRpdServer, operationId: number) {
  const transferManager = server.getEntityManager<MomGoodTransfer>("mom_good_transfer");

  return await transferManager.findEntities({
    filters: [
      {
        operator: "eq",
        field: "operation_id",
        value: operationId,
      },
    ],
    keepNonPropertyFields: true,
  });
}

async function updateInventoryStats(server: IRpdServer, businessId: number, operationType: MomInventoryOperationType, transfers: any[]) {
  const businessTypeManager = server.getEntityManager<MomInventoryBusinessType>("mom_inventory_business_type");
  const businessType = await businessTypeManager.findById(businessId);
  if (!businessType) {
    return;
  }

  const statTriggerName = businessType?.config?.statTriggerName;

  let quantityFieldsToIncrease: string[] = [];
  let quantityFieldsToDecrease: string[] = [];
  const defaultGroupFields = ["material_id", "tags"];
  if (statTriggerName) {
    const statTriggerManager = server.getEntityManager<MomInventoryStatTrigger>("mom_inventory_stat_trigger");
    const statTrigger = await statTriggerManager.findEntity({
      filters: [
        {
          operator: "eq",
          field: "name",
          value: businessType.config?.statTriggerName,
        },
      ],
    });

    quantityFieldsToIncrease = statTrigger?.config?.quantityFieldsToIncrease || [];
    quantityFieldsToDecrease = statTrigger?.config?.quantityFieldsToDecrease || [];
  }

  const statTableManager = server.getEntityManager<MomInventoryStatTable>("mom_inventory_stat_table");
  const statTables = await statTableManager.findEntities({});

  const inventoryStatService = new InventoryStatService(server);
  for (const transfer of transfers) {
    for (const statTable of statTables) {
      const statTableConfig: StatTableConfig = statTable.config as any;
      const quantityBalanceFields: string[] = statTableConfig.quantityBalanceFields;
      if (!quantityBalanceFields) {
        continue;
      }

      const groupFields: string[] = statTableConfig.groupFields || defaultGroupFields;
      let quantityChange = transfer.quantity;
      if (operationType === "out") {
        quantityChange *= -1;
      }

      await inventoryStatService.changeInventoryQuantities({
        balanceEntityCode: statTableConfig.balanceEntityCode,
        logEntityCode: statTableConfig.logEntityCode,
        quantityBalanceFields: quantityBalanceFields,
        quantityChangeFields: statTableConfig.quantityChangeFields,
        groupFields: groupFields,
        groupValues: transfer,
        quantityFieldsToIncrease,
        quantityFieldsToDecrease,
        change: quantityChange,
      });
    }
  }
}

async function saveMaterialLotInfo(server: IRpdServer, lot: SaveBaseLotInput) {
  if (!lot.lotNum || !lot.material || !lot.material.id) {
    throw new Error("lotNum and material are required when saving lot info.");
  }

  const baseLotManager = server.getEntityManager<BaseLot>("base_lot");
  const lotInDb = await baseLotManager.findEntity({
    filters: [
      {
        operator: "eq",
        field: "lot_num",
        value: lot.lotNum,
      },
      {
        operator: "eq",
        field: "material_id",
        value: lot.material.id,
      },
    ],
  });

  if (!lotInDb) {
    return await baseLotManager.createEntity({
      entity: lot,
    });
  }

  return lotInDb;
}

async function saveInspectionSheet(server: IRpdServer, sheet: SaveMomInspectionSheetInput) {
  if (!sheet.lotNum || !sheet.material || !sheet.material.id) {
    throw new Error("lotNum and material are required when saving lot info.");
  }

  const inspectionSheetManager = server.getEntityManager<MomInspectionSheet>("mom_inspection_sheet");
  const lotInDb = await inspectionSheetManager.findEntity({
    filters: [
      {
        operator: "eq",
        field: "lot_num",
        value: sheet.lotNum,
      },
      {
        operator: "eq",
        field: "material_id",
        value: sheet.material.id,
      },
    ],
  });

  if (!lotInDb) {
    return await inspectionSheetManager.createEntity({
      entity: sheet,
    });
  }

  return lotInDb;
}

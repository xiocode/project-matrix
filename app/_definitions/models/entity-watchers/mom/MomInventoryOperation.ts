import type { EntityWatchHandlerContext, EntityWatcher, IRpdServer } from "@ruiapp/rapid-core";
import { map, uniqBy, uniqWith } from "lodash";
import type { MomInventoryBusinessType, BaseLot, MomInventory, MomInventoryOperation, SaveBaseLotInput, SaveMomInspectionSheetInput, MomInspectionSheet } from "~/_definitions/meta/entity-types";

export default [
  {
    eventName: "entity.update",
    modelSingularCode: "mom_inventory_operation",
    handler: async (ctx: EntityWatchHandlerContext<"entity.update">) => {
      const { server, payload } = ctx;
      const changes: Partial<MomInventoryOperation> = payload.changes;
      const after = payload.after;
      if (after.operationType === "in") {
        if (changes.hasOwnProperty('state') && changes.state === "done") {
          const transfers = await server.queryDatabaseObject(
            `select * from mom_good_transfers where operation_id=$1;`,
            [after.id]
            );

          const businessTypeManager = server.getEntityManager<MomInventoryBusinessType>('mom_inventory_business_type');
          const businessType = await businessTypeManager.findById(after.business_id);

          for (const transfer of transfers) {
            // 生成批次信息
            await saveMaterialLotInfo(server, {
              lotNum: transfer.lot_num,
              material: { id: transfer.material_id },
              sourceType: businessType?.config?.defaultSourceType || null,
              qualificationState: businessType?.config?.defaultQualificationState || "qualified",
              isAOD: false,
            });
          }

          const materialLotsToInspect = uniqWith(map(transfers, (item) => { return {material_id: item.material_id, lot_num: item.lot_num }}), (item1, item2) => {
            return item1.material_id === item2.material_id && item1.lot_num === item2.lot_num;
          });

          for (const materialLot of materialLotsToInspect) {
            await saveInspectionSheet(server, {
              lotNum: materialLot.lot_num,
              material: { id: materialLot.material_id },
              state: "pending",
            });
          }
        }

        if (changes.hasOwnProperty('approvalState') && changes.approvalState === "approved") {
          const transfers = await server.queryDatabaseObject(
            `select * from mom_good_transfers where operation_id=$1;`,
            [after.id]
            );

          const inventoryManager = server.getEntityManager<MomInventory>('mom_inventory');

          for (const transfer of transfers) {
            // 更新库存量
            let inventory = await inventoryManager.findEntity({
              filters: [
                {
                  operator: 'eq',
                  field: 'material_id',
                  value: transfer.material_id,
                },
                {
                  operator: 'eq',
                  field: 'tags',
                  value: transfer.tags || "",
                },
              ]
            })

            if (!inventory) {
              await inventoryManager.createEntity({
                entity: {
                  material: { id: transfer.material_id },
                  unit: transfer.unit_id,
                  lotNum: transfer.lot_num || "",
                  tags: transfer.tags || "",
                  allocableQuantity: transfer.quantity,
                  availableQuantity: transfer.quantity,
                  onHandQuantity: transfer.quantity,
                  onOrderQuantity: 0,
                  intransitQuantity: 0,
                  processingQuantity: 0,
                  processedQuantity: 0,
                  yieldQuantity: 0,
                  reservedQuantity: 0,
                  allocatedQuantity: 0,
                  shippingQuantity: 0,
                  deliveredQuantity: 0,
                } as Partial<MomInventory>
              });
            } else {
              await inventoryManager.updateEntityById({
                id: inventory.id,
                entityToSave: {
                  allocableQuantity: inventory.allocableQuantity + transfer.quantity,
                  availableQuantity: inventory.availableQuantity + transfer.quantity,
                  onHandQuantity: inventory.onHandQuantity + transfer.quantity,
                } as Partial<MomInventory>
              });
            }
          }
        }
      }

      if (after.operationType === "out") {
        if (!changes.hasOwnProperty('approvalState') || changes.approvalState !== "approved") {
          return;
        }

        const transfers = await server.queryDatabaseObject(
          `select * from mom_good_transfers where operation_id=$1;`,
          [after.id]
          );

        const inventoryManager = server.getEntityManager<MomInventory>('mom_inventory');

        for (const transfer of transfers) {
          let inventory = await inventoryManager.findEntity({
            filters: [
              {
                operator: 'eq',
                field: 'material_id',
                value: transfer.material_id,
              },
              {
                operator: 'eq',
                field: 'tags',
                value: transfer.tags || "",
              },
            ]
          })

          if (!inventory) {
            await inventoryManager.createEntity({
              entity: {
                material: { id: transfer.material_id },
                unit: transfer.unit_id,
                lotNum: transfer.lot_num || "",
                tags: transfer.tags || "",
                allocableQuantity: 0,
                availableQuantity: 0,
                onHandQuantity: 0,
                onOrderQuantity: 0,
                intransitQuantity: 0,
                processingQuantity: 0,
                processedQuantity: 0,
                yieldQuantity: 0,
                reservedQuantity: 0,
                allocatedQuantity: 0,
                shippingQuantity: 0,
                deliveredQuantity: 0,
              } as Partial<MomInventory>
            });
          } else {
            await inventoryManager.updateEntityById({
              id: inventory.id,
              entityToSave: {
                allocableQuantity: (inventory.allocableQuantity || 0) - transfer.quantity,
                availableQuantity: (inventory.availableQuantity || 0) - transfer.quantity,
                onHandQuantity: (inventory.onHandQuantity || 0) - transfer.quantity,
              } as Partial<MomInventory>
            });
          }
        }
      }
    }
  },
] satisfies EntityWatcher<any>[];



async function saveMaterialLotInfo(server: IRpdServer, lot: SaveBaseLotInput) {
  if (!lot.lotNum || !lot.material || !lot.material.id) {
    throw new Error('lotNum and material are required when saving lot info.');
  }

  const baseLotManager = server.getEntityManager<BaseLot>("base_lot");
  const lotInDb = await baseLotManager.findEntity({
    filters: [
      {
        operator: 'eq',
        field: 'lot_num',
        value: lot.lotNum,
      },
      {
        operator: 'eq',
        field: 'material_id',
        value: lot.material.id,
      },
    ]
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
    throw new Error('lotNum and material are required when saving lot info.');
  }

  const inspectionSheetManager = server.getEntityManager<MomInspectionSheet>("mom_inspection_sheet");
  const lotInDb = await inspectionSheetManager.findEntity({
    filters: [
      {
        operator: 'eq',
        field: 'lot_num',
        value: sheet.lotNum,
      },
      {
        operator: 'eq',
        field: 'material_id',
        value: sheet.material.id,
      },
    ]
  });

  if (!lotInDb) {
    return await inspectionSheetManager.createEntity({
      entity: sheet,
    });
  }

  return lotInDb;
}
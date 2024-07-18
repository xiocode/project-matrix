import type {EntityWatcher, EntityWatchHandlerContext, IRpdServer} from "@ruiapp/rapid-core";
import {MomInventoryOperationType} from "~/_definitions/meta/data-dictionary-types";
import {
  KisConfig,
  MomGood,
  MomGoodTransfer,
  MomInventoryApplication,
  type MomInventoryBusinessType,
  type MomInventoryOperation,
  MomInventoryStatTable,
  MomInventoryStatTrigger,
  MomWarehouse,
  SaveBaseLotInput, SaveMomGoodInput, SaveMomInventoryOperationInput,
} from "~/_definitions/meta/entity-types";
import InventoryStatService, {StatTableConfig} from "~/services/InventoryStatService";
import KisHelper from "~/sdk/kis/helper";
import KisInventoryOperationAPI from "~/sdk/kis/inventory";
import rapidApi from "~/rapidApi";

export default [
  {
    eventName: "entity.create",
    modelSingularCode: "mom_inventory_operation",
    handler: async (ctx: EntityWatchHandlerContext<"entity.create">) => {
      const {server, payload} = ctx;
      const changes = payload.after;
      try {
        if (changes?.application) {
          const applicationManager = server.getEntityManager<MomGood>("mom_inventory_application");
          await applicationManager.updateEntityById({
            id: changes.application.id,
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
    eventName: "entity.update",
    modelSingularCode: "mom_inventory_operation",
    handler: async (ctx: EntityWatchHandlerContext<"entity.update">) => {
      const {server, payload} = ctx;
      // const kisApi = await new KisHelper(server).NewAPIClient();
      // const kisOperationApi = new KisInventoryOperationAPI(kisApi);

      const changes = payload.changes;
      const after = payload.after;

      try {
        if (changes.hasOwnProperty("state") && changes.state === "done") {
          if (after?.application_id) {
            await server.getEntityManager<MomInventoryApplication>("mom_inventory_application").updateEntityById({
              id: after.application_id,
              entityToSave: {
                operationState: "done",
              },
            });
          }

          const kisConfig = await server.getEntityManager<KisConfig>("kis_config").findEntity({});
          if (kisConfig) {
            if (after.operationType === "in") {
              // TODO: 生成KIS入库单
              // switch (businessType?.name) {
              //   case "采购入库":
              //     await kisOperationApi.createProductReceipt({
              //       Object: {
              //         Head: {},
              //         Entry: [{}],
              //       },
              //     } as WarehouseInPayload)
              //     break;
              //   case "生产入库":
              //     await kisOperationApi.createPickingList({
              //       Object: {
              //         Head: {},
              //         Entry: [{}],
              //       },
              //     } as WarehouseOutPayload)
              //     break;
              //   default:
              //     break;
              // }
            } else if (after.operationType === "out") {
              //   TODO: 生成KIS出库单
            } else if (after.operationType === "transfer") {
              //   TODO: 生成KIS调拨单

            }
          }
        }

        if (changes.hasOwnProperty("approvalState") && changes.approvalState === "approved") {

          const inventoryApplication = await server.getEntityManager<MomInventoryApplication>("mom_inventory_application").findEntity({
            filters: [
              {
                operator: "eq",
                field: "id",
                value: after.application_id,
              },
            ],
            properties: ["id", "from", "to", "businessType"],
          });

          // 处理库存盘点
          if (inventoryApplication?.businessType && inventoryApplication.businessType.name === "库存盘点") {

            const inventoryOperationManager = server.getEntityManager<MomInventoryOperation>("mom_inventory_operation")

            const inventoryAdjustOperation = await inventoryOperationManager.findEntity({
              filters: [
                {
                  operator: "eq",
                  field: "id",
                  value: after?.id,
                },
              ],
              properties: ["id", "from", "to", "businessType"],
            });

            const inventoryBusinessTypes = await server.getEntityManager<MomInventoryBusinessType>("mom_inventory_business_type").findEntities({
              filters: [
                {
                  operator: "or",
                  filters: [
                    {
                      operator: "eq",
                      field: "name",
                      value: "盘盈入库",
                    },
                    {
                      operator: "eq",
                      field: "name",
                      value: "盘亏出库",
                    }
                  ]
                }
              ],
              properties: ["id", "name", "code", "operationType"],
            });

            if (inventoryAdjustOperation) {

              const resp = await rapidApi.post("app/listInventoryCheckTransfers", {"operationId": after.id});

              const records = resp.data;

              if (records) {
                const profitInventoryBusinessType = inventoryBusinessTypes.find(item => item.name === "盘盈入库");

                let profitInventoryOperationInput = {
                  application_id: inventoryAdjustOperation.application?.id,
                  operationType: profitInventoryBusinessType?.operationType,
                  state: "processing",
                  approvalState: "uninitiated",
                  businessType: {id: profitInventoryBusinessType?.id},
                } as SaveMomInventoryOperationInput

                let profitTransfers = [];
                for (const record of records) {
                  for (const profitGood of record.profitGoods) {
                    profitTransfers.push({
                      good: {id: profitGood.id},
                      material: {id: record.material?.id},
                      unit: {id: record.material?.defaultUnit?.id},
                      quantity: profitGood.quantity,
                      binNum: profitGood.binNum,
                      lotNum: profitGood.lotNum,
                      manufactureDate: profitGood.manufactureDate,
                      validityDate: profitGood.validityDate,
                      lot: {id: profitGood.lotId},
                      orderNum: 1,
                    } as MomGoodTransfer);
                  }
                }

                profitInventoryOperationInput.transfers = profitTransfers

                await inventoryOperationManager.createEntity({
                  entity: profitInventoryOperationInput,
                })

                const lossesInventoryBusinessType = inventoryBusinessTypes.find(item => item.name === "盘亏出库");

                let lossesInventoryOperationInput = {
                  application_id: inventoryAdjustOperation.application?.id,
                  operationType: lossesInventoryBusinessType?.operationType,
                  state: "done",
                  approvalState: "approved",
                  businessType: {id: lossesInventoryBusinessType?.id},
                } as SaveMomInventoryOperationInput

                let lossTransfers = [];
                for (const record of records) {
                  for (const lossGood of record.lossGoods) {
                    lossTransfers.push({
                      good: {id: lossGood.id},
                      material: {id: record.material?.id},
                      unit: {id: record.material?.defaultUnit?.id},
                      quantity: lossGood.quantity,
                      binNum: lossGood.binNum,
                      lotNum: lossGood.lotNum,
                      manufactureDate: lossGood.manufactureDate,
                      validityDate: lossGood.validityDate,
                      lot: {id: lossGood.lotId},
                      orderNum: 1,
                    } as MomGoodTransfer);
                  }
                }

                profitInventoryOperationInput.transfers = lossTransfers

                await inventoryOperationManager.createEntity({
                  entity: lossesInventoryOperationInput,
                })
              }
            }
          } else {
            let transfers = await listTransfersOfOperation(server, after.id);

            console.log(payload)

            if (after.operationType === "in") {
              for (const transfer of transfers) {
                if (transfer.good_id) {
                  await server.getEntityManager<MomGood>("mom_good").updateEntityById({
                    id: transfer.good_id,
                    entityToSave: {
                      state: "normal",
                    } as SaveMomGoodInput,
                  });
                }
              }
            }

            if (after.operationType === "out") {
              for (const transfer of transfers) {
                if (transfer.good_id) {
                  await server.getEntityManager<MomGood>("mom_good").updateEntityById({
                    id: transfer.good_id,
                    entityToSave: {
                      state: "transferred",
                    } as SaveMomGoodInput,
                  });
                }
              }
            }

            await updateInventoryStats(server, after.business_id, after.operationType, transfers);
          }
        }
      } catch (e) {
        console.log(e)
      }
    },
  },
] satisfies EntityWatcher<any>[];

async function listTransfersOfOperation(server: IRpdServer, operationId: number) {
  const transferManager = server.getEntityManager("mom_good_transfer");

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
    if (transfer?.to_location_id) {

      const warehouseId = await server.queryDatabaseObject(
        `
        SELECT get_root_location_id($1) AS id;
      `,
        [transfer.to_location_id]
      );

      transfer['warehouse_id'] = warehouseId[0]?.id;


      if (transfer.lot_id) {
        const lotManager = server.getEntityManager<MomWarehouse>("base_lot");
        await lotManager.updateEntityById({
          id: transfer.lot_id,
          entityToSave: {
            state: "normal",
          } as SaveBaseLotInput,
        });
      }

      transfer['location_id'] = transfer.to_location_id;
    }
    if (transfer?.from_location_id) {
      const warehouseId = await server.queryDatabaseObject(
        `
        SELECT get_root_location_id($1) AS id;
      `,
        [transfer.from_location_id]
      );

      transfer['warehouse_id'] = warehouseId[0]?.id;

      transfer['location_id'] = transfer.from_location_id;
    }
  }

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

import type {EntityWatcher, EntityWatchHandlerContext, IRpdServer} from "@ruiapp/rapid-core";
import {
  type BaseLot,
  MomGood, MomGoodTransfer, MomInventoryApplication, type MomInventoryBusinessType,
  type MomInventoryOperation,
  type SaveBaseLotInput, SaveMomInventoryOperationInput,
} from "~/_definitions/meta/entity-types";

export default [
  {
    eventName: "entity.beforeCreate",
    modelSingularCode: "mom_good_transfer",
    handler: async (ctx: EntityWatchHandlerContext<"entity.beforeCreate">) => {
      const {server, payload} = ctx;
      let before = payload.before;
      try {
        const inventoryOperationManager = server.getEntityManager<MomInventoryOperation>("mom_inventory_operation");

        if (before.hasOwnProperty("lotNum") && before.hasOwnProperty("material")) {

          const inventoryOperation = await inventoryOperationManager.findEntity({
            filters: [{operator: "eq", field: "id", value: before.operation_id}],
            properties: ["id", "businessType"],
          })

          const lot = await saveMaterialLotInfo(server, {
            lotNum: before.lotNum,
            material: before.material,
            sourceType: inventoryOperation?.businessType?.config?.defaultSourceType || null,
            qualificationState: inventoryOperation?.businessType?.config?.defaultQualificationState || "qualified",
            isAOD: false,
            state: "pending",
          });

          if (lot) {
            before.lot_id = lot.id;
          }

        }

      } catch (e) {
        console.error(e);
      }
    },
  },
  {
    eventName: "entity.create",
    modelSingularCode: "mom_good_transfer",
    handler: async (ctx: EntityWatchHandlerContext<"entity.create">) => {
      const {server, payload} = ctx;
      let after = payload.after;
      try {

        const inventoryOperationManager = server.getEntityManager<MomInventoryOperation>("mom_inventory_operation");

        const inventoryOperation = await inventoryOperationManager.findEntity({
          filters: [{operator: "eq", field: "id", value: after.operation_id}],
          properties: ["id", "application", "businessType"],
        })

        if (inventoryOperation?.businessType?.operationType === "out") {
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


          if (inventoryApplication?.businessType && inventoryApplication.businessType.name == "库存调拨") {
            const inventoryInOperation = await server.getEntityManager<MomInventoryOperation>("mom_inventory_operation").findEntity({
              filters: [
                {
                  operator: "eq",
                  field: "application_id",
                  value: inventoryApplication?.id,
                },
              ],
              properties: ["id", "from", "to", "businessType"],
            });

            const inventoryBusinessType = await server.getEntityManager<MomInventoryBusinessType>("mom_inventory_business_type").findEntity({
              filters: [
                {
                  operator: "eq",
                  field: "name",
                  value: "调拨入库",
                },
              ],
              properties: ["id", "operationType"],
            });


            if (inventoryInOperation) {
              const goodTransfer = await server.getEntityManager<MomGoodTransfer>("mom_good_transfer").findEntity({
                filters: [
                  {
                    operator: "eq",
                    field: "id",
                    value: after.id,
                  },
                ],
                properties: ["id", "material", "unit", "good", "quantity", "binNum", "lotNum", "manufactureDate", "validityDate", "lot"],
              });

              if (goodTransfer) {
                let transferInput = {
                  operation: {id: inventoryInOperation.id},
                  good: {id: goodTransfer.good?.id},
                  material: {id: goodTransfer.material?.id},
                  unit: {id: goodTransfer.unit?.id},
                  quantity: goodTransfer.quantity,
                  binNum: goodTransfer.binNum,
                  lotNum: goodTransfer.lotNum,
                  manufactureDate: goodTransfer.manufactureDate,
                  validityDate: goodTransfer.validityDate,
                  lot: {id: goodTransfer.lot?.id},
                  orderNum: 1,
                } as MomGoodTransfer;

                await server.getEntityManager<MomGoodTransfer>("mom_good_transfer").createEntity(
                  {
                    entity: transferInput,
                  }
                )
              }

            } else {

              const goodTransfer = await server.getEntityManager<MomGoodTransfer>("mom_good_transfer").findEntity({
                filters: [
                  {
                    operator: "eq",
                    field: "id",
                    value: after.id,
                  },
                ],
                properties: ["id", "material", "unit", "good", "quantity", "binNum", "lotNum", "manufactureDate", "validityDate", "lot"],
              });

              let inventoryOperationInput = {
                application_id: inventoryOperation.application?.id,
                operationType: inventoryBusinessType?.operationType,
                state: "processing",
                businessType: {id: inventoryBusinessType?.id},
                warehouse: {id: inventoryApplication?.to?.id},
              } as SaveMomInventoryOperationInput

              // convert goodTransfers to inventoryOperationInput.transfers
              let transfers = [];
              if (goodTransfer) {
                transfers.push({
                  good: {id: goodTransfer.good?.id},
                  material: {id: goodTransfer.material?.id},
                  unit: {id: goodTransfer.unit?.id},
                  quantity: goodTransfer.quantity,
                  binNum: goodTransfer.binNum,
                  lotNum: goodTransfer.lotNum,
                  manufactureDate: goodTransfer.manufactureDate,
                  validityDate: goodTransfer.validityDate,
                  lot: {id: goodTransfer.lot?.id},
                  orderNum: 1,
                } as MomGoodTransfer);
              }

              inventoryOperationInput.transfers = transfers

              await inventoryOperationManager.createEntity({
                entity: inventoryOperationInput,
              })
            }
          }
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
] satisfies EntityWatcher<any>[];

async function saveMaterialLotInfo(server: IRpdServer, lot: SaveBaseLotInput) {
  if (!lot.lotNum || !lot.material || !lot.material.id) {
    throw new Error("lotNum and material are required when saving lot info.");
  }

  const baseLotManager = server.getEntityManager<BaseLot>("base_lot");
  const lotInDb = await baseLotManager.findEntity({
    filters: [
      {operator: "eq", field: "lot_num", value: lot.lotNum},
      {operator: "eq", field: "material_id", value: lot.material.id},
    ],
  });

  return lotInDb || (await baseLotManager.createEntity({entity: lot}));
}

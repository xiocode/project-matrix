import type {EntityWatcher, EntityWatchHandlerContext, IRpdServer} from "@ruiapp/rapid-core";
import {find, min} from "lodash";
import {
  type BaseLot,
  MomGoodTransfer,
  MomInventoryBusinessType, MomInventoryOperation,
  MomMaterialInventoryBalance,
  MomWorkOrder, type SaveBaseLotInput, SaveMomInventoryOperationInput
} from "~/_definitions/meta/entity-types";
import rapidApi from "~/rapidApi";
import dayjs from "dayjs";

export default [
  {
    eventName: "entity.update",
    modelSingularCode: "mom_work_order",
    handler: async (ctx: EntityWatchHandlerContext<"entity.update">) => {
      const {server, payload} = ctx;
      const changes: Partial<MomWorkOrder> = payload.changes;
      const after: MomWorkOrder = payload.after;

      try {
        if (changes.hasOwnProperty("assignmentState") && changes.assignmentState === "assigned") {
          const res = await rapidApi.post(`app/calcWorkOrderMaterialRequirements?workOrderId=${after.id}`);
          const {materials, output: mrpOutput} = res.data;

          const inventoryManager = server.getEntityManager<MomMaterialInventoryBalance>("mom_material_inventory_balance");

          for (const item of mrpOutput.requirements) {
            const {demand, available} = item.quantities;
            const tags = item.tags;
            const allocated = min([demand, available])!;
            const material = find(materials, {code: item.code})!;

            const inventory = await inventoryManager.findEntity({
              filters: [
                {operator: "eq", field: "material_id", value: material.id},
                {operator: "eq", field: "tags", value: tags || ""},
              ],
            });

            if (inventory) {
              await inventoryManager.updateEntityById({
                id: inventory.id,
                entityToSave: {
                  allocatedQuantity: inventory.allocatedQuantity + allocated,
                } as Partial<MomMaterialInventoryBalance>,
              });
            } else {
              console.warn(`Inventory not found for material ID ${material.id} with tags ${tags || ""}`);
            }
          }
        }

        if (changes.hasOwnProperty("executionState") && changes.executionState === "completed") {
          const workOrder = await server.getEntityManager<MomWorkOrder>("mom_work_order").findEntity({
            filters: [
              {
                operator: "eq",
                field: "id",
                value: after.id,
              },
            ],
            properties: ["id", "material", "unit", "quantity", "tags", "code", "operationType", "workReports"],
          });


          const inventoryBusinessType = await server.getEntityManager<MomInventoryBusinessType>("mom_inventory_business_type").findEntity({
            filters: [
              {
                operator: "eq",
                field: "name",
                value: "生产入库",
              },
            ],
            properties: ["id", "operationType"],
          });


          let inventoryOperationInput = {
            operationType: inventoryBusinessType?.operationType,
            state: "done",
            approvalState: "approved",
            businessType: {id: inventoryBusinessType?.id},
          } as SaveMomInventoryOperationInput

          // convert goodTransfers to inventoryOperationInput.transfers
          let transfers = [];
          if (workOrder) {
            const validityDate = dayjs(workOrder.createdAt)
              .add(parseInt(workOrder?.material?.qualityGuaranteePeriod || "0", 10), "day")
              .format("YYYY-MM-DD");

            const lotInfo = await saveMaterialLotInfo(server, {
              lotNum: workOrder.code,
              material: {id: workOrder.material?.id},
              sourceType: "selfMade",
              qualificationState: "qualified",
              isAOD: false,
              state: "normal",
            });

            transfers.push({
              material: {id: workOrder.material?.id},
              unit: {id: workOrder.unit?.id},
              quantity: workOrder.workReports.map((report: any) => report.qualifiedQuantity).reduce((a: number, b: number) => a + b, 0),
              lotNum: workOrder.code,
              manufactureDate: workOrder.createdAt,
              validityDate: validityDate,
              lot: {id: lotInfo?.id},
              tags: workOrder.tags,
              orderNum: 1,
            } as MomGoodTransfer);
          }


          inventoryOperationInput.transfers = transfers

          await server.getEntityManager<MomInventoryOperation>("mom_inventory_operation").createEntity({
            entity: inventoryOperationInput,
          })

        }
      } catch (error) {
        console.error(`Error updating inventory for work order ID ${after.id}:`, error);
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

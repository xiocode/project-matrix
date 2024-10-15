import type {EntityWatcher, EntityWatchHandlerContext} from "@ruiapp/rapid-core";
import type {MomWorkOrder, SaveMomWorkOrderInput} from "~/_definitions/meta/entity-types";

export default [
  {
    eventName: "entity.beforeCreate",
    modelSingularCode: "mom_work_task",
    handler: async (ctx: EntityWatchHandlerContext<"entity.beforeCreate">) => {
      const { server, payload } = ctx;
      let before = payload.before;

      if (!before.hasOwnProperty("workOrder") && !before.hasOwnProperty("work_order_id")) {
        const workOrderManager = server.getEntityManager<MomWorkOrder>("mom_work_order");
        const workOrder = await workOrderManager.findEntity({
          filters: [
            { operator: "eq", field: "process_id", value: before.process.id || before.process || before.process_id },
            { operator: "eq", field: "executionState", value: 'processing' },
          ],
        });
        if (workOrder) {
          before.work_order_id = workOrder.id;
        } else {
          const workOrder = await workOrderManager.createEntity({
            entity: {
              process: { id: before.process.id || before.process || before.process_id },
              material: { id: before.material.id || before.material || before.material_id },
              executionState: 'processing',
            } as SaveMomWorkOrderInput,
          });
          if (workOrder) {
            before.work_order_id = workOrder.id;
          }
        }
      }
    }
  },
  {
    eventName: "entity.update",
    modelSingularCode: "mom_work_task",
    handler: async (ctx: EntityWatchHandlerContext<"entity.update">) => {
      const { server, payload } = ctx;
      let {before, changes} = payload;

      if (before.hasOwnProperty("workOrder") || before.hasOwnProperty("work_order_id")) {
        if (changes.hasOwnProperty("executionState") && changes.executionState === "completed") {
          const workOrderManager = server.getEntityManager<MomWorkOrder>("mom_work_order");
          const workOrder = await workOrderManager.findEntity({
            filters: [
              { operator: "eq", field: "id", value: before.workOrder.id || before.workOrder || before.work_order_id },
              { operator: "eq", field: "executionState", value: 'processing' },
            ],
          });
          if (workOrder) {
            await workOrderManager.updateEntityById({
              id: workOrder.id,
              entityToSave: {
                executionState: 'completed',
              }
            })
          }
        }
      }
    }
  },
] satisfies EntityWatcher<any>[];

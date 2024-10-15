import type {EntityWatcher, EntityWatchHandlerContext} from "@ruiapp/rapid-core";
import type {MomWorkTask} from "~/_definitions/meta/entity-types";

export default [
  {
    eventName: "entity.beforeCreate",
    modelSingularCode: "mom_work_report",
    handler: async (ctx: EntityWatchHandlerContext<"entity.beforeCreate">) => {
      const { server, payload } = ctx;
      let before = payload.before;

      const workTask = await server.getEntityManager<MomWorkTask>("mom_work_task").findEntity({
        filters: [
          { operator: "eq", field: "process_id", value: before.process.id || before.process || before.process_id },
          { operator: "eq", field: "equipment_id", value: before.equipment.id || before.equipment || before.equipment_id },
          { operator: "eq", field: "work_order_id", value: before.workOrder.id || before.workOrder || before.work_order_id },
        ],
      });
      if (workTask) {
        before.work_task_id = workTask.id;
      }
    }
  },
  {
    eventName: "entity.create",
    modelSingularCode: "mom_work_report",
    handler: async (ctx: EntityWatchHandlerContext<"entity.create">) => {
      const { server, payload } = ctx;
      const after = payload.after;

      if (!after.work_order_id) {
        return;
      }

      const workOrderEntityManager = server.getEntityManager("mom_work_order");
      await workOrderEntityManager.updateEntityById({
        id: after.work_order_id,
        entityToSave: {
          executionState: 'processing',
        },
      });
    }
  },
] satisfies EntityWatcher<any>[];

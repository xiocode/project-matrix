import type { EntityWatchHandlerContext, EntityWatcher } from "@ruiapp/rapid-core";
import type { MomWorkTask } from "~/_definitions/meta/entity-types";

export default [
  {
    eventName: "entity.create",
    modelSingularCode: "mom_work_task",
    handler: async (ctx: EntityWatchHandlerContext<"entity.update">) => {
      const { server, payload } = ctx;
      const after: MomWorkTask = payload.after;

      console.log("entity.create.mom_work_task", after);
      if (!(after as any).work_order_id) {
        return;
      }

      const workOrderEntityManager = server.getEntityManager("mom_work_order");
      await workOrderEntityManager.updateEntityById({
        id: (after as any).work_order_id,
        entityToSave: {},
        operation: {
          type: "assignTask"
        },
        stateProperties: ["assignmentState"],
      });
    }
  },
] satisfies EntityWatcher<any>[];

import type {EntityWatcher, EntityWatchHandlerContext} from "@ruiapp/rapid-core";

export default [
  {
    eventName: "entity.beforeCreate",
    modelSingularCode: "mom_work_order",
    handler: async (ctx: EntityWatchHandlerContext<"entity.beforeCreate">) => {
      const { server, payload } = ctx;
      const { before } = payload;

      try {
        const process = await server.getEntityManager("mom_process").findEntity({
          filters: [
            { operator: "eq", field: "id", value: before.process.id || before.process_id },
          ],
          properties: ["id", "factory"]
        });

        if (process && process.factory) {
          before.factory_id = process.factory?.id
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
] satisfies EntityWatcher<any>[];

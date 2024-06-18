import type {EntityWatcher, EntityWatchHandlerContext} from "@ruiapp/rapid-core";
import {MomGood, type MomInventoryOperation,} from "~/_definitions/meta/entity-types";

export default [
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

import type {EntityWatcher, EntityWatchHandlerContext} from "@ruiapp/rapid-core";
import {BaseLot,} from "~/_definitions/meta/entity-types";

export default [
  {
    eventName: "entity.beforeUpdate",
    modelSingularCode: "mom_inspection_sheet",
    handler: async (ctx: EntityWatchHandlerContext<"entity.beforeUpdate">) => {
      const {server, payload, routerContext} = ctx;

      const before = payload.before
      const changes = payload.changes

      if (changes.hasOwnProperty('approvalState') && changes.approvalState !== before.approvalState) {
        changes.reviewer_id = routerContext?.state.userId;
      }
    },
  },
  {
    eventName: "entity.update",
    modelSingularCode: "mom_inspection_sheet",
    handler: async (ctx: EntityWatchHandlerContext<"entity.update">) => {
      const {server, payload} = ctx;

      const after = payload.after;

      if (after.lotNum && after.material_id) {
        const lotManager = server.getEntityManager<BaseLot>("base_lot");
        const lot = await lotManager.findEntity({
          filters: [
            {operator: "eq", field: "lotNum", value: after.lotNum},
            {
              operator: "eq",
              field: "material_id",
              value: after.material_id
            }],
          properties: ["id"],
        });
        if (lot && after.result) {
          await lotManager.updateEntityById({
            id: lot.id,
            entityToSave: {
              qualificationState: after.result,
            },
          });
        }
      }
    },
  },
] satisfies EntityWatcher<any>[];

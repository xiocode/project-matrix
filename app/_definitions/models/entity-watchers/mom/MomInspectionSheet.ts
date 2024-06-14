import type {EntityWatcher, EntityWatchHandlerContext} from "@ruiapp/rapid-core";
import {type MomInspectionSheet,} from "~/_definitions/meta/entity-types";

export default [
  {
    eventName: "entity.update",
    modelSingularCode: "mom_inspection_sheet",
    handler: async (ctx: EntityWatchHandlerContext<"entity.update">) => {
      const {server, payload} = ctx;

      const after = payload.after;

      if (after.lotNum && after.material_id) {
        const lotManager = server.getEntityManager<MomInspectionSheet>("base_lot");
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

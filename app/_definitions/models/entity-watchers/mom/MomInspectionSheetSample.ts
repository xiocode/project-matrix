import type {EntityWatcher, EntityWatchHandlerContext} from "@ruiapp/rapid-core";
import {MomInspectionMeasurement, type MomInspectionSheet} from "~/_definitions/meta/entity-types";

export default [
  {
    eventName: "entity.beforeCreate",
    modelSingularCode: "mom_inspection_sheet_sample",
    handler: async (ctx: EntityWatchHandlerContext<"entity.beforeCreate">) => {
      const { server, payload } = ctx;
      let before = payload.before;

      if (before.measurements && Array.isArray(before.measurements)) {
        before.measurements.forEach((measurement: any) => {
          measurement.sheet_id = before.sheet_id;
          measurement.sampleCode = before.code;
        });
      }
    },
  },
  {
    eventName: "entity.create",
    modelSingularCode: "mom_inspection_sheet_sample",
    handler: async (ctx: EntityWatchHandlerContext<"entity.create">) => {
      const { server, payload } = ctx;
      let after = payload.after;

      const momInspectionMeasurement = await server.getEntityManager<MomInspectionMeasurement>("mom_inspection_measurement").findEntities({
        filters: [
          { operator: "eq", field: "sheet_id", value: after.sheet_id },
        ],
        properties: ["id", "isQualified", "characteristic"],
      });

      const momInspectionSheetManager = server.getEntityManager<MomInspectionSheet>("mom_inspection_sheet");


      let result = "qualified";
      if (momInspectionMeasurement.some((item) => item.characteristic?.mustPass ? !item.isQualified : false)) {
        result = "unqualified";
      }
      await momInspectionSheetManager.updateEntityById({
        id: after.sheet_id,
        entityToSave: {
          result: result,
        },
      });
    },
  },
  {
    eventName: "entity.update",
    modelSingularCode: "mom_inspection_sheet_sample",
    handler: async (ctx: EntityWatchHandlerContext<"entity.update">) => {
      const { server, payload } = ctx;
      let after = payload.after;

      const momInspectionMeasurement = await server.getEntityManager<MomInspectionMeasurement>("mom_inspection_measurement").findEntities({
        filters: [
          { operator: "eq", field: "sheet_id", value: after.sheet_id },
        ],
        properties: ["id", "isQualified", "characteristic"],
      });

      const momInspectionSheetManager = server.getEntityManager<MomInspectionSheet>("mom_inspection_sheet");


      let result = "qualified";
      if (momInspectionMeasurement.some((item) => item.characteristic?.mustPass ? !item.isQualified : false)) {
        result = "unqualified";
      }
      await momInspectionSheetManager.updateEntityById({
        id: after.sheet_id,
        entityToSave: {
          result: result,
        },
      });
    },
  },
] satisfies EntityWatcher<any>[];

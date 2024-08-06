import type {EntityWatcher, EntityWatchHandlerContext} from "@ruiapp/rapid-core";
import {MomInspectionMeasurement, type MomInspectionSheet,} from "~/_definitions/meta/entity-types";

export default [
  {
    eventName: "entity.create",
    modelSingularCode: "mom_inspection_measurement",
    handler: async (ctx: EntityWatchHandlerContext<"entity.create">) => {
      const {server, payload} = ctx;

      const after = payload.after;

      const momInspectionMeasurementManager = server.getEntityManager<MomInspectionMeasurement>("mom_inspection_measurement");
      const momInspectionMeasurement = await momInspectionMeasurementManager.findEntities({
        filters: [
          {operator: "eq", field: "sheet_id", value: after.sheet_id},
        ],
        properties: ["id", "characteristic", "isQualified"],
      });

      const momInspectionSheetManager = server.getEntityManager<MomInspectionSheet>("mom_inspection_sheet");


      let result = "qualified";
      if (momInspectionMeasurement.every((item) => (item.characteristic?.mustPass || false) && !item.isQualified)) {
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
    modelSingularCode: "mom_inspection_measurement",
    handler: async (ctx: EntityWatchHandlerContext<"entity.update">) => {
      const {server, payload} = ctx;

      const after = payload.after;

      const momInspectionMeasurementManager = server.getEntityManager<MomInspectionMeasurement>("mom_inspection_measurement");
      const momInspectionMeasurement = await momInspectionMeasurementManager.findEntities({
        filters: [
          {operator: "eq", field: "sheet_id", value: after.sheet_id},
        ],
        properties: ["id", "characteristic", "isQualified"],
      });

      const momInspectionSheetManager = server.getEntityManager<MomInspectionSheet>("mom_inspection_sheet");


      let result = "qualified";
      if (momInspectionMeasurement.every((item) => (item.characteristic?.mustPass || false) && !item.isQualified)) {
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

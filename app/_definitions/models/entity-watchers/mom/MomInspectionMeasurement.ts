import type {EntityWatcher, EntityWatchHandlerContext} from "@ruiapp/rapid-core";
import {MomInspectionMeasurement, type MomInspectionSheet,} from "~/_definitions/meta/entity-types";

export default [
  {
    eventName: "entity.create",
    modelSingularCode: "mom_inspection_measurement",
    handler: async (ctx: EntityWatchHandlerContext<"entity.create">) => {
      const { server, payload } = ctx;

      const after = payload.after;

      const momInspectionMeasurementManager = server.getEntityManager<MomInspectionMeasurement>("mom_inspection_measurement");
      const momInspectionMeasurement = await momInspectionMeasurementManager.findEntities({
        filters: [
          { operator: "eq", field: "sheet_id", value: after.sheet_id },
        ],
        properties: ["id", "characteristic", "isQualified", "createdAt"],
      });

      // Get the latest measurement for each characteristic.
      const latestMeasurement = momInspectionMeasurement.reduce((acc, item) => {
        if (item.characteristic?.id && item.createdAt) {
          const characteristicId = item.characteristic.id;

          // @ts-ignore
          if (!acc[characteristicId] || acc[characteristicId].createdAt < item.createdAt) {
            acc[characteristicId] = item;
          }
        }

        return acc;
      }, {} as Record<string, MomInspectionMeasurement>);


      const momInspectionSheetManager = server.getEntityManager<MomInspectionSheet>("mom_inspection_sheet");


      let result = "qualified";
      // If any of the latest measurements is unqualified, the sheet is unqualified.
      if (Object.values(latestMeasurement).some((item) => (item.characteristic?.mustPass || false) && !item.isQualified)) {
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
      const { server, payload } = ctx;

      const after = payload.after;
      const changes = payload.changes;

      if (changes.hasOwnProperty('isQualified')) {
        const momInspectionMeasurementManager = server.getEntityManager<MomInspectionMeasurement>("mom_inspection_measurement");
        const momInspectionMeasurement = await momInspectionMeasurementManager.findEntities({
          filters: [
            { operator: "eq", field: "sheet_id", value: after.sheet_id },
          ],
          properties: ["id", "characteristic", "isQualified", "createdAt"],
        });

        // Get the latest measurement for each characteristic.
        const latestMeasurement = momInspectionMeasurement.reduce((acc, item) => {
          if (item.characteristic?.id && item.createdAt) {
            const characteristicId = item.characteristic.id;

            // @ts-ignore
            if (!acc[characteristicId] || acc[characteristicId].createdAt < item.createdAt) {
              acc[characteristicId] = item;
            }
          }

          return acc;
        }, {} as Record<string, MomInspectionMeasurement>);


        const momInspectionSheetManager = server.getEntityManager<MomInspectionSheet>("mom_inspection_sheet");


        let result = "qualified";
        // If any of the latest measurements is unqualified, the sheet is unqualified.
        if (Object.values(latestMeasurement).some((item) => (item.characteristic?.mustPass || false) && !item.isQualified)) {
          result = "unqualified";
        }

        await momInspectionSheetManager.updateEntityById({
          id: after.sheet_id,
          entityToSave: {
            result: result,
            state: "inspecting"
          },
        });
      }

    },
  },
] satisfies EntityWatcher<any>[];

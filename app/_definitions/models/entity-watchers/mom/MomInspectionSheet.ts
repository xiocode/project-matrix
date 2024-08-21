import type {EntityWatcher, EntityWatchHandlerContext} from "@ruiapp/rapid-core";
import {
  BaseLot,
  MomInspectionMeasurement,
  MomInspectionSheet,
  MomInventoryApplication
} from "~/_definitions/meta/entity-types";

export default [
  {
    eventName: "entity.beforeUpdate",
    modelSingularCode: "mom_inspection_sheet",
    handler: async (ctx: EntityWatchHandlerContext<"entity.beforeUpdate">) => {
      const { server, payload, routerContext } = ctx;

      const before = payload.before
      const changes = payload.changes

      if (before.hasOwnProperty('lotNum')) {
        const lotManager = server.getEntityManager<BaseLot>("base_lot");
        const lot = await lotManager.findEntity({
          filters: [
            { operator: "eq", field: "lotNum", value: before.lotNum },
            {
              operator: "eq",
              field: "material_id",
              value: before.material?.id || before.material_id
            }],
          properties: ["id"],
        });
        changes.lot = lot?.id;
      }

      if (changes.hasOwnProperty('approvalState') && changes.approvalState !== before.approvalState) {
        changes.reviewer = routerContext?.state.userId;
      }

      if (changes.hasOwnProperty('state') && changes.state === 'inspected') {
        changes.inspector = routerContext?.state.userId;
      }
    },
  },
  {
    eventName: "entity.beforeCreate",
    modelSingularCode: "mom_inspection_sheet",
    handler: async (ctx: EntityWatchHandlerContext<"entity.beforeCreate">) => {
      const { server, payload } = ctx;

      const before = payload.before

      if (before.hasOwnProperty('lotNum')) {
        const lotManager = server.getEntityManager<BaseLot>("base_lot");
        const lot = await lotManager.findEntity({
          filters: [
            { operator: "eq", field: "lotNum", value: before.lotNum },
            {
              operator: "eq",
              field: "material_id",
              value: before.material?.id || before.material_id
            }],
          properties: ["id"],
        });
        before.lot = lot?.id;
      }
    },
  },
  {
    eventName: "entity.update",
    modelSingularCode: "mom_inspection_sheet",
    handler: async (ctx: EntityWatchHandlerContext<"entity.update">) => {
      const { server, payload } = ctx;

      const after = payload.after;
      const changes = payload.changes;

      const operationTarget = await server.getEntityManager<MomInspectionSheet>("mom_inspection_sheet").findEntity({
        filters: [
          {
            operator: "eq",
            field: "id",
            value: after.id,
          },
        ],
        properties: ["id", "code"],
      });

      if (changes) {
        await server.getEntityManager("sys_audit_log").createEntity({
          entity: {
            user: { id: ctx?.routerContext?.state.userId },
            targetSingularCode: "mom_inspection_sheet",
            targetSingularName: `检验单 - ${ operationTarget?.code }`,
            method: "update",
            changes: changes,
          }
        })
      }

      if (changes.hasOwnProperty('state') && changes.state === 'inspected') {
        const measurements = await server.getEntityManager<MomInspectionMeasurement>("mom_inspection_measurement").findEntities(
          {
            filters: [
              { operator: "eq", field: "sheet_id", value: after.id },
            ],
            properties: ["id"],
          }
        );

        for (const measurement of measurements) {
          await server.getEntityManager<MomInspectionMeasurement>("mom_inspection_measurement").updateEntityById({
            id: measurement.id,
            entityToSave: {
              locked: true,
            }
          });
        }
      }

      if (after.lotNum && after.material_id) {
        const lotManager = server.getEntityManager<BaseLot>("base_lot");
        const lot = await lotManager.findEntity({
          filters: [
            { operator: "eq", field: "lotNum", value: after.lotNum },
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
    }
  },
  {
    eventName: "entity.delete",
    modelSingularCode: "mom_inspection_sheet",
    handler: async (ctx: EntityWatchHandlerContext<"entity.delete">) => {
      const { server, payload, routerContext } = ctx;

      const before = payload.before

      const operationTarget = await server.getEntityManager<MomInspectionSheet>("mom_inspection_sheet").findEntity({
        filters: [
          {
            operator: "eq",
            field: "id",
            value: before.id,
          },
        ],
        properties: ["id", "code"],
      });

      await server.getEntityManager("sys_audit_log").createEntity({
        entity: {
          user: { id: ctx?.routerContext?.state.userId },
          targetSingularCode: "mom_inspection_sheet",
          targetSingularName: `检验单 - ${operationTarget?.code}`,
          method: "delete",
        }
      })
    },
  },
] satisfies EntityWatcher<any>[];

import type {EntityWatcher, EntityWatchHandlerContext, IRpdServer} from "@ruiapp/rapid-core";
import {
  BaseLot,
  MomInspectionMeasurement,
  MomInspectionSheet,
  MomInventoryApplication, type SaveBaseLotInput
} from "~/_definitions/meta/entity-types";

export default [
  {
    eventName: "entity.beforeUpdate",
    modelSingularCode: "mom_inspection_sheet",
    handler: async (ctx: EntityWatchHandlerContext<"entity.beforeUpdate">) => {
      const { server, payload, routerContext } = ctx;

      const before = payload.before
      let changes = payload.changes

      if (changes.hasOwnProperty('lotNum')) {
        const lot = await saveMaterialLotInfo(server, {
          lotNum: before.lotNum,
          material: {"id": before.material?.id || before.material || before.material_id},
          sourceType: "selfMade",
          qualificationState: "uninspected",
          isAOD: false,
          state: "normal",
        } as SaveBaseLotInput);
        if (lot) {
          changes.lot = { id: lot?.id };
        }
      }

      if (changes.hasOwnProperty('approvalState') && changes.approvalState !== before.approvalState) {
        changes.reviewer = routerContext?.state.userId;
      }

      if (changes.hasOwnProperty('state') && changes.state === 'inspected') {
        changes.inspector = routerContext?.state.userId;

      //   TODO: 对接钉钉审核流程
      }
    },
  },
  {
    eventName: "entity.beforeCreate",
    modelSingularCode: "mom_inspection_sheet",
    handler: async (ctx: EntityWatchHandlerContext<"entity.beforeCreate">) => {
      const { server, payload } = ctx;

      let before = payload.before

      if (before.hasOwnProperty('lotNum')) {
        const lot = await saveMaterialLotInfo(server, {
          lotNum: before.lotNum,
          material: {"id": before.material?.id || before.material || before.material_id},
          sourceType: "selfMade",
          qualificationState: "uninspected",
          isAOD: false,
          state: "normal",
        } as SaveBaseLotInput);
        if (lot) {
          before.lot_id = lot?.id;
        }
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
        if (ctx?.routerContext?.state.userId) {
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
            routeContext: ctx.routerContext,
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
            routeContext: ctx.routerContext,
            id: lot.id,
            entityToSave: {
              qualificationState: after.result,
            },
          });
        }
      }

      if (changes.hasOwnProperty('treatment')) {
        if (after.lot_id) {
          const isAOD = changes.treatment === 'special';
          const qualified = after.result === 'qualified' ? 'true' : changes.treatment === 'forced';
          await server.getEntityManager<BaseLot>("base_lot").updateEntityById({
            routeContext: ctx.routerContext,
            id: after.lot_id,
            entityToSave: {
              treatment: changes.treatment,
              isAOD: isAOD,
              qualificationState: qualified ? 'qualified' : 'unqualified',
            }
          });
        }
      }
    }
  },
  {
    eventName: "entity.beforeDelete",
    modelSingularCode: "mom_inspection_sheet",
    handler: async (ctx: EntityWatchHandlerContext<"entity.beforeDelete">) => {
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
      if (ctx?.routerContext?.state.userId) {
        await server.getEntityManager("sys_audit_log").createEntity({
          entity: {
            user: { id: ctx?.routerContext?.state.userId },
            targetSingularCode: "mom_inspection_sheet",
            targetSingularName: `检验单 - ${ operationTarget?.code }`,
            method: "delete",
          }
        })
      }
    },
  },
] satisfies EntityWatcher<any>[];


async function saveMaterialLotInfo(server: IRpdServer, lot: SaveBaseLotInput) {
  if (!lot.lotNum || !lot.material || !lot.material.id) {
    throw new Error("lotNum and material are required when saving lot info.");
  }

  const baseLotManager = server.getEntityManager<BaseLot>("base_lot");
  const lotInDb = await baseLotManager.findEntity({
    filters: [
      { operator: "eq", field: "lot_num", value: lot.lotNum },
      { operator: "eq", field: "material_id", value: lot.material.id },
    ],
  });

  return lotInDb || (await baseLotManager.createEntity({ entity: lot }));
}

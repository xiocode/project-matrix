import type {EntityWatcher, EntityWatchHandlerContext} from "@ruiapp/rapid-core";
import {MomInspectionCharacteristic,} from "~/_definitions/meta/entity-types";

export default [
  {
    eventName: "entity.update",
    modelSingularCode: "mom_inspection_characteristic",
    handler: async (ctx: EntityWatchHandlerContext<"entity.update">) => {
      const { server, payload } = ctx;
      const changes = payload.changes;
      const after = payload.after;

      try {
        const operationTarget = await server.getEntityManager<MomInspectionCharacteristic>("mom_inspection_characteristic").findEntity({
          filters: [
            {
              operator: "eq",
              field: "id",
              value: after.id,
            },
          ],
          properties: ["id", "rule", "name"]
        });

        if (changes) {
          await server.getEntityManager("sys_audit_log").createEntity({
            entity: {
              user: { id: ctx?.routerContext?.state.userId },
              targetSingularCode: "mom_inspection_characteristic",
              targetSingularName: `检验特征-${ operationTarget?.rule?.name }-${ operationTarget?.name }`,
              method: "update",
              changes: changes,
            }
          })
        }


      } catch (e) {
        console.log(e)
      }
    },
  },
  {
    eventName: "entity.delete",
    modelSingularCode: "mom_inspection_characteristic",
    handler: async (ctx: EntityWatchHandlerContext<"entity.delete">) => {
      const { server, payload } = ctx;

      const before = payload.before
      try {
        const operationTarget = await server.getEntityManager<MomInspectionCharacteristic>("mom_inspection_characteristic").findEntity({
          filters: [
            {
              operator: "eq",
              field: "id",
              value: before.id,
            },
          ],
          properties: ["id", "rule", "name"]
        });

        await server.getEntityManager("sys_audit_log").createEntity({
          entity: {
            user: { id: ctx?.routerContext?.state.userId },
            targetSingularCode: "mom_inspection_characteristic",
            targetSingularName: `检验特征-${ operationTarget?.rule?.name }-${ operationTarget?.name }`,
            method: "delete",
          }
        })
      } catch (e) {
        console.error(e);
      }
    },
  },

] satisfies EntityWatcher<any>[];

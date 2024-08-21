import type {EntityWatcher, EntityWatchHandlerContext} from "@ruiapp/rapid-core";
import {BaseMaterial, MomInventoryApplication,} from "~/_definitions/meta/entity-types";

export default [
  {
    eventName: "entity.update",
    modelSingularCode: "base_material",
    handler: async (ctx: EntityWatchHandlerContext<"entity.update">) => {
      const { server, payload } = ctx;
      const changes = payload.changes;
      const after = payload.after;

      try {
        const operationTarget = await server.getEntityManager<BaseMaterial>("base_material").findEntity({
          filters: [
            {
              operator: "eq",
              field: "id",
              value: after.id,
            },
          ],
          properties: ["id", "code", "name", "specification"],
        });

        if (changes) {
          await server.getEntityManager("sys_audit_log").createEntity({
            entity: {
              user: { id: ctx?.routerContext?.state.userId },
              targetSingularCode: "base_material",
              targetSingularName: `物料 - ${ operationTarget?.code } - ${ operationTarget?.name } - ${ operationTarget?.specification }`,
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
    eventName: "entity.beforeDelete",
    modelSingularCode: "base_material",
    handler: async (ctx: EntityWatchHandlerContext<"entity.beforeDelete">) => {
      const { server, payload } = ctx;

      const before = payload.before
      try {
        const operationTarget = await server.getEntityManager<BaseMaterial>("base_material").findEntity({
          filters: [
            {
              operator: "eq",
              field: "id",
              value: before.id,
            },
          ],
          properties: ["id", "code", "name", "specification"],
        });

        await server.getEntityManager("sys_audit_log").createEntity({
          entity: {
            user: { id: ctx?.routerContext?.state.userId },
            targetSingularCode: "base_material",
            targetSingularName: `物料 - ${ operationTarget?.code }-${ operationTarget?.name }-${ operationTarget?.specification }`,
            method: "delete",
          }
        })
      } catch (e) {
        console.error(e);
      }
    },
  },

] satisfies EntityWatcher<any>[];

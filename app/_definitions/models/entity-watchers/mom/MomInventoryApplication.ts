import type {EntityWatcher, EntityWatchHandlerContext} from "@ruiapp/rapid-core";
import {MomInventoryApplication,} from "~/_definitions/meta/entity-types";

export default [
  {
    eventName: "entity.update",
    modelSingularCode: "mom_inventory_application",
    handler: async (ctx: EntityWatchHandlerContext<"entity.update">) => {
      const { server, payload } = ctx;
      const changes = payload.changes;
      const after = payload.after;

      try{
        const inventoryOperation = await server.getEntityManager<MomInventoryApplication>("mom_inventory_application").findEntity({
          filters: [
            {
              operator: "eq",
              field: "id",
              value: after.id,
            },
          ],
          properties: ["id", "code", "businessType"],
        });

        if (changes) {
          await server.getEntityManager("sys_audit_log").createEntity({
            entity: {
              user: { id: ctx?.routerContext?.state.userId },
              targetSingularCode: "mom_inventory_application",
              targetSingularName: `库存申请单 - ${ inventoryOperation?.businessType?.name } - ${ inventoryOperation?.code }`,
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
    modelSingularCode: "mom_inventory_application",
    handler: async (ctx: EntityWatchHandlerContext<"entity.beforeDelete">) => {
      const { server, payload } = ctx;

      const before = payload.before
      try {
        const inventoryOperation = await server.getEntityManager<MomInventoryApplication>("mom_inventory_application").findEntity({
          filters: [
            {
              operator: "eq",
              field: "id",
              value: before.id,
            },
          ],
          properties: ["id", "code", "businessType"],
        });

        await server.getEntityManager("sys_audit_log").createEntity({
          entity: {
            user: { id: ctx?.routerContext?.state.userId },
            targetSingularCode: "mom_inventory_application",
            targetSingularName: `库存申请单 - ${inventoryOperation?.businessType?.name} - ${inventoryOperation?.code}`,
            method: "delete",
          }
        })
      } catch (e) {
        console.error(e);
      }
    },
  },

] satisfies EntityWatcher<any>[];

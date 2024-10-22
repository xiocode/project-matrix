import type {EntityWatcher, EntityWatchHandlerContext} from "@ruiapp/rapid-core";
import {MomInventoryApplication, MomInventoryOperation,} from "~/_definitions/meta/entity-types";
import {before} from "lodash";

export default [
  {
    eventName: "entity.beforeCreate",
    modelSingularCode: "mom_inventory_application",
    handler: async (ctx: EntityWatchHandlerContext<"entity.beforeCreate">) => {
      const { server, payload } = ctx;

      let before = payload.before
      if (before.source === "manual") {
        before.biller_id = ctx.routerContext?.state.userId
      }
    },
  },
  {
    eventName: "entity.update",
    modelSingularCode: "mom_inventory_application",
    handler: async (ctx: EntityWatchHandlerContext<"entity.update">) => {
      const { server, payload } = ctx;
      const before = payload.before;
      const changes = payload.changes;
      const after = payload.after;

      try {
        const inventoryApplication = await server.getEntityManager<MomInventoryApplication>("mom_inventory_application").findEntity({
          filters: [
            {
              operator: "eq",
              field: "id",
              value: after.id,
            },
          ],
          properties: ["id", "code", "businessType"],
        });


        if (changes.from || changes.to) {
          const inventoryOperation = await server.getEntityManager<MomInventoryOperation>("mom_inventory_operation").findEntity({
            filters: [
              {
                operator: "eq",
                field: "application_id",
                value: after.id,
              },
            ],
            properties: ["id", "code", "businessType"],
          });

          if (inventoryOperation) {
            await server.getEntityManager<MomInventoryOperation>("mom_inventory_operation").updateEntityById({
              id: inventoryOperation.id,
              entityToSave: {
                warehouse: changes.from || changes.to,
              }
            })
          }
        }


        if (changes) {
          if (ctx?.routerContext?.state.userId) {
            await server.getEntityManager("sys_audit_log").createEntity({
              entity: {
                user: { id: ctx?.routerContext?.state.userId },
                targetSingularCode: "mom_inventory_application",
                targetSingularName: `库存申请单 - ${ inventoryApplication?.businessType?.name } - ${ inventoryApplication?.code }`,
                method: "update",
                changes: changes,
                before: before,
              }
            })
          }
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

        if (ctx?.routerContext?.state.userId) {
          await server.getEntityManager("sys_audit_log").createEntity({
            entity: {
              user: { id: ctx?.routerContext?.state.userId },
              targetSingularCode: "mom_inventory_application",
              targetSingularName: `库存申请单 - ${ inventoryOperation?.businessType?.name } - ${ inventoryOperation?.code }`,
              method: "delete",
              before: before,
            }
          })
        }
      } catch (e) {
        console.error(e);
      }
    },
  },

] satisfies EntityWatcher<any>[];

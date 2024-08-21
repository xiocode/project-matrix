import type {EntityWatchHandlerContext, EntityWatcher} from "@ruiapp/rapid-core";
import type {CbsOrder} from "~/_definitions/meta/entity-types";
import {
  createInventoryOperation,
  type CreateInventoryOperationInput
} from "../../server-operations/mom/createInventoryOperation";

export default [
  {
    eventName: "entity.update",
    modelSingularCode: "cbs_order",
    handler: async (ctx: EntityWatchHandlerContext<"entity.update">) => {
      const { server, routerContext, payload } = ctx;
      const changes: Partial<CbsOrder> = payload.changes;
      const after: CbsOrder = payload.after;
      if (after.kind === "purchase") {
        if (!changes.hasOwnProperty("state") || changes.state !== "fulfilled") {
          return;
        }

        const orderItems = await server.queryDatabaseObject(`select *
                                                             from cbs_order_items
                                                             where order_id = $1;`, [after.id]);
        const transfers: CreateInventoryOperationInput["transfers"] = [];
        for (const orderItem of orderItems) {
          transfers.push({
            material: { id: orderItem.subject_id },
            materialCode: "",
            quantity: orderItem.quantity,
            unit: { id: orderItem.unit_id },
            to: { id: 1 },
          });
        }
        const createOperationInput: CreateInventoryOperationInput = {
          operationType: "in",
          businessDetails: {
            businessName: "采购入库",
            cbsOrderId: after.id,
            dbsOrderCode: after.code,
          },
          transfers,
        };
        if (routerContext) {
          await createInventoryOperation(server, routerContext, createOperationInput);
        }

      } else if (after.kind === "sale") {
        if (!changes.hasOwnProperty("state") || changes.state !== "fulfilled") {
          return;
        }

        const orderItems = await server.queryDatabaseObject(`select *
                                                             from cbs_order_items
                                                             where order_id = $1;`, [after.id]);
        const transfers: CreateInventoryOperationInput["transfers"] = [];
        for (const orderItem of orderItems) {
          transfers.push({
            material: { id: orderItem.subject_id },
            materialCode: "",
            quantity: orderItem.quantity,
            unit: { id: orderItem.unit_id },
          });
        }
        const createOperationInput: CreateInventoryOperationInput = {
          operationType: "out",
          businessDetails: {
            businessName: "销售出库",
            cbsOrderId: after.id,
            dbsOrderCode: after.code,
          },
          transfers,
        };
        if (routerContext) {
          await createInventoryOperation(server, routerContext, createOperationInput);
        }
      }
    },
  },
] satisfies EntityWatcher<any>[];

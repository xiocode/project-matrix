import type { EntityWatchHandlerContext, EntityWatcher } from "@ruiapp/rapid-core";
import { first } from "lodash";
import type { MomInventory, MomWorkOrder } from "~/_definitions/meta/entity-types";

export default [
  {
    eventName: "entity.update",
    modelSingularCode: "mom_work_order",
    handler: async (ctx: EntityWatchHandlerContext<"entity.update">) => {
      const { server, payload } = ctx;
      const changes: Partial<MomWorkOrder> = payload.changes;
      const after: MomWorkOrder = payload.after;

      if (!changes.hasOwnProperty("executionState") || changes.executionState !== "completed") {
        return;
      }

      const workOrders = await server.queryDatabaseObject(`select * from mom_work_orders where id=$1;`, [after.id]);

      const workOrder = first(workOrders);
      if (!workOrder) {
        return;
      }

      const inventoryManager = server.getEntityManager<MomInventory>("mom_inventory");

      let inventory = await inventoryManager.findEntity({
        filters: [
          {
            operator: "eq",
            field: "material_id",
            value: workOrder.material_id,
          },
          {
            operator: "eq",
            field: "lot_num",
            value: workOrder.lot_num || "",
          },
          {
            operator: "eq",
            field: "tags",
            value: workOrder.tags || "",
          },
        ],
      });

      if (!inventory) {
        await inventoryManager.createEntity({
          entity: {
            material: { id: workOrder.material_id },
            unit: workOrder.unit_id,
            lotNum: workOrder.lot_num || "",
            tags: workOrder.tags || "",
            allocableQuantity: workOrder.quantity,
            availableQuantity: workOrder.quantity,
            onHandQuantity: workOrder.quantity,
            onOrderQuantity: 0,
            intransitQuantity: 0,
            processingQuantity: 0,
            processedQuantity: 0,
            yieldQuantity: 0,
            reservedQuantity: 0,
            allocatedQuantity: 0,
            shippingQuantity: 0,
            deliveredQuantity: 0,
          } as Partial<MomInventory>,
        });
      } else {
        await inventoryManager.updateEntityById({
          id: inventory.id,
          entityToSave: {
            allocableQuantity: inventory.allocableQuantity + workOrder.quantity,
            availableQuantity: inventory.availableQuantity + workOrder.quantity,
            onHandQuantity: inventory.onHandQuantity + workOrder.quantity,
          } as Partial<MomInventory>,
        });
      }
    },
  },
] satisfies EntityWatcher<any>[];

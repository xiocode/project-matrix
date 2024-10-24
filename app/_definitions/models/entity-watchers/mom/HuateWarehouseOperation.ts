import type {EntityWatcher, EntityWatchHandlerContext, IRpdServer} from "@ruiapp/rapid-core";
import type {BaseLot, HuateWarehouseOperation, MomWorkOrder, SaveBaseLotInput} from "~/_definitions/meta/entity-types";

export default [
  {
    eventName: "entity.create",
    modelSingularCode: "huate_warehouse_operation",
    handler: async (ctx: EntityWatchHandlerContext<"entity.create">) => {
      const { server, payload } = ctx;
      let after = payload.after;

      const operations =  await server.getEntityManager<HuateWarehouseOperation>("huate_warehouse_operation").findEntities({
        properties: ["id", "material", "quantity"],
      });

      // // sum all quantity group by material
      // const materialMap = operations.reduce((acc, cur) => {
      //   if (!acc[cur.material?.id]) {
      //     acc[cur.material?.id] = {
      //       id: cur.material?.id,
      //       name: cur.material?.name,
      //       specification: cur.material?.specification,
      //       quantity: 0
      //     };
      //   }
      //
      //   acc[cur.material?.id].quantity += cur.quantity;
      //   return acc;
      // }, {} as Record<string, HuateWarehouseOperation>);
    },
  },
] satisfies EntityWatcher<any>[];


import type {ActionHandlerContext, IRpdServer, ServerOperation} from "@ruiapp/rapid-core";
import type {
  BaseMaterial,
  MomInventoryApplicationItem,
  MomWarehouseStrategy,
  SaveMomInventoryApplicationItemInput
} from "~/_definitions/meta/entity-types";

export type CreateInventoryApplicationItemInput = {
  application: number;
  material: number;
  unit: number;
  lotNum?: string;
  quantity?: number;
};

export default {
  code: "createInventoryApplicationItems",
  method: "POST",
  async handler(ctx: ActionHandlerContext) {
    const {server} = ctx;
    const input: CreateInventoryApplicationItemInput = ctx.input;

    await createInventoryApplicationItems(server, input);

    ctx.output = {
      result: ctx.input,
    };
  },
} satisfies ServerOperation;

export async function createInventoryApplicationItems(server: IRpdServer, input: CreateInventoryApplicationItemInput) {
  const inventoryApplicationItemManager = server.getEntityManager<MomInventoryApplicationItem>("mom_inventory_application_item");
  const warehouseStrategyManager = server.getEntityManager<MomWarehouseStrategy>("mom_warehouse_strategy");
  const materialManager = server.getEntityManager<BaseMaterial>("base_material");

  const material = await materialManager.findEntity({
    filters: [{field: "id", operator: "eq", value: input.material}],
    properties: ["id", "name", "code", "category", "defaultUnit"],
  });

  if (!material) {
    throw new Error("Material not found.");
  }

  const warehouseStrategy = await warehouseStrategyManager.findEntity({
    filters: [
      {field: "material_category_id", operator: "eq", value: material.category?.id},
      {field: "enabled", operator: "eq", value: true},
    ],
  });

  if (!warehouseStrategy) {
    throw new Error("No warehouse strategy found.");
  }

  if (warehouseStrategy.strategy === "fifo" || warehouseStrategy.strategy === "fdfo") {
    const warehouseStrategyStmt = getWarehouseStrategyStatement(warehouseStrategy.strategy);

    let strategyFilter = "";
    if (warehouseStrategy.qualifiedFilter) {
      strategyFilter += " AND mg.qualified = true";
    }
    if (warehouseStrategy.validityFilter) {
      strategyFilter += " AND mg.validity_date >= now()";
    }

    const goods = await server.queryDatabaseObject(
      `
        WITH good_moving_sum_cte AS (SELECT mg.*,
                                            SUM(mg.quantity)
                                            OVER (PARTITION BY mg.material_id ${warehouseStrategyStmt} ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) -
                                            mg.quantity AS moving_sum
                                     FROM mom_goods mg
                                     WHERE mg.material_id = $1 AND mg.quantity > 0 AND lot_num IS NOT NULL ${strategyFilter})
        SELECT *
        FROM good_moving_sum_cte
        WHERE moving_sum <= $2;
      `,
      [material.id, input.quantity]
    );

    for (const good of goods) {
      await inventoryApplicationItemManager.createEntity({
        entity: {
          application: {id: input.application},
          material: {id: material.id},
          unit: {id: material.defaultUnit?.id},
          lot_num: good.lot_num,
          quantity: good.quantity,
          orderNum: 1,
        } as SaveMomInventoryApplicationItemInput,
      });
    }
  } else {
    if (input.lotNum) {
      await inventoryApplicationItemManager.createEntity({
        entity: {
          application: {id: input.application},
          material: {id: material.id},
          unit: {id: material.defaultUnit?.id},
          lot_num: input.lotNum,
          quantity: input.quantity,
          orderNum: 1,
        } as SaveMomInventoryApplicationItemInput,
      });
    } else {
      throw new Error("Lot number is required.");
    }
  }

}

function getWarehouseStrategyStatement(strategy?: string): string {
  switch (strategy) {
    case "fifo":
      return "ORDER BY mg.created_at ASC";
    case "fdfo":
      return "ORDER BY mg.validity_date ASC";
    default:
      throw new Error("Unknown warehouse strategy.");
  }
}

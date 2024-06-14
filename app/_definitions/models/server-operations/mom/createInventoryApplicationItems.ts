import type {ActionHandlerContext, IRpdServer, ServerOperation} from "@ruiapp/rapid-core";
import type {
  BaseMaterial,
  MomGoodTransfer,
  MomInventoryApplication,
  MomInventoryApplicationItem, SaveMomInventoryApplicationItemInput
} from "~/_definitions/meta/entity-types";

export type CreateInventoryApplicationItemInput = {
  applicationId: number;
  materialId?: number;
  unitId?: number;
  lotNum?: string;
  amount?: number;
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
  const inventoryApplicationManager = server.getEntityManager<MomInventoryApplication>("mom_inventory_application");
  const inventoryApplicationItemManager = server.getEntityManager<MomInventoryApplicationItem>("mom_inventory_application_item");
  const warehouseStrategyManager = server.getEntityManager<MomGoodTransfer>("mom_warehouse_strategy");
  const goodManager = server.getEntityManager<MomGoodTransfer>("mom_good");
  const materialManager = server.getEntityManager<BaseMaterial>("base_material");

  const material = await materialManager.findEntity({
    filters: [
      {
        field: "id",
        operator: "eq",
        value: input.materialId,
      },
    ],
    properties: ["id", "name", "code", "category", "defaultUnit"],
  });

  if (!material) {
    throw new Error("Material not found.");
  }


  const warehouseStrategy = await warehouseStrategyManager.findEntity({
    filters: [
      {
        field: "material_category_id",
        operator: "eq",
        value: material?.category?.id,
      },
      {
        field: "enabled",
        operator: "eq",
        value: true,
      },
    ],
  });

  const goods = await server.queryDatabaseObject(
    `
      WITH good_moving_sum_cte AS (SELECT mg.*,
                                          SUM(mg.quantity)
                                          OVER (PARTITION BY mg.material_id ORDER BY mg.validity_date ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) -
                                          mg.quantity AS moving_sum
                                   FROM mom_goods mg
                                   WHERE material_id = $1
                                     AND lot_num NOTNULL)
      SELECT *
      FROM good_moving_sum_cte
      WHERE moving_sum <= $2;
    `,
    [material.id, input.amount],
  );


  for (const good of goods) {
    await inventoryApplicationItemManager.createEntity({
      entity: {
        application: {id: input.applicationId},
        material: {id: material.id},
        unit: {id: material?.defaultUnit?.id},
        lot_num: good.lot_num,
        quantity: good.quantity,
        orderNum: 1,
      } as SaveMomInventoryApplicationItemInput,
    });
  }
  
}

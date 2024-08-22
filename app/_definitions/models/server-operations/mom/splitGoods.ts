import type {ActionHandlerContext, IRpdServer, RouteContext, ServerOperation} from "@ruiapp/rapid-core";
import type {MomGood, SaveMomGoodInput,} from "~/_definitions/meta/entity-types";
import SequenceService, {GenerateSequenceNumbersInput} from "@ruiapp/rapid-core/src/plugins/sequence/SequenceService";

export type SplitGoodsInput = {
  originGoodId: number;
  shelves: {
    weight: number;
  }[];
};

// 标识卡拆分操作接口
export default {
  code: "splitGoods",
  method: "POST",
  async handler(ctx: ActionHandlerContext) {
    const { server, routerContext } = ctx;
    const input: SplitGoodsInput = ctx.input;

    await splitGoods(server, routerContext, input);

    ctx.output = {
      result: ctx.input,
    };
  },
} satisfies ServerOperation;

async function splitGoods(server: IRpdServer, ctx: RouteContext, input: SplitGoodsInput) {
  const sequenceService = server.getService<SequenceService>("sequenceService");

  const goodManager = server.getEntityManager<MomGood>("mom_good");

  const originGood = await goodManager.findEntity({
    filters: [{
      operator: "and",
      filters: [
        { operator: "eq", field: "id", value: input.originGoodId },
        { operator: "eq", field: "state", value: "normal" },
      ]
    }],
    properties: ["id", "lotNum", "binNum", "material", "location", "quantity", "manufactureDate", "validityDate", "unit", "putInTime", "lot"],
  });

  if (!originGood) {
    throw new Error("原标识卡不存在或已拆分");
  }

  const totalWeight = input.shelves.reduce((acc, curr) => acc + curr.weight, 0);
  if (originGood.quantity! <= 0 || originGood.quantity! < totalWeight) {
    throw new Error("拆分数量大于原标识卡数量");
  }

  const saveGoodInputBase: SaveMomGoodInput = {
    material: originGood.material,
    materialCode: originGood?.material?.code,
    manufactureDate: originGood.manufactureDate,
    validityDate: originGood.validityDate,
    putInTime: originGood.putInTime,
    unit: originGood.unit,
    location: originGood.location,
    lotNum: originGood.lotNum,
    source: originGood,
    state: "normal",
  };

  if (originGood.lot) {
    saveGoodInputBase.lot = originGood.lot
  }

  const binNums = await sequenceService.generateSn(server, {
    ruleCode: "qixiang.binNum",
    amount: input.shelves.length
  } as GenerateSequenceNumbersInput)

  await Promise.all(input.shelves.map(async (shelve, index) => {
    const saveGoodInput = {
      ...saveGoodInputBase,
      binNum: binNums[index],
      quantity: shelve.weight,
    };

    await goodManager.createEntity({ entity: saveGoodInput });
  }));

  await goodManager.updateEntityById({
    routeContext: ctx,
    id: originGood.id,
    entityToSave: { state: "splitted", quantity: 0 } as SaveMomGoodInput,
  });

  await updateInventoryBalance(server);
}


export async function updateInventoryBalance(server: IRpdServer) {

  await server.queryDatabaseObject(
    `
      WITH material_balance AS (SELECT material_id,
                                       unit_id,
                                       tags,
                                       SUM(CASE WHEN state = 'normal' THEN quantity ELSE 0 END) AS on_hand_quantity
                                FROM mom_goods
                                GROUP BY material_id, unit_id, tags)
      INSERT
      INTO mom_material_inventory_balances (material_id, tags, unit_id, available_quantity, on_hand_quantity,
                                            created_at,
                                            updated_at)
      SELECT mb.material_id,
             mb.tags,
             mb.unit_id,
             mb.on_hand_quantity,
             mb.on_hand_quantity,
             NOW(),
             NOW()
      FROM material_balance mb
      ON CONFLICT (material_id, coalesce(tags, ''))
        DO UPDATE SET available_quantity = EXCLUDED.available_quantity,
                      on_hand_quantity   = EXCLUDED.on_hand_quantity,
                      updated_at         = EXCLUDED.updated_at;
    `,
  );

  await server.queryDatabaseObject(
    `
      WITH lot_balance AS (SELECT material_id,
                                  tags,
                                  lot_num,
                                  lot_id,
                                  SUM(CASE WHEN state = 'normal' THEN quantity ELSE 0 END) AS on_hand_quantity
                           FROM mom_goods
                           GROUP BY material_id, tags, lot_num, lot_id)
      INSERT
      INTO mom_material_lot_inventory_balances (material_id, tags, lot_num, lot_id, on_hand_quantity, created_at,
                                                updated_at)
      SELECT lb.material_id,
             lb.tags,
             lb.lot_num,
             lb.lot_id,
             lb.on_hand_quantity,
             NOW(),
             NOW()
      FROM lot_balance lb
      ON CONFLICT (material_id, coalesce(tags, ''), lot_id)
        DO UPDATE SET on_hand_quantity = EXCLUDED.on_hand_quantity,
                      updated_at       = EXCLUDED.updated_at;
    `,
  );

  await server.queryDatabaseObject(
    `
      WITH material_balance AS (SELECT material_id,
                                       unit_id,
                                       tags,
                                       SUM(CASE WHEN state = 'normal' THEN quantity ELSE 0 END) AS on_hand_quantity
                                FROM mom_goods
                                GROUP BY material_id, unit_id, tags)
      INSERT
      INTO mom_material_inventory_balances (material_id, tags, unit_id, available_quantity, on_hand_quantity,
                                            created_at,
                                            updated_at)
      SELECT mb.material_id,
             mb.tags,
             mb.unit_id,
             mb.on_hand_quantity,
             mb.on_hand_quantity,
             NOW(),
             NOW()
      FROM material_balance mb
      ON CONFLICT (material_id, coalesce(tags, ''))
        DO UPDATE SET available_quantity = EXCLUDED.available_quantity,
                      on_hand_quantity   = EXCLUDED.on_hand_quantity,
                      updated_at         = EXCLUDED.updated_at;
    `,
  );

  await server.queryDatabaseObject(
    `
      WITH lot_warehouse_balance AS (SELECT material_id,
                                            tags,
                                            lot_num,
                                            lot_id,
                                            warehouse_id,
                                            SUM(CASE WHEN state = 'normal' THEN quantity ELSE 0 END) AS on_hand_quantity
                                     FROM mom_goods
                                     GROUP BY material_id, tags, lot_num, lot_id, warehouse_id)
      INSERT
      INTO mom_material_lot_warehouse_inventory_balances (material_id, tags, lot_num, lot_id, warehouse_id,
                                                          on_hand_quantity,
                                                          created_at, updated_at)
      SELECT lwb.material_id,
             lwb.tags,
             lwb.lot_num,
             lwb.lot_id,
             lwb.warehouse_id,
             lwb.on_hand_quantity,
             NOW(),
             NOW()
      FROM lot_warehouse_balance lwb
      ON CONFLICT (material_id, coalesce(tags, ''), lot_id, warehouse_id)
        DO UPDATE SET on_hand_quantity = EXCLUDED.on_hand_quantity,
                      updated_at       = EXCLUDED.updated_at;
    `,
  );

  await server.queryDatabaseObject(
    `
      WITH warehouse_balance AS (SELECT material_id,
                                        tags,
                                        warehouse_id,
                                        SUM(CASE WHEN state = 'normal' THEN quantity ELSE 0 END) AS on_hand_quantity
                                 FROM mom_goods
                                 GROUP BY material_id, tags, warehouse_id)
      INSERT
      INTO mom_material_warehouse_inventory_balances (material_id, tags, warehouse_id, on_hand_quantity, created_at,
                                                      updated_at)
      SELECT wb.material_id,
             wb.tags,
             wb.warehouse_id,
             wb.on_hand_quantity,
             NOW(),
             NOW()
      FROM warehouse_balance wb
      ON CONFLICT (material_id, coalesce(tags, ''), warehouse_id)
        DO UPDATE SET on_hand_quantity = EXCLUDED.on_hand_quantity,
                      updated_at       = EXCLUDED.updated_at;
    `,
  );

  await server.queryDatabaseObject(
    `
      WITH location_balance AS (SELECT material_id,
                                       tags,
                                       warehouse_id,
                                       location_id,
                                       SUM(CASE WHEN state = 'normal' THEN quantity ELSE 0 END) AS on_hand_quantity
                                FROM mom_goods
                                GROUP BY material_id, tags, warehouse_id, location_id)
      INSERT
      INTO mom_material_warehouse_location_inventory_balances (material_id, tags, warehouse_id, location_id,
                                                               on_hand_quantity,
                                                               created_at, updated_at)
      SELECT lb.material_id,
             lb.tags,
             lb.warehouse_id,
             lb.location_id,
             lb.on_hand_quantity,
             NOW(),
             NOW()
      FROM location_balance lb
      ON CONFLICT (material_id, coalesce(tags, ''), warehouse_id, location_id)
        DO UPDATE SET on_hand_quantity = EXCLUDED.on_hand_quantity,
                      updated_at       = EXCLUDED.updated_at;
    `,
  );
}

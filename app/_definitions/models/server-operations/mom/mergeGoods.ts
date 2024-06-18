import type {ActionHandlerContext, IRpdServer, ServerOperation} from "@ruiapp/rapid-core";
import type {MomGood, SaveMomGoodInput} from "~/_definitions/meta/entity-types";
import dayjs from "dayjs";

export type MergeGoodsInput = {
  goodIds: number[];
  locationId: number;
};

// 标识卡拆分操作接口
export default {
  code: "mergeGoods",
  method: "POST",
  async handler(ctx: ActionHandlerContext) {
    const {server} = ctx;
    const input: MergeGoodsInput = ctx.input;

    await mergeGoods(server, input);

    ctx.output = {
      result: ctx.input,
    };
  },
} satisfies ServerOperation;

async function mergeGoods(server: IRpdServer, input: MergeGoodsInput) {
  const goodManager = server.getEntityManager<MomGood>("mom_good");

  const goods = await goodManager.findEntities({
    filters: [{operator: "in", field: "id", value: input.goodIds}],
    properties: ["id", "lotNum", "binNum", "material", "location", "quantity", "manufactureDate", "validityDate", "unit", "putInTime", "lot"],
  });

  // Check if all goods exist and lotNum and material should be matched
  if (goods.length !== input.goodIds.length) {
    throw new Error("部分标识卡不存在");
  }

  const originGood = goods[0];
  if (goods.some(good => good.lotNum !== originGood.lotNum || good.material?.id !== originGood.material?.id)) {
    throw new Error("标识卡批次号或物料不一致");
  }

  let newGood: MomGood;

  let saveGoodInput: SaveMomGoodInput = {
    material: originGood.material,
    location: {id: input.locationId},
    quantity: goods.reduce((acc, curr) => acc + (curr?.quantity || 0), 0),
    manufactureDate: dayjs().format("YYYY-MM-DD"),
    putInTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    unit: originGood.unit,
    lotNum: originGood.lotNum,
    binNum: `${originGood.binNum}-MERGED`,
    validityDate: originGood.validityDate,
    state: 'normal'
  }

  if (originGood.lot) {
    //   create new good and update old goods state to merged
    saveGoodInput.lot = originGood.lot
  }

  newGood = await goodManager.createEntity({
    entity: saveGoodInput,
  });

  await Promise.all(goods.map(async good => {
    await goodManager.updateEntityById({
      id: good.id,
      entityToSave: {
        state: "merged",
        source: newGood,
      } as SaveMomGoodInput,
    });
  }));
}

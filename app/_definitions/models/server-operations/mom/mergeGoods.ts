import type {ActionHandlerContext, IRpdServer, ServerOperation} from "@ruiapp/rapid-core";
import type {
  MomGood,
  MomGoodLocation,
  MomGoodTransfer, SaveMomGoodInput,
  SaveMomGoodLocationInput,
  SaveMomGoodTransferInput,
} from "~/_definitions/meta/entity-types";
import dayjs from "dayjs";

export type MergeGoodsInput = {
  goodIds: number[];
  toLocationId: number;
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
  const goodLocationManager = server.getEntityManager<MomGoodLocation>("mom_good_location");
  const goodTransferManager = server.getEntityManager<MomGoodTransfer>("mom_good_transfer");

  const goods = await goodManager.findEntities({
    filters: [{operator: "in", field: "id", value: input.goodIds}],
    properties: ["id", "lotNum", "binNum", "material", "location", "quantity", "manufactureDate", "validityDate", "unit", "putInTime"],
  });

  // Check if all goods exist and lotNum and material should be matched
  if (goods.length !== input.goodIds.length) {
    throw new Error("部分标识卡不存在");
  }

  const originGood = goods[0];
  if (goods.some(good => good.lotNum !== originGood.lotNum || good.material?.id !== originGood.material?.id)) {
    throw new Error("标识卡批次号或物料不一致");
  }

//   create new good and update old goods state to merged
  const newGood = await goodManager.createEntity({
    entity: {
      material: originGood.material,
      location: {id: input.toLocationId},
      quantity: goods.reduce((acc, curr) => acc + (curr?.quantity || 0), 0),
      manufactureDate: dayjs().format("YYYY-MM-DD"),
      putInTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      unit: originGood.unit,
      lotNum: originGood.lotNum,
      binNum: `${originGood.binNum}-MERGED`,
      validityDate: originGood.validityDate,
      state: 'normal'
    } as SaveMomGoodInput,
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

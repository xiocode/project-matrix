import type {ActionHandlerContext, IRpdServer, ServerOperation} from "@ruiapp/rapid-core";
import type {
  MomGood,
  MomGoodLocation,
  MomGoodTransfer, SaveMomGoodInput,
  SaveMomGoodLocationInput,
  SaveMomGoodTransferInput,
} from "~/_definitions/meta/entity-types";
import dayjs from "dayjs";

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
    const {server} = ctx;
    const input: SplitGoodsInput = ctx.input;

    await mergeGoods(server, input);

    ctx.output = {
      result: ctx.input,
    };
  },
} satisfies ServerOperation;

async function mergeGoods(server: IRpdServer, input: SplitGoodsInput) {
  const goodManager = server.getEntityManager<MomGood>("mom_good");
  const goodLocationManager = server.getEntityManager<MomGoodLocation>("mom_good_location");
  const goodTransferManager = server.getEntityManager<MomGoodTransfer>("mom_good_transfer");

  const originGood = await goodManager.findEntity({
    filters: [{operator: "eq", field: "id", value: input.originGoodId}],
    properties: ["id", "lotNum", "binNum", "material", "location", "quantity", "manufactureDate", "validityDate", "unit", "putInTime"],
  });

  if (!originGood) {
    throw new Error("原标识卡不存在");
  }

  if (originGood.quantity && originGood.quantity <= 0) {
    throw new Error("原标识卡数量不足");
  }

  if (originGood.quantity && originGood.quantity < input.shelves.reduce((acc, curr) => acc + curr.weight, 0)) {
    throw new Error("拆分数量大于原标识卡数量");
  }

  await Promise.all(input.shelves.map(async (shelve, index) => {
    await goodManager.createEntity(
      {
        entity: {
          material: originGood.material,
          materialCode: originGood?.material?.code,
          manufactureDate: originGood.manufactureDate,
          validityDate: originGood.validityDate,
          putInTime: originGood.putInTime,
          unit: originGood.unit,
          location: originGood.location,
          lotNum: originGood.lotNum,
          binNum: `${originGood.binNum}-${index + 1}`,
          quantity: shelve.weight,
          source: originGood,
          state: "normal",
        } as SaveMomGoodInput
      }
    );
  }));

  await goodManager.updateEntityById({
    id: originGood.id,
    entityToSave: {
      state: "splitted",
    } as SaveMomGoodInput
  });

}

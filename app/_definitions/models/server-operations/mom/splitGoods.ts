import type {ActionHandlerContext, IRpdServer, RouteContext, ServerOperation} from "@ruiapp/rapid-core";
import type {MomGood, SaveMomGoodInput,} from "~/_definitions/meta/entity-types";
import SequenceService, {GenerateSequenceNumbersInput} from "@ruiapp/rapid-core/src/plugins/sequence/SequenceService";
import MomGoodTransfer from "~/_definitions/models/entities/MomGoodTransfer";

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
    const {server, routerContext} = ctx;
    const input: SplitGoodsInput = ctx.input;

    await splitGoods(server, routerContext, input);

    ctx.output = {
      result: ctx.input,
    };
  },
} satisfies ServerOperation;

async function splitGoods(server: IRpdServer, ctx : RouteContext, input: SplitGoodsInput) {
  const sequenceService = server.getService<SequenceService>("sequenceService");

  const goodManager = server.getEntityManager<MomGood>("mom_good");

  const originGood = await goodManager.findEntity({
    filters: [{
      operator: "and",
      filters: [
        {operator: "eq", field: "id", value: input.originGoodId},
        {operator: "eq", field: "state", value: "normal"},
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

    await goodManager.createEntity({entity: saveGoodInput});
  }));

  await goodManager.updateEntityById({
    routeContext: ctx,
    id: originGood.id,
    entityToSave: {state: "splitted"} as SaveMomGoodInput,
  });
}

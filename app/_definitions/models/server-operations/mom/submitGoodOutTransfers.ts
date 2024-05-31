import type {ActionHandlerContext, IRpdServer, ServerOperation} from "@ruiapp/rapid-core";
import type {
  MomGood,
  MomGoodLocation,
  MomGoodTransfer, SaveMomGoodInput,
  SaveMomGoodLocationInput,
  SaveMomGoodTransferInput,
} from "~/_definitions/meta/entity-types";
import dayjs from "dayjs";

export type CreateGoodOutTransferInput = {
  operationId: number;
  materialId: number;
  lotNum: string;
  shelves: {
    binNum: string;
  }[];
};

// PDA入库操作接口
export default {
  code: "submitGoodOutTransfers",
  method: "POST",
  async handler(ctx: ActionHandlerContext) {
    const {server} = ctx;
    const input: CreateGoodOutTransferInput = ctx.input;

    await submitGoodOutTransfers(server, input);

    ctx.output = {
      result: ctx.input,
    };
  },
} satisfies ServerOperation;

async function submitGoodOutTransfers(server: IRpdServer, input: CreateGoodOutTransferInput) {
  const goodManager = server.getEntityManager<MomGood>("mom_good");
  const goodLocationManager = server.getEntityManager<MomGoodLocation>("mom_good_location");
  const goodTransferManager = server.getEntityManager<MomGoodTransfer>("mom_good_transfer");

  for (const shelve of input.shelves) {
    const goods = await goodManager.findEntities({
      filters: [
        {
          operator: "and",
          filters: [
            {
              field: "material",
              operator: "exists",
              filters: [
                {
                  field: "id",
                  operator: "eq",
                  value: input.materialId
                }
              ]
            }
          ]
        },
        {operator: "eq", field: "lotNum", value: input.lotNum},
        {operator: "eq", field: "binNum", value: shelve.binNum},
      ],
      properties: ["id", "material", "unit", "location", "quantity", "lotNum", "binNum"],
    })

    if (goods) {
      for (const good of goods) {
        // await Promise.all([
        //   goodManager.deleteById(good.id),
        //   deleteGoodLocation(goodLocationManager, good.id, good.location?.id)
        // ]);

        await goodTransferManager.createEntity({
          entity: {
            operation: {id: input.operationId},
            material: {id: good.material?.id},
            lotNum: good.lotNum,
            binNum: good.binNum,
            quantity: good.quantity,
            unit: {id: good.unit?.id},
            transferType: "out",
            transferTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
          },
        });
      }
    }
  }
}

async function deleteGoodLocation(goodLocationManager: any, goodId: number, locationId: number | undefined) {
  if (!locationId) return;

  const goodLocation = await goodLocationManager.findEntity({
    filters: [
      {
        operator: "and",
        filters: [
          {field: "good", operator: "exists", filters: [{field: "id", operator: "eq", value: goodId}]},
          {
            field: "location",
            operator: "exists",
            filters: [{field: "id", operator: "eq", value: locationId}]
          },
        ]
      }
    ],
    properties: ["id"],
  });

  if (goodLocation) {
    await goodLocationManager.deleteById(goodLocation.id);
  }
}

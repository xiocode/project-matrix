import type {ActionHandlerContext, IRpdServer, ServerOperation} from "@ruiapp/rapid-core";
import type {
  BaseMaterial,
  BaseUnit,
  MomGood,
  MomGoodTransfer,
  MomInspectionSheet,
  MomInventoryOperation,
  SaveMomGoodInput,
  SaveMomGoodTransferInput,
  SaveMomInspectionSheetInput,
} from "~/_definitions/meta/entity-types";
import dayjs from "dayjs";

export type CreateGoodTransferInput = {
  operationId: number;
  material?: number;
  lotNum: string;
  manufactureDate: string;
  palletCount?: number;
  palletWeight: number;
  packageNum: number;
  transfers: {
    palletWeight?: number;
  }[];
};

export default {
  code: "createGoodTransfers",
  method: "POST",
  async handler(ctx: ActionHandlerContext) {
    const {server} = ctx;
    const input: CreateGoodTransferInput = ctx.input;

    await createGoodTransfers(server, input);

    ctx.output = {
      result: ctx.input,
    };
  },
} satisfies ServerOperation;

async function createGoodTransfers(server: IRpdServer, input: CreateGoodTransferInput) {
  const goodManager = server.getEntityManager<MomGood>("mom_good");
  const materialManager = server.getEntityManager<BaseMaterial>("base_material");
  const unitManager = server.getEntityManager<BaseUnit>("base_unit");
  const goodTransferManager = server.getEntityManager<MomGoodTransfer>("mom_good_transfer");
  const inventoryOperationManager = server.getEntityManager<MomInventoryOperation>("mom_inventory_operation");

  const inventoryOperation = await inventoryOperationManager.findEntity({
    filters: [
      {operator: "eq", field: "id", value: input.operationId},
    ],
    properties: ["id", "businessType"],
  });

  const material = await materialManager.findEntity({
    filters: [
      {operator: "eq", field: "id", value: input?.material},
    ],
    properties: ["id", "code", "defaultUnit"],
  });

  const unit = await unitManager.findById(material?.defaultUnit?.id);

  let goods: SaveMomGoodInput[] = [];
  // if palletCount is given, create a good for each pallet
  if (input.palletCount) {
    const binNum = dayjs().format("YYYYMMDDHHmmss")
    for (let i = 0; i < input.palletCount; i++) {
      const good = {
        material: {id: material?.id},
        materialCode: material?.code,
        lotNum: input.lotNum,
        binNum: `${binNum}-${i + 1}`,
        quantity: input.palletWeight,
        unit: {id: unit?.id},
        state: "normal",
        manufactureDate: input.manufactureDate,
        validityDate: dayjs(input.manufactureDate).add(parseInt(material?.qualityGuaranteePeriod || '0', 10), 'day').format('YYYY-MM-DD'),
      } as SaveMomGoodInput

      goods.push(good);
    }
  }

  if (goods.length == 0) {

    let idx = 0;
    const binNum = dayjs().format("YYYYMMDDHHmmss")

    for (let transfer of input.transfers) {
      idx+=1;
      const good = {
        material: material,
        materialCode: material?.code,
        lotNum: input.lotNum,
        binNum: `${binNum}-${idx + 1}`,
        quantity: transfer.palletWeight,
        unit: {id: unit?.id},
        state: "normal",
        manufactureDate: input.manufactureDate,
        validityDate: dayjs(input.manufactureDate).add(parseInt(material?.qualityGuaranteePeriod || '0', 10), 'day').format('YYYY-MM-DD'),
      } as SaveMomGoodInput
      goods.push(good);

    }
  }

  for (const goodInput of goods) {
    const good = await findOrCreateGood(goodManager, goodInput);
    await createGoodTransfer(goodTransferManager, input.operationId, good);
  }

  if (inventoryOperation?.businessType?.name === "采购入库") {
    await saveInspectionSheet(server, {
      inventoryOperation: {id: input.operationId},
      lotNum: input.lotNum,
      material: {id: input?.material},
      state: "pending",
    });
  }

}

async function findOrCreateGood(goodManager: any, input: SaveMomGoodInput) {
  let good = await goodManager.findEntity({
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
                value: input.material?.id
              }
            ]
          }
        ]
      },
      {operator: "eq", field: "lotNum", value: input.lotNum},
      {operator: "eq", field: "binNum", value: input.binNum},
    ],
    properties: ["id", "material", "lotNum", "binNum", "quantity", "unit"],
  });

  if (!good) {
    good = await goodManager.createEntity({
      entity: input,
    });
  }

  return await goodManager.findEntity({
    filters: [
      {operator: "eq", field: "id", value: good.id},
    ],
    properties: ["id", "material", "lotNum", "binNum", "quantity", "unit"],
  })
}

async function createGoodTransfer(goodTransferManager: any, operationId: number, good: MomGood) {
  await goodTransferManager.createEntity({
    entity: {
      operation: {id: operationId},
      good: {id: good.id},
      material: {id: good?.material?.id},
      lotNum: good.lotNum,
      binNum: good.binNum,
      quantity: good.quantity,
      unit: {id: good.unit?.id},
      transferTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    } as SaveMomGoodTransferInput,
  });
}


async function saveInspectionSheet(server: IRpdServer, sheet: SaveMomInspectionSheetInput) {
  if (!sheet.lotNum || !sheet.material || !sheet.material.id) {
    throw new Error("lotNum and material are required when saving lot info.");
  }

  const inspectionSheetManager = server.getEntityManager<MomInspectionSheet>("mom_inspection_sheet");
  const lotInDb = await inspectionSheetManager.findEntity({
    filters: [
      {
        operator: "eq",
        field: "lot_num",
        value: sheet.lotNum,
      },
      {
        operator: "eq",
        field: "material_id",
        value: sheet.material.id,
      },
    ],
  });

  if (!lotInDb) {
    return await inspectionSheetManager.createEntity({
      entity: sheet,
    });
  }

  return lotInDb;
}

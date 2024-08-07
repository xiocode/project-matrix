import type {ActionHandlerContext, IRpdServer, ServerOperation} from "@ruiapp/rapid-core";
import type {
  BaseLot,
  BaseMaterial,
  BaseUnit,
  MomGood,
  MomGoodTransfer,
  MomInspectionRule, MomInspectionSampling, MomInspectionSamplingItem,
  MomInventoryOperation,
  SaveBaseLotInput,
  SaveMomGoodInput,
  SaveMomGoodTransferInput,
  SaveMomInspectionSheetInput,
} from "~/_definitions/meta/entity-types";
import dayjs from "dayjs";
import SequenceService, {GenerateSequenceNumbersInput} from "@ruiapp/rapid-core/src/plugins/sequence/SequenceService";

export type CreateGoodTransferInput = {
  operationId: number;
  material?: number;
  lotNum: string;
  lotId?: number;
  manufactureDate: string;
  palletCount?: number;
  palletWeight: number;
  packageNum: number;
  transfers: {
    palletWeight?: number;
  }[];
  print?: boolean;
};

export default {
  code: "createGoodTransfers",
  method: "POST",
  async handler(ctx: ActionHandlerContext) {
    const { server } = ctx;
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
  const inspectRuleManager = server.getEntityManager<MomInspectionRule>("mom_inspection_rule");
  const unitManager = server.getEntityManager<BaseUnit>("base_unit");
  const goodTransferManager = server.getEntityManager<MomGoodTransfer>("mom_good_transfer");
  const inventoryOperationManager = server.getEntityManager<MomInventoryOperation>("mom_inventory_operation");

  const sequenceService = server.getService<SequenceService>("sequenceService");

  const [inventoryOperation, material] = await Promise.all([
    inventoryOperationManager.findEntity({
      filters: [{ operator: "eq", field: "id", value: input.operationId }],
      properties: ["id", "category", "businessType"],
    }),
    materialManager.findEntity({
      filters: [{ operator: "eq", field: "id", value: input?.material }],
      properties: ["id", "code", "defaultUnit", "qualityGuaranteePeriod"],
    }),
  ]);

  if (!material) {
    throw new Error("Material not found");
  }

  const validityDate = dayjs(input.manufactureDate)
    .add(parseInt(material.qualityGuaranteePeriod || "0", 10), "day")
    .format("YYYY-MM-DD");

  const lotInfo = await saveMaterialLotInfo(server, {
    lotNum: input.lotNum,
    material: { id: input.material },
    sourceType: inventoryOperation?.businessType?.config?.defaultSourceType || null,
    qualificationState: inventoryOperation?.businessType?.config?.defaultQualificationState || "qualified",
    validityDate: validityDate,
    isAOD: false,
    state: "pending",
  });

  input.lotId = lotInfo?.id;

  const unit = await unitManager.findById({ id: material.defaultUnit?.id });
  const binNums = await sequenceService.generateSn(server, {
    ruleCode: "qixiang.binNum",
    amount: 1
  } as GenerateSequenceNumbersInput)


  const goods: SaveMomGoodInput[] = input.palletCount
    ? Array.from({ length: input.palletCount }, (_, i) => createGoodInput(material, unit, input, validityDate, `${ binNums[0] }-${ i + 1 }`, input.palletWeight))
    : input.transfers.map((transfer, idx) => createGoodInput(material, unit, input, validityDate, `${ binNums[0] }-${ idx + 1 }`, transfer.palletWeight));

  let totalWeight = 0;

  for (const goodInput of goods) {
    totalWeight += goodInput.quantity || 0;
    const good = await findOrCreateGood(goodManager, goodInput);
    await createGoodTransfer(goodTransferManager, input.operationId, good, input?.print);
  }

  if (!inventoryOperation?.businessType?.config?.NeedInspection && inventoryOperation?.businessType?.config?.inspectionCategoryId) {
    const inspectRule = await inspectRuleManager.findEntity({
      filters: [
        { operator: "eq", field: "material_id", value: material.id },
        { operator: "eq", field: "category_id", value: inventoryOperation?.businessType?.config?.inspectionCategoryId },
      ],
      properties: ["id"],
    });

    const samplingRule = await server.getEntityManager<MomInspectionSamplingItem>("mom_inspection_sampling_item").findEntity({
      filters: [
        {
          operator: "exists",
          field: "sampling",
          filters: [{ operator: "eq", field: "material_category_id", value: material.category?.id }]
        },
        { operator: "lte", field: "to", value: totalWeight },
      ],
      orderBy: [{ field: "to", desc: true }],
      properties: ["id", "sampling", "samplingCount"],
    })

    if (inspectRule) {
      await saveInspectionSheet(server, {
        inventoryOperation: { id: input.operationId },
        lotNum: input.lotNum,
        lot: { id: lotInfo.id },
        rule: { id: inspectRule?.id },
        material: { id: input.material },
        approvalState: "approving",
        state: "pending",
        sampleCount: samplingRule?.samplingCount,
      });
    } else {
      await saveInspectionSheet(server, {
        inventoryOperation: { id: input.operationId },
        lotNum: input.lotNum,
        lot: { id: lotInfo.id },
        material: { id: input.material },
        approvalState: "approving",
        state: "pending",
        sampleCount: samplingRule?.samplingCount,
      });
    }
  }
}

function createGoodInput(
  material: BaseMaterial,
  unit: BaseUnit | null,
  input: CreateGoodTransferInput,
  validityDate: string,
  binNum: string,
  palletWeight?: number,
): SaveMomGoodInput {
  return {
    material: { id: material.id },
    materialCode: material.code,
    lotNum: input.lotNum,
    lot: { id: input.lotId },
    binNum: binNum,
    quantity: palletWeight,
    unit: { id: unit?.id },
    state: "pending",
    manufactureDate: input.manufactureDate,
    validityDate,
  } as SaveMomGoodInput;
}

async function findOrCreateGood(goodManager: any, input: SaveMomGoodInput) {
  let good = await goodManager.findEntity({
    filters: [
      { operator: "eq", field: "material_id", value: input.material?.id },
      { operator: "eq", field: "lot_num", value: input.lotNum },
      { operator: "eq", field: "bin_num", value: input.binNum },
    ],
    properties: ["id", "material", "lotNum", "binNum", "quantity", "unit", "lot"],
  });

  if (!good) {
    good = await goodManager.createEntity({ entity: input });
    good = await goodManager.findEntity({
      filters: [{ operator: "eq", field: "id", value: good.id }],
      properties: ["id", "material", "lotNum", "binNum", "quantity", "unit", "lot"],
    });
  }

  return good;
}

async function createGoodTransfer(goodTransferManager: any, operationId: number, good: MomGood, print: boolean = false) {
  await goodTransferManager.createEntity({
    entity: {
      operation: { id: operationId },
      good: { id: good.id },
      material: { id: good.material?.id },
      lotNum: good.lotNum,
      lot: { id: good?.lot?.id },
      binNum: good.binNum,
      quantity: good.quantity,
      unit: { id: good.unit?.id },
      transferTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      printTime: print ? dayjs().format("YYYY-MM-DD HH:mm:ss") : null,
    } as SaveMomGoodTransferInput,
  });
}

async function saveInspectionSheet(server: IRpdServer, sheet: SaveMomInspectionSheetInput) {
  if (!sheet.lotNum || !sheet.material || !sheet.material.id) {
    throw new Error("lotNum and material are required when saving lot info.");
  }

  const inspectionSheetManager = server.getEntityManager("mom_inspection_sheet");

  const inspectionSheet = await inspectionSheetManager.findEntity({
    filters: [
      { operator: "eq", field: "lot_num", value: sheet.lotNum },
      { operator: "eq", field: "material_id", value: sheet.material.id },
      { operator: "eq", field: "inventory_operation_id", value: sheet.inventoryOperation?.id },
    ],
  });

  if (inspectionSheet) {
    return inspectionSheet;
  }

  return await inspectionSheetManager.createEntity({ entity: sheet });
}

async function saveMaterialLotInfo(server: IRpdServer, lot: SaveBaseLotInput) {
  if (!lot.lotNum || !lot.material || !lot.material.id) {
    throw new Error("lotNum and material are required when saving lot info.");
  }

  const baseLotManager = server.getEntityManager<BaseLot>("base_lot");
  const lotInDb = await baseLotManager.findEntity({
    filters: [
      { operator: "eq", field: "lot_num", value: lot.lotNum },
      { operator: "eq", field: "material_id", value: lot.material.id },
    ],
  });

  return lotInDb || (await baseLotManager.createEntity({ entity: lot }));
}

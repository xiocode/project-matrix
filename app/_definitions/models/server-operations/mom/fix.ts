import type {ActionHandlerContext, IRpdServer, ServerOperation} from "@ruiapp/rapid-core";
import type {
  MomGoodTransfer,
  MomInspectionRule,
  MomInventoryOperation,
  SaveMomInspectionSheetInput,
} from "~/_definitions/meta/entity-types";

export type CreateGoodTransferInput = {
  operationId: number;
};

export default {
  code: "fix",
  method: "POST",
  async handler(ctx: ActionHandlerContext) {
    const { server } = ctx;
    const input: CreateGoodTransferInput = ctx.input;

    await fix(server, input);

    ctx.output = {
      result: ctx.input,
    };
  },
} satisfies ServerOperation;

async function fix(server: IRpdServer, input: CreateGoodTransferInput) {
  const inspectRuleManager = server.getEntityManager<MomInspectionRule>("mom_inspection_rule");
  const goodTransferManager = server.getEntityManager<MomGoodTransfer>("mom_good_transfer");
  const inventoryOperationManager = server.getEntityManager<MomInventoryOperation>("mom_inventory_operation");

  const inventoryOperation = await inventoryOperationManager.findEntity({
    filters: [{ operator: "eq", field: "id", value: input.operationId }],
    properties: ["id", "category", "businessType"],
  });

  const goodTransfers = await goodTransferManager.findEntities({
    filters: [{ operator: "eq", field: "operation_id", value: input.operationId }],
    properties: ["id", "lot", "lotNum", "binNum", "good", "material"],
  });

  if (inventoryOperation?.businessType?.config?.inspectionCategoryId && inventoryOperation?.businessType?.config?.inspectionCategoryId > 0) {
    for (const goodTransfer of goodTransfers) {
      const inspectRule = await inspectRuleManager.findEntity({
        filters: [
          { operator: "eq", field: "material_id", value: goodTransfer.material?.id },
          {
            operator: "eq",
            field: "category_id",
            value: inventoryOperation?.businessType?.config?.inspectionCategoryId
          },
        ],
        properties: ["id"],
      });


      if (inspectRule) {
        await saveInspectionSheet(server, {
          inventoryOperation: { id: input.operationId },
          lotNum: goodTransfer.lotNum,
          lot: { id: goodTransfer.lot?.id },
          rule: { id: inspectRule?.id },
          material: goodTransfer.material,
          approvalState: "approving",
          state: "pending",
          round: 1,
        });
      } else {
        await saveInspectionSheet(server, {
          inventoryOperation: { id: input.operationId },
          lotNum: goodTransfer.lotNum,
          lot: { id: goodTransfer.lot?.id },
          material: goodTransfer.material,
          approvalState: "approving",
          state: "pending",
          round: 1,
        });
      }
    }
  }
}


async function saveInspectionSheet(server: IRpdServer, sheet: SaveMomInspectionSheetInput) {
  if (!sheet.lotNum || !sheet.material || !sheet.material.id) {
    throw new Error("lotNum and material are required when saving lot info.");
  }

  const inspectionSheetManager = server.getEntityManager("mom_inspection_sheet");

  let inspectionSheet = await inspectionSheetManager.findEntity({
    filters: [
      { operator: "eq", field: "lot_num", value: sheet.lotNum },
      { operator: "eq", field: "material_id", value: sheet.material.id },
      { operator: "eq", field: "inventory_operation_id", value: sheet.inventoryOperation?.id },
    ],
    keepNonPropertyFields: true,
  });

  if (inspectionSheet) {
    return inspectionSheet
  }

  inspectionSheet = await inspectionSheetManager.findEntity({
    filters: [
      { operator: "eq", field: "lot_num", value: sheet.lotNum },
      { operator: "eq", field: "material_id", value: sheet.material.id },
      { operator: "null", field: "inventory_operation_id" },
    ],
    keepNonPropertyFields: true,
  });

  if (inspectionSheet) {
    await inspectionSheetManager.updateEntityById(
      {
        id: inspectionSheet.id,
        entityToSave: {
          lot_id: sheet.lot?.id,
          inventory_operation_id: sheet.inventoryOperation?.id
        }
      }
    );
    return inspectionSheet;
  }

  return await inspectionSheetManager.createEntity({ entity: sheet });
}

import type {ActionHandlerContext, IRpdServer, ServerOperation} from "@ruiapp/rapid-core";
import {utils, writeXLSX} from "xlsx";
import type {MomGoodTransfer, MomInventoryOperation} from "~/_definitions/meta/entity-types";

export type ExportExcelInput = {
  text: string;
  createdAtFrom: string;
  createdAtTo: string;
};

export default {
  code: "exportExcel",
  method: "POST",
  async handler(ctx: ActionHandlerContext) {
    const { server } = ctx;
    const input: ExportExcelInput = ctx.input;

    ctx.routerContext.response.headers.set("Content-Disposition", `attachment; filename="${ encodeURIComponent('file.xlsx') }"`);
    ctx.routerContext.response.body = await exportExcel(server, input);
  },
} satisfies ServerOperation;

async function exportExcel(server: IRpdServer, input: ExportExcelInput) {

  const goodTransferManager = server.getEntityManager<MomGoodTransfer>("mom_good_transfer");

  // fetch data from the database
  const goodTransfers = await goodTransferManager.findEntities({
    filters: [],
    properties: ["id", "operation", "lotNum", "binNum", "material", "quantity", "packageNum", "manufactureDate", "validityDate", "from", "to"],
    relations: {
      operation: { properties: ["id", "code", "businessType", "applicant", "application", "contractNum", "productionPlanSn", "supplier", "customer", "shop", "department", "finishedMaterial"] }
    },
  })

  // flatten the data
  let rows = goodTransfers.map((goodTransfer) => {
    return {
      code: goodTransfer.operation?.code,
      businessType: goodTransfer.operation?.businessType?.name,
      applicant: goodTransfer.operation?.createdBy?.name,
      application: goodTransfer.operation?.application?.code,
      contractNum: goodTransfer.operation?.contractNum,
      productionPlanSn: goodTransfer.operation?.productionPlanSn,
      supplier: goodTransfer.operation?.supplier?.name,
      customer: goodTransfer.operation?.customer?.name,
      shop: goodTransfer.operation?.shop,
      department: goodTransfer.operation?.department?.name,
      finishedMaterial: goodTransfer.operation?.finishedMaterial?.name,
      material: goodTransfer.material?.name,
      lotNum: goodTransfer.lotNum,
      binNum: goodTransfer.binNum,
      quantity: goodTransfer.quantity,
      packageNum: goodTransfer.packageNum,
      manufactureDate: goodTransfer.manufactureDate,
      validityDate: goodTransfer.validityDate,
      to: goodTransfer.to?.name,
      from: goodTransfer.from?.name,
      qualificationState: goodTransfer.lot?.qualificationState,
      isAOD: goodTransfer.lot?.isAOD,
    };
  });

  // Create a new workbook
  const worksheet = utils.json_to_sheet(rows);
  const workbook = utils.book_new();

  // Add the header row
  utils.sheet_add_aoa(worksheet, [[ "操作单号", "操作类型", "申请人"]], { origin: "A1" });

  // Add the worksheet to the workbook
  utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  /* calculate column width */
  // const max_width = rows.reduce((w, r) => Math.max(w, r?.code.length), 10);
  // worksheet["!cols"] = [{ wch: max_width }];

  // Return the buffer as the response body
  return writeXLSX(workbook, { type: "buffer", bookType: "xlsx" });
}

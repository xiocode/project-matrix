import type {ActionHandlerContext, IRpdServer, ServerOperation} from "@ruiapp/rapid-core";
import {utils, writeXLSX} from "xlsx";

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

  // fetch data from the database
  let rows = [{ name: "John Doe", birthday: "1980-01-01" }, { name: "Jane Doe", birthday: "1981-02-02" }];

  // Create a new workbook
  const worksheet = utils.json_to_sheet(rows);
  const workbook = utils.book_new();

  // Add the header row
  utils.sheet_add_aoa(worksheet, [["Name", "Birthday"]], { origin: "A1" });

  // Add the worksheet to the workbook
  utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  /* calculate column width */
  const max_width = rows.reduce((w, r) => Math.max(w, r.name.length), 10);
  worksheet["!cols"] = [{ wch: max_width }];

  // Return the buffer as the response body
  return writeXLSX(workbook, { type: "buffer", bookType: "xlsx" });
}

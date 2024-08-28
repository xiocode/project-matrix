import {ActionHandlerContext, IRpdServer, mapDbRowToEntity, ServerOperation} from "@ruiapp/rapid-core";

export type QueryLocationInput = {
  warehouseId?: string;
  code: string;
};


export default {
  code: "queryLocation",
  method: "POST",
  async handler(ctx: ActionHandlerContext) {
    const { server } = ctx;
    const input: QueryLocationInput = ctx.input;

    const transferOutputs = await queryLocation(server, input);

    ctx.output = transferOutputs;
  },
} satisfies ServerOperation;

async function queryLocation(server: IRpdServer, input: QueryLocationInput) {

  let stmt =     `
      select *
      from base_locations
      where code = $1;
    `

  let params = [input.code]

  if (input.warehouseId && input.warehouseId != "") {
    stmt =     `
      select *
      from base_locations
      where code = $1
        AND get_root_location_id(id) = $2;
    `
    params.push(input.warehouseId)
  }



  const rows = await server.queryDatabaseObject(stmt,params);

  const model = server.getModel({ singularCode: "base_location" });

  return rows.map((item) => mapDbRowToEntity(server, model!, item, false));
}

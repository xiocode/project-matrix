import {ActionHandlerContext, IRpdServer, mapDbRowToEntity, ServerOperation} from "@ruiapp/rapid-core";

export type QueryLocationInput = {
  warehouseId: number;
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

  const rows = await server.queryDatabaseObject(
    `
      select *
      from base_locations
      where code = $1
        AND get_root_location_id(id) = $2;
    `,
    [input.code, input.warehouseId],
  );

  const model = server.getModel({ singularCode: "base_location" });

  return rows.map((item) => mapDbRowToEntity(server, model!, item, false));
}

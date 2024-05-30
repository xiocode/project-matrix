import type {ActionHandlerContext, IRpdServer, ServerOperation} from "@ruiapp/rapid-core";
import type {BaseMaterial,} from "~/_definitions/meta/entity-types";

export type QueryGoodTransferInput = {
  operationId: number;
};

export type QueryGoodTransferOutput = {
  operationId: number;
  material: Partial<BaseMaterial>;
  lotNum: string;
  shelveAmount: number;
  waitingAmount: number;
  waitingPalletAmount: number;
  completedAmount: number;
  completedPalletAmount: number;
  shelves: {
    binNum: string;
    quantity: number;
    toLocationId: number;
  }[];
};


export default {
  code: "listGoodTransfers",
  method: "POST",
  async handler(ctx: ActionHandlerContext) {
    const {server} = ctx;
    const input: QueryGoodTransferInput = ctx.input;

    const transferOutputs = await listGoodTransfers(server, input);

    ctx.output = transferOutputs;
  },
} satisfies ServerOperation;

async function listGoodTransfers(server: IRpdServer, input: QueryGoodTransferInput) {

  const transfers = await server.queryDatabaseObject(
    `
with result AS (select operation_id,
                       material_id,
                       good_id,
                       lot_num,
                       count(*)                                                                 as shelve_amount,
                       coalesce(sum(quantity) filter ( where from_location_id is null ), 0)     as waiting_amount,
                       count(*) filter ( where from_location_id is null )                       as waiting_pallet_amount,
                       coalesce(sum(quantity) filter ( where from_location_id is not null ), 0) as completed_amount,
                       count(*) filter ( where from_location_id is not null )                   as completed_pallet_amount,
                       jsonb_agg(jsonb_build_object('bin_num', bin_num, 'quantity', quantity, 'to_location_id',
                                                    to_location_id))                               shelves
                from mom_good_transfers mdt
                where lot_num notnull
                  and lot_num <> ''
                  and bin_num notnull
                  and bin_num <> ''
                  and operation_id = $1
                group by operation_id, material_id, good_id, lot_num)
select r.*,
       jsonb_build_object('id', bm.id, 'code', bm.code, 'name', bm.name, 'specification', bm.specification,
                          'defaultUnit', to_jsonb(bu.*)) AS material
from result r
         inner join base_materials bm on r.material_id = bm.id
         inner join base_units bu on bm.default_unit_id = bu.id;`,
    [input.operationId],
  );

  const transferOutputs = transfers.map((item) => {
    return {
      operationId: item.operation_id,
      material: item.material,
      lotNum: item.lot_num,
      shelveAmount: item.shelve_amount,
      completedAmount: item.completed_amount,
      completedPalletAmount: item.completed_pallet_amount,
      waitingAmount: item.waiting_amount,
      waitingPalletAmount: item.waiting_pallet_amount,
      shelves: item.shelves,
    } as QueryGoodTransferOutput;
  });

  return transferOutputs;
}

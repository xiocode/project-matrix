import type {ActionHandlerContext, IRpdServer, ServerOperation} from "@ruiapp/rapid-core";
import type {BaseMaterial,} from "~/_definitions/meta/entity-types";
import type {InspectionResult} from "~/_definitions/meta/data-dictionary-types";

export type QueryGoodOutTransferInput = {
  operationId: number;
};

export type QueryGoodOutTransferOutput = {
  operationId: number;
  material: Partial<BaseMaterial>;
  lotNum: string;
  waitingAmount?: number;
  completedAmount?: number;
  goods: {
    id: number;
    binNum: string;
    quantity: number;
    location: {
      id: number;
      code: string;
      name: string;
    }
  }[];
};


export default {
  code: "listGoodOutTransfers",
  method: "POST",
  async handler(ctx: ActionHandlerContext) {
    const {server} = ctx;
    const input: QueryGoodOutTransferInput = ctx.input;

    const transferOutputs = await listGoodOutTransfers(server, input);

    ctx.output = transferOutputs;
  },
} satisfies ServerOperation;

async function listGoodOutTransfers(server: IRpdServer, input: QueryGoodOutTransferInput) {

  const transfers = await server.queryDatabaseObject(
    `
      WITH inventory_good_transfers_cte AS (SELECT operation_id,
                                                   material_id,
                                                   lot_num,
                                                   SUM(quantity) AS completed_amount
                                            FROM mom_good_transfers
                                            WHERE operation_id = $1
                                            GROUP BY operation_id,
                                                     material_id,
                                                     lot_num),
           inventory_operation_cte AS (SELECT mio.id                    AS operation_id,
                                              miai.material_id,
                                              miai.lot_num,
                                              sum(coalesce(miai.quantity,
                                                           0))          AS total_amount,
                                              sum(mgt.completed_amount) AS completed_amount
                                       FROM mom_inventory_operations mio
                                              INNER JOIN mom_inventory_application_items miai
                                                         ON mio.application_id = miai.operation_id
                                              LEFT JOIN inventory_good_transfers_cte mgt ON mio.id = mgt.operation_id
                                         AND miai.material_id = mgt.material_id
                                         AND miai.lot_num = mgt.lot_num
                                       WHERE 1 = 1
                                         AND mio.id = $1
                                       GROUP BY mio.id,
                                                miai.material_id,
                                                miai.lot_num),
           inventory_operation_goods_cte AS (SELECT ioc.operation_id,
                                                    mg.*
                                             FROM mom_goods mg
                                                    INNER JOIN inventory_operation_cte ioc
                                                               ON mg.material_id = ioc.material_id
                                                                 AND mg.lot_num = ioc.lot_num
                                             ORDER BY mg.validity_date DESC
                                             LIMIT 10),
           inventory_operation_goods_agg_cte AS (SELECT iogc.operation_id,
                                                        iogc.material_id,
                                                        iogc.lot_num,
                                                        jsonb_agg(jsonb_build_object('id',
                                                                                     iogc.id,
                                                                                     'binNum',
                                                                                     iogc.bin_num,
                                                                                     'validityDate',
                                                                                     iogc.validity_date,
                                                                                     'location',
                                                                                     to_jsonb(bl.*))) AS goods
                                                 FROM inventory_operation_goods_cte iogc
                                                        INNER JOIN base_locations bl ON iogc.location_id = bl.id
                                                 GROUP BY iogc.operation_id,
                                                          iogc.material_id,
                                                          iogc.lot_num),
           result AS (SELECT ioc.*,
                             greatest(ioc.total_amount - ioc.completed_amount,
                                      0)                                       AS waiting_amount,
                             iogc.goods,
                             jsonb_build_object('id', bm.id,
                                                'code', bm.code,
                                                'name', bm.name,
                                                'specification', bm.specification,
                                                'qualityGuaranteePeriod', bm.quality_guarantee_period,
                                                'defaultUnit', to_jsonb(bu.*)) AS material
                      FROM inventory_operation_cte ioc
                             INNER JOIN base_materials bm ON ioc.material_id = bm.id
                             INNER JOIN base_units bu ON bm.default_unit_id = bu.id
                             LEFT JOIN inventory_operation_goods_agg_cte iogc ON ioc.operation_id = iogc.operation_id
                        AND ioc.material_id = iogc.material_id
                        AND ioc.lot_num = iogc.lot_num)
      SELECT r.*
      FROM result r;
    `,
    [input.operationId],
  );

  const transferOutputs = transfers.map((item) => {

    console.log(item.completed_amount, item.total_amount, item.waiting_amount)

    return {
      operationId: item.operation_id,
      material: item.material,
      lotNum: item.lot_num,
      completedAmount: item.completed_amount,
      waitingAmount: item.waiting_amount,
      goods: item.goods,
    } as QueryGoodOutTransferOutput;
  });


  return transferOutputs;
}

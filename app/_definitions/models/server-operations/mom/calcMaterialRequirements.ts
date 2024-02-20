import type { ActionHandlerContext, ServerOperation } from "@ruiapp/rapid-core";
import { filter, find, get, map } from "lodash";
import { performMRP} from "@linkfactory/algorithm-mrp"
import type { MRPInput, MRPOutput, MaterialBreakdown, MaterialInventory, MaterialItem} from "@linkfactory/algorithm-mrp"

export default {
  code: 'calcMaterialRequirements',

  method: "GET",

  async handler(ctx: ActionHandlerContext) {
    const { logger, server, input } = ctx;
    const orderId = parseInt(ctx.input.orderId, 10);

    logger.debug("input", input)

    const orderItems = await server.queryDatabaseObject(
      `select * from cbs_order_items where order_id = ANY($1::int[]);`,
      [[orderId]]
      );

    const units = await server.queryDatabaseObject(
      `select * from base_units;`,
      []
      );

    const materials = await server.queryDatabaseObject(
      `select * from base_materials;`,
      []
      );

    const breakdowns = await server.queryDatabaseObject(
      `select * from mom_material_breakdowns where material_id = ANY($1::int[])`,
      [materials.map(item => item.id)]
    );

    const breakdownParts = await server.queryDatabaseObject(
      `select * from mom_material_breakdown_parts where breakdown_id = ANY($1::int[])`,
      [breakdowns.map(item => item.id)]
    );

    const inventories = await server.queryDatabaseObject(
      `select * from mom_inventories;`,
      []
      );

    const mrpBreakdowns: MaterialBreakdown[] = [];
    materials.forEach((material) => {
      const breakdown = find(breakdowns, { material_id: material.id });
      if (!breakdown) {
        return;
      }

      const parts = filter(breakdownParts, { breakdown_id: breakdown.id });
      mrpBreakdowns.push({
        code: get(material, 'code'),
        quantity: breakdown.quantity,
        unit: get(find(units, {id: breakdown.unit_id}), 'name'),
        parts: parts.map(item => {
          return {
            code: get(find(materials, {id: item.sub_material_id}), 'code'),
            quantity: item.quantity,
            unit: get(find(units, {id: item.unit_id}), 'name'),
          }
        }),
      });
    })

    const mrpInput: MRPInput = {
      demands: map(orderItems, (item) => {
        return {
          code: get(find(materials, {id: item.subject_id}), 'code'),
          quantity: item.quantity,
          unit: get(find(units, {id: item.unit_id}), 'name'),
        } satisfies MaterialItem;
      }),
      breakdowns: mrpBreakdowns,
      inventories: map(inventories, (item) => {
        return {
          code: get(find(materials, {id: item.material_id}), 'code'),
          quantities: {
            available: item.allocable_quantity,
            instock: item.instock_quantity,
            allocated: item.allocated_quantity,
            reserved: item.reserved_quantity,
          },
          unit: get(find(units, {id: item.unit_id}), 'name'),
        } satisfies MaterialInventory;
      }),
      decisions: [],
    };
    const mrpOutput = performMRP(mrpInput);

    ctx.output = {
      input: mrpInput,
      output: mrpOutput,
    };
  }
} satisfies ServerOperation;
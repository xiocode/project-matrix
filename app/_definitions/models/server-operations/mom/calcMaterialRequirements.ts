import type { ActionHandlerContext, ServerOperation } from "@ruiapp/rapid-core";
import { filter, find, get, map } from "lodash";
import { performMRP} from "@linkfactory/algorithm-mrp"
import type { MRPInput, MaterialBreakdown, MaterialInventory, MaterialItem} from "@linkfactory/algorithm-mrp"

export default {
  code: 'calcMaterialRequirements',

  method: "POST",

  async handler(ctx: ActionHandlerContext) {
    const { logger, server, input } = ctx;
    const mrpId = parseInt(ctx.input.mrpId, 10);
    const decisions = ctx.input.decisions || [];

    logger.debug("input", input)

    const scheduleItems = await server.queryDatabaseObject(
      `select * from mom_master_production_schedules where mrp_id = ANY($1::int[]);`,
      [[mrpId]]
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
        // tags: "",
        quantity: breakdown.quantity,
        unit: get(find(units, {id: breakdown.unit_id}), 'name'),
        parts: parts.map(item => {
          return {
            code: get(find(materials, {id: item.sub_material_id}), 'code'),
            matchTags: item.match_tags,
            quantity: item.quantity,
            unit: get(find(units, {id: item.unit_id}), 'name'),
          }
        }),
      });
    })

    const mrpInput: MRPInput = {
      demands: map(scheduleItems, (item) => {
        return {
          code: get(find(materials, {id: item.material_id}), 'code'),
          // tags: item.tags,
          quantity: item.quantity,
          unit: get(find(units, {id: item.unit_id}), 'name'),
        } satisfies MaterialItem;
      }),
      breakdowns: mrpBreakdowns,
      inventories: map(inventories, (item) => {
        return {
          code: get(find(materials, {id: item.material_id}), 'code'),
          // tags: item.tags,
          quantities: {
            available: item.allocable_quantity,
            instock: item.instock_quantity,
            allocated: item.allocated_quantity,
            reserved: item.reserved_quantity,
          },
          unit: get(find(units, {id: item.unit_id}), 'name'),
        } satisfies MaterialInventory;
      }),
      decisions: decisions,
    };
    const mrpOutput = performMRP(mrpInput);

    ctx.output = {
      materials: map(materials, (item) => {
        return {
          code: item.code,
          name: item.name,
          specification: item.specification,
          canProduce: item.can_produce,
          canPurchase: item.can_purchase,
          canOutsource: item.can_outsource,
        }
      }),
      input: mrpInput,
      output: mrpOutput,
    };
  }
} satisfies ServerOperation;
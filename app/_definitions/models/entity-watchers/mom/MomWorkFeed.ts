import type {EntityWatcher, EntityWatchHandlerContext, IRpdServer} from "@ruiapp/rapid-core";
import type {BaseLot, SaveBaseLotInput} from "~/_definitions/meta/entity-types";

export default [
  {
    eventName: "entity.beforeCreate",
    modelSingularCode: "mom_work_feed",
    handler: async (ctx: EntityWatchHandlerContext<"entity.beforeCreate">) => {
      const { server, payload } = ctx;
      let before = payload.before;

      if (before.hasOwnProperty("lotNum") && !before.hasOwnProperty("lot")) {
        const lot = await saveMaterialLotInfo(server, {
          lotNum: before.lotNum,
          material: { id: before.rawMaterial.id || before.rawMaterial || before.raw_material_id },
          sourceType: "selfMade",
          qualificationState: "qualified",
          isAOD: false,
          state: "normal",
        });

        if (lot) {
          before.lot_id = lot.id;
        }
      }

      if (before.hasOwnProperty("lot") && !before.hasOwnProperty("lotNum")) {
        const lot = await server.getEntityManager("base_lot").findById(before.lot?.id || before.lot || before.lot_id);
        if (lot) {
          before.lotNum = lot.lotNum;
        }
      }
    }
  },
] satisfies EntityWatcher<any>[];


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

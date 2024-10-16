import type {EntityWatcher, EntityWatchHandlerContext, IRpdServer} from "@ruiapp/rapid-core";
import type {BaseLot, MomWorkTask, SaveBaseLotInput} from "~/_definitions/meta/entity-types";

export default [
  {
    eventName: "entity.beforeCreate",
    modelSingularCode: "mom_work_report",
    handler: async (ctx: EntityWatchHandlerContext<"entity.beforeCreate">) => {
      const { server, payload } = ctx;
      let before = payload.before;

      const workTask = await server.getEntityManager<MomWorkTask>("mom_work_task").findEntity({
        filters: [
          { operator: "eq", field: "process_id", value: before.process.id || before.process || before.process_id },
          {
            operator: "eq",
            field: "equipment_id",
            value: before.equipment.id || before.equipment || before.equipment_id
          },
          {
            operator: "eq",
            field: "work_order_id",
            value: before.workOrder.id || before.workOrder || before.work_order_id
          },
        ],
        properties: ["id", "material", "process", "equipment", "workOrder"],
        relations: {
          process: {
            properties: [
              "id", "config"
            ],
          },
        }
      });

      if (workTask && workTask.process) {
        if (workTask?.process?.config?.lotNumAutoGenerate) {
          const lot = await saveMaterialLotInfo(server, {
            material: { id: workTask?.material?.id },
            sourceType: "selfMade",
            qualificationState: "qualified",
            isAOD: false,
            state: "normal",
          });
          if (lot) {
            before.lot_id = lot.id;
            before.lotNum = lot.lotNum;
          }
        }
      }

      if (workTask) {
        before.work_task_id = workTask.id;
      }
    }
  },
  {
    eventName: "entity.create",
    modelSingularCode: "mom_work_report",
    handler: async (ctx: EntityWatchHandlerContext<"entity.create">) => {
      const { server, payload } = ctx;
      const after = payload.after;

      if (!after.work_order_id) {
        return;
      }

      const workOrderEntityManager = server.getEntityManager("mom_work_order");
      await workOrderEntityManager.updateEntityById({
        id: after.work_order_id,
        entityToSave: {
          executionState: 'processing',
        },
      });
    }
  },
] satisfies EntityWatcher<any>[];


async function saveMaterialLotInfo(server: IRpdServer, lot: SaveBaseLotInput) {
  if (!lot.material || !lot.material.id) {
    throw new Error("material are required when saving lot info.");
  }

  const baseLotManager = server.getEntityManager<BaseLot>("base_lot");
  return await baseLotManager.createEntity({ entity: lot })
}

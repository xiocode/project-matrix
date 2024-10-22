import type {EntityWatcher, EntityWatchHandlerContext, IRpdServer} from "@ruiapp/rapid-core";
import type {BaseLot, MomWorkTask, SaveBaseLotInput} from "~/_definitions/meta/entity-types";
import dayjs from "dayjs";
import rapidApi from "~/rapidApi";
import {replaceTemplatePlaceholder} from "~/app-extension/rocks/print-trigger/PrintTrigger";

export default [
  {
    eventName: "entity.beforeCreate",
    modelSingularCode: "mom_work_report",
    handler: async (ctx: EntityWatchHandlerContext<"entity.beforeCreate">) => {
      const { server, payload } = ctx;
      let before = payload.before;

      if (!before.hasOwnProperty("actualStartTime")) {
        before.actualStartTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
      }
      if (!before.hasOwnProperty("actualFinishTime")) {
        before.executionState = "processing";
      }
      if (before.hasOwnProperty("actualFinishTime")) {
        before.executionState = "completed";
      }


      if (before.hasOwnProperty("workOrder")) {
        const workTask = await server.getEntityManager<MomWorkTask>("mom_work_task").findEntity({
          filters: [
            { operator: "eq", field: "process_id", value: before?.process?.id || before?.process || before.process_id },
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
            {
              operator: "eq",
              field: "executionState",
              value: "processing"
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
          if (workTask?.process?.config?.reportLotNumAutoGenerate) {
            const lot = await saveMaterialLotInfo(server, {
              material: { id: workTask?.material?.id },
              sourceType: "selfMade",
              qualificationState: "qualified",
              isAOD: false,
              state: "normal",
            });
            if (lot) {
              before.lot = { id: lot.id };
              before.lotNum = lot.lotNum;
            }
          }
        }

        if (workTask) {
          before.work_task_id = workTask.id;
        }
      }

      if (before.hasOwnProperty("lotNum") && !before.hasOwnProperty("lot")) {
        const lot = await server.getEntityManager("base_lot").findEntity({
          filters: [
            { operator: "eq", field: "lot_num", value: before.lotNum },
          ],
          properties: ["id", "material", "lotNum"],
        });
        if (lot) {
          before.lot = lot;
        }
      }
    }
  },
  {
    eventName: "entity.beforeUpdate",
    modelSingularCode: "mom_work_report",
    handler: async (ctx: EntityWatchHandlerContext<"entity.beforeUpdate">) => {
      const { server, payload } = ctx;
      let changes = payload.changes;

      if (changes.hasOwnProperty("actualFinishTime")) {
        changes.executionState = 'completed';
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

      //   TODO: 注塑工序自动打印
      // await rapidApi.post(`/svc/printer/printers/1/tasks`, {
      //   tasks: (dataSource || []).map((record) => {
      //     return {
      //       type: "zpl-label",
      //       name: "标签打印",
      //       data: replaceTemplatePlaceholder(formData.content, record),
      //     };
      //   }),
      // });

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

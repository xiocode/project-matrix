import type {EntityWatcher, EntityWatchHandlerContext, IRpdServer} from "@ruiapp/rapid-core";
import type {
  BaseLot, MomProcess,
  MomWorkFeed,
  MomWorkOrder,
  MomWorkTask,
  SaveBaseLotInput,
  SaveMomWorkTaskInput
} from "~/_definitions/meta/entity-types";
import dayjs from "dayjs";

export default [
  {
    eventName: "entity.beforeCreate",
    modelSingularCode: "mom_work_order",
    handler: async (ctx: EntityWatchHandlerContext<"entity.beforeCreate">) => {
      const { server, payload } = ctx;
      const { before } = payload;

      // 判断当前是否有正在运行中的工单，报错提示已经有正在运行中的工单
      const workOrderManager = server.getEntityManager<MomWorkOrder>("mom_work_order");
      const workOrder = await workOrderManager.findEntity({
        filters: [
          {
            operator: "exists",
            field: "processes",
            filters: [{ operator: "in", field: "id", value: before.processes }]
          },
          { operator: "eq", field: "executionState", "value": "processing" },
        ],
        properties: ["id"]
      });

      if (workOrder) {
        throw new Error("当前设备已有正在运行中的工单,请完成后再创建工单。");
      }

      try {
        const processes = await server.getEntityManager<MomProcess>("mom_process").findEntities({
          filters: [
            { operator: "in", field: "id", value: before.processes },
          ],
          properties: ["id", "factory", "config"]
        });

        if (processes && processes.length > 0) {
          if (processes[0] && processes[0].factory) {
            before.factory_id = processes[0].factory?.id
          }
        }

        for (const process of processes) {
          if (process?.config?.reportLotNumAutoGenerate) {
            const lot = await saveMaterialLotInfo(server, {
              material: { id: before?.material?.id || before?.material },
              sourceType: "selfMade",
              qualificationState: "qualified",
              isAOD: false,
              state: "normal",
            });
            if (lot) {
              before.lot_id = lot.id;
              before.lotNum = lot.lotNum;
            }
            break;
          }
        }

      } catch (error) {
        console.error(error);
      }

      if ((before.hasOwnProperty("equipment") || before.hasOwnProperty("equipment_id")) && (before.hasOwnProperty("processes"))) {
        await server.getEntityManager<MomWorkTask>("mom_work_task").createEntity(
          {
            entity: {
              processes: before.processes,
              equipment: { id: before.equipment.id || before.equipment || before.equipment_id },
            } as SaveMomWorkTaskInput,
          }
        )
      }

      if (before.hasOwnProperty("equipment")) {
        delete before.equipment;
      }
      if (before.hasOwnProperty("equipment_id")) {
        delete before.equipment_id;
      }

      before.actualStartDate = dayjs().format("YYYY-MM-DD");
    },
  },
  {
    eventName: "entity.create",
    modelSingularCode: "mom_work_order",
    handler: async (ctx: EntityWatchHandlerContext<"entity.create">) => {
      const { server, payload } = ctx;
      const { after } = payload;


      try {

        const workTasks = await server.getEntityManager<MomWorkTask>("mom_work_task").findEntities({
          filters: [
            { operator: "eq", field: "process_id", value: after.process.id || after.process || after.process_id },
            { operator: "null", field: "workOrder" },
          ],
        });

        if (workTasks) {
          for (const workTask of workTasks) {
            await server.getEntityManager<MomWorkTask>("mom_work_task").updateEntityById(
              {
                id: workTask.id,
                entityToSave: {
                  workOrder: { id: after.id },
                }
              }
            )
          }
        }

        //   TODO: 处理投料信息
        const workFeedManager = server.getEntityManager<MomWorkFeed>("mom_work_feed");
        const workFeeds = await workFeedManager.findEntities({
          filters: [
            { operator: "eq", field: "process_id", value: after.process.id || after.process || after.process_id },
            // {
            //   operator: "eq",
            //   field: "equipment_id",
            //   value: after.equipment.id || after.equipment || after.equipment_id
            // },
            { operator: "null", field: "workOrder" },
          ],
        });
        if (workFeeds) {
          for (const workFeed of workFeeds) {
            await workFeedManager.updateEntityById(
              {
                id: workFeed.id,
                entityToSave: {
                  workOrder: { id: after.id },
                }
              }
            )
          }
        }

      } catch (error) {
        console.error(error);
      }
    },
  },
] satisfies EntityWatcher<any>[];

async function saveMaterialLotInfo(server: IRpdServer, lot: SaveBaseLotInput) {
  if (!lot.material || !lot.material.id) {
    throw new Error("material are required when saving lot info.");
  }

  const baseLotManager = server.getEntityManager<BaseLot>("base_lot");
  return await baseLotManager.createEntity({ entity: lot })
}

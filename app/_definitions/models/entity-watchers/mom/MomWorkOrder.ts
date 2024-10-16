import type {EntityWatcher, EntityWatchHandlerContext} from "@ruiapp/rapid-core";
import type {MomWorkFeed, MomWorkOrder, MomWorkTask, SaveMomWorkTaskInput} from "~/_definitions/meta/entity-types";
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
          { operator: "eq", field: "process_id", value: before.process.id || before.process || before.process_id },
          { operator: "eq", field: "executionState", "value": "processing" },
        ],
        properties: ["id"]
      });

      if (workOrder) {
        throw new Error("当前设备已有正在运行中的工单,请完成后再创建工单。");
      }

      try {
        const process = await server.getEntityManager("mom_process").findEntity({
          filters: [
            { operator: "eq", field: "id", value: before.process.id || before.process_id },
          ],
          properties: ["id", "factory"]
        });

        if (process && process.factory) {
          before.factory_id = process.factory?.id
        }
      } catch (error) {
        console.error(error);
      }

      if ((before.hasOwnProperty("equipment") || before.hasOwnProperty("equipment_id")) && (before.hasOwnProperty("process") || before.hasOwnProperty("process_id"))) {
        await server.getEntityManager<MomWorkTask>("mom_work_task").createEntity(
          {
            entity: {
              process: { id: before.process.id || before.process || before.process_id },
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

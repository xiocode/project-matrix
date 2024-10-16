import type {EntityWatcher, EntityWatchHandlerContext} from "@ruiapp/rapid-core";
import type {MomWorkOrder, MomWorkTask, SaveMomWorkOrderInput} from "~/_definitions/meta/entity-types";
import dayjs from "dayjs";
import IotHelper from "~/sdk/iot/helper";

export default [
  {
    eventName: "entity.beforeCreate",
    modelSingularCode: "mom_work_task",
    handler: async (ctx: EntityWatchHandlerContext<"entity.beforeCreate">) => {
      const { server, payload } = ctx;
      let before = payload.before;

      if (!before.hasOwnProperty("workOrder") && !before.hasOwnProperty("work_order_id")) {
        const workOrderManager = server.getEntityManager<MomWorkOrder>("mom_work_order");
        const workOrder = await workOrderManager.findEntity({
          filters: [
            { operator: "eq", field: "process_id", value: before.process.id || before.process || before.process_id },
            { operator: "eq", field: "executionState", value: 'processing' },
          ],
        });
        if (workOrder) {
          before.work_order_id = workOrder.id;
        } else {
          const workOrder = await workOrderManager.createEntity({
            entity: {
              process: { id: before.process.id || before.process || before.process_id },
              material: { id: before.material.id || before.material || before.material_id },
              executionState: 'processing',
            } as SaveMomWorkOrderInput,
          });
          if (workOrder) {
            before.work_order_id = workOrder.id;
          }
        }
      }
    }
  },
  {
    eventName: "entity.create",
    modelSingularCode: "mom_work_task",
    handler: async (ctx: EntityWatchHandlerContext<"entity.create">) => {
      const { server, payload } = ctx;
      let after = payload.after;

      // TODO: 上报设备当前任务
      // let deviceTaskPayload = {
      //   workOrder: after.code,
      //   equipment: after.equipment.code,
      //   process: after.process.code,
      //   material: after.material.code,
      // };
      //
      // const iotSDK = await new IotHelper(server).NewAPIClient();
      // await iotSDK.PostResourceRequest("http://127.0.0.1:8080/api/v1/device/task", deviceTaskPayload);


    }
  },
  {
    eventName: "entity.update",
    modelSingularCode: "mom_work_task",
    handler: async (ctx: EntityWatchHandlerContext<"entity.update">) => {
      const { server, payload } = ctx;
      let { before, changes } = payload;


      if (changes.hasOwnProperty("executionState") && changes.executionState === "completed") {
        // TODO: 处理如果当前工单多个工序，只处理最后一个工序

        const workTask = await server.getEntityManager<MomWorkTask>("mom_work_task").findEntity({
          filters: [
            { operator: "eq", field: "id", value: before.id },
          ],
          properties: ["id", "workOrder"],
        })

        if (workTask && workTask.workOrder) {
          const workOrderManager = server.getEntityManager<MomWorkOrder>("mom_work_order");
          await workOrderManager.updateEntityById({
            id: workTask.workOrder.id,
            entityToSave: {
              executionState: 'completed',
              actualFinishDate: dayjs().format("YYYY-MM-DD"),
            }
          })
        }

        // TODO: 上报设备当前任务
        // let deviceTaskPayload = {
        //   workOrder: after.code,
        //   equipment: after.equipment.code,
        //   process: after.process.code,
        //   material: after.material.code,
        // };
        //
        // const iotSDK = await new IotHelper(server).NewAPIClient();
        // await iotSDK.PostResourceRequest("http://127.0.0.1:8080/api/v1/device/task", deviceTaskPayload);
      }
    }
  },
] satisfies EntityWatcher<any>[];

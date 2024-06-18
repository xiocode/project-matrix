import type { IRpdServer } from "@ruiapp/rapid-core";
import type { CreateProcessInstanceInput, FlowConfig, StartProcessInstanceInput } from "./BpmPluginTypes";
import { BpmTask, type BpmActivity, type BpmInstance, type BpmProcess, type SaveBpmActivityInput, type SaveBpmTaskInput } from "~/_definitions/meta/entity-types";
import { getNowStringWithTimezone } from "~/utils/time-utils";
import { filter, first, map } from "lodash";

export default class BpmService {
  #server: IRpdServer;

  constructor(server: IRpdServer) {
    this.#server = server;
  }

  async createProcessInstance(input: CreateProcessInstanceInput) {
    const instanceManager = this.#server.getEntityManager<BpmInstance>("bpm_instance");
    const processInstance = await instanceManager.createEntity({
      entity: {
        title: input.title,
        process: input.process,
        initiator: input.initiator,
        formData: input.formData,
        variables: input.variables,
        initiatedAt: getNowStringWithTimezone(),
        state: "processing",
      }
    });

    await this.#startProcessInstance({
      instanceId: processInstance.id,
      processId: processInstance.process.id!,
    });

    return processInstance;
  }

  async #startProcessInstance(input: StartProcessInstanceInput) {
    const processManager = this.#server.getEntityManager<BpmProcess>("bpm_process");
    const process = await processManager.findById(input.processId);
    const flowConfig: FlowConfig = process?.flowConfig || {};

    const flowNodes = flowConfig.nodes || [];
    const activityNode = first(flowNodes);
    if (!activityNode) {
      return;
    }

    const activityManager = this.#server.getEntityManager<BpmActivity>("bpm_activity");

    if (activityNode.nodeType === "activity") {
      if (activityNode.activityType === "approval") {
        const { activityConfig } = activityNode;
        if (activityConfig.approvalType === "manual") {
          let tasks: Partial<SaveBpmTaskInput>[] = [];
          if (activityConfig.approverType === "specifiedUser") {
            const userIds = activityConfig.approverRange.users;
            tasks = map(userIds, (userId) => {
              return {
                state: "pending",
                assignee: { id: userId },
              } satisfies Partial<SaveBpmTaskInput>;
            });
          }

          await activityManager.createEntity({
            entity: {
              instance: { id: input.instanceId },
              kind: "approval",
              name: activityNode.nodeTitle || activityNode.activityType || activityNode.nodeType,
              state: "pending",
              startedAt: getNowStringWithTimezone(),
              tasks,
            } satisfies SaveBpmActivityInput,
          });
        }
      }
    }
  }

  async checkActivityState(activityId: number) {
    const taskManager = this.#server.getEntityManager<BpmTask>("bpm_task");
    const tasks = await taskManager.findEntities({
      filters: [
        {
          operator: "eq",
          field: "activity_id",
          value: activityId,
        },
      ],
    });

    // TODO: decide resolution.
    const activityResolution = "approved";

    const pendingTasks = filter(tasks, (task: BpmTask) => task.state === "pending");
    if (pendingTasks.length === 0) {
      const activityManager = this.#server.getEntityManager<BpmActivity>("bpm_activity");
      activityManager.updateEntityById({
        id: activityId,
        entityToSave: {
          state: "finished",
          completedAt: getNowStringWithTimezone(),
          resolution: activityResolution,
        } satisfies Partial<BpmActivity>
      });
    }
  }
}

import { PropertyStateMachineConfig } from "@ruiapp/rapid-core";
import type { TDictionaryCodes } from "../../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "app",
  code: "BpmManualTask",
  name: "流程人工任务",
  description: "管理流程人工任务。如果一个流程节点需要多人审批，则每个人都会对应一个人工审批任务。",
  fields: [
    {
      code: "job",
      name: "流程任务",
      type: "relation",
      required: true,
      targetSingularCode: "bpm_job",
      targetIdColumnName: "job_id",
    },
    {
      code: "assignee",
      name: "负责人",
      type: "relation",
      required: true,
      targetSingularCode: "oc_user",
      targetIdColumnName: "assignee_id",
    },
    {
      code: "state",
      name: "状态",
      type: "option",
      dataDictionary: "BusinessTaskState",
      required: true,
      config: {
        stateMachine: {
          enabled: true,
          config: {
            initial: "pending",
            states: {
              pending: {
                on: {
                  approve: "finished",
                  reject: "finished",
                },
              },
              finished: {
                on: {
                  reopen: "pending",
                },
              },
              canceled: {
                on: {
                  reopen: "pending",
                },
              },
            }
          }
        } satisfies PropertyStateMachineConfig,
      }
    },
    {
      code: "resolution",
      name: "结果",
      type: "text",
      required: false,
    },
    {
      code: "comment",
      name: "审批意见",
      type: "text",
    },
  ],
};

export default entity;

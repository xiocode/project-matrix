import type { TDictionaryCodes } from "../../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "app",
  code: "BpmJob",
  name: "流程任务",
  description: "管理流程任务。如果是审批或者表单任务，则可能会关联多个任务。",
  fields: [
    {
      code: "instance",
      name: "流程实例",
      type: "relation",
      required: true,
      targetSingularCode: "bpm_instance",
      targetIdColumnName: "instance_id",
    },
    {
      code: "name",
      name: "名称",
      type: "text",
      required: true,
    },
    {
      code: "kind",
      name: "类型",
      type: "option",
      dataDictionary: "BusinessActivityKind",
    },
    {
      code: "flowNodeId",
      name: "流程节点id",
      type: "text",
    },
    {
      code: "activityType",
      name: "活动类型",
      type: "text",
    },
    {
      code: "tasks",
      name: "任务",
      type: "relation[]",
      targetSingularCode: "bpm_manual_task",
      selfIdColumnName: "job_id",
    },
    {
      code: "state",
      name: "状态",
      type: "option",
      dataDictionary: "BusinessActivityState",
      required: true,
    },
    {
      code: "resolution",
      name: "结果",
      type: "text",
      required: false,
    },
    {
      code: "startedAt",
      name: "开始时间",
      type: "datetime",
    },
    {
      code: "completedAt",
      name: "完成时间",
      type: "datetime",
    },
  ],
};

export default entity;

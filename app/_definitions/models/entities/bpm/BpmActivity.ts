import type { TDictionaryCodes } from "../../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "app",
  code: "BpmActivity",
  name: "流程活动",
  description: "管理流程活动。如果是审批或者表单活动，则可能会关联多个任务。",
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
      required: true,
    },
    {
      code: "flowNodeId",
      name: "流程节点id",
      type: "text",
    },
    {
      code: "tasks",
      name: "任务",
      type: "relation[]",
      targetSingularCode: "bpm_task",
      selfIdColumnName: "activity_id",
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

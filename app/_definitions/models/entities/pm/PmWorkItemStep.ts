import type { TDictionaryCodes } from "../../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "app",
  code: "PmWorkItemStep",
  name: "工作项步骤记录",
  description: "用于记录某工作项各步骤处理的过程，包括责任人、开始时间、完成时间等信息。每当工作项的当前步骤（currentStep）发生变化，步骤记录增加一条。",
  fields: [
    {
      code: "workItem",
      name: "工作项",
      type: "relation",
      targetSingularCode: "pm_work_item",
      targetIdColumnName: "work_item_id",
    },
    {
      code: "workItemTypeStep",
      name: "步骤",
      type: "relation",
      targetSingularCode: "pm_work_item_type_step",
      targetIdColumnName: "work_item_type_step_id",
    },
    {
      code: "assignee",
      name: "责任人",
      type: "relation",
      targetSingularCode: "oc_user",
      targetIdColumnName: "assignee_id",
    },
    {
      code: "assigner",
      name: "分配人",
      type: "relation",
      targetSingularCode: "oc_user",
      targetIdColumnName: "assigner_id",
    },
    {
      code: "scheduledStartTime",
      name: "计划开始时间",
      type: "datetime",
    },
    {
      code: "scheduledCompleteTime",
      name: "计划完成时间",
      type: "datetime",
    },
    {
      code: "actualStartTime",
      name: "实际开始时间",
      type: "datetime",
    },
    {
      code: "actualCompleteTime",
      name: "实际完成时间",
      type: "datetime",
    },
    {
      code: "state",
      name: "状态",
      type: "option",
      dataDictionary: "PmWorkItemStepState",
      required: true,
      defaultValue: "'pending'",
    },
  ],
};

export default entity;

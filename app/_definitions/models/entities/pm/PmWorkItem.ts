import type { PropertySequenceConfig } from "@ruiapp/rapid-core";
import type { TDictionaryCodes } from "../../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "app",
  code: "PmWorkItem",
  name: "工作项",
  description: "工作项是指可能需要分解成多个步骤，需要多个人协作完成的事项。例如：一个产品功能的开发、质量问题的处理、在线问题的修复、系统新版本发布等。",
  fields: [
    {
      code: "workItemType",
      name: "工作项类型",
      type: "relation",
      targetSingularCode: "pm_work_item_type",
      targetIdColumnName: "work_item_type_id",
    },
    {
      code: "project",
      name: "项目",
      type: "relation",
      targetSingularCode: "pm_project",
      targetIdColumnName: "project_id",
      required: false,
    },
    {
      code: "milestone",
      name: "里程碑",
      type: "relation",
      targetSingularCode: "pm_milestone",
      targetIdColumnName: "milestone_id",
      required: false,
    },
    {
      code: "code",
      name: "编号",
      type: "text",
      required: true,
      config: {
        sequence: {
          enabled: true,
          config: {
            segments: [
              {
                type: "parameter",
                parameterName: "project.workItemCodePrefix",
              },
              {
                type: "literal",
                content: "-"
              },
              {
                type: "autoIncrement",
                scope: "project.workItemCodePrefix",
                period: "forever",
                length: 4,
              },
            ],
          },
        } satisfies PropertySequenceConfig,
      },
    },
    {
      code: "title",
      name: "标题",
      type: "text",
      required: true,
    },
    {
      code: "description",
      name: "描述",
      type: "text",
    },
    {
      code: "parent",
      name: "父工作项",
      type: "relation",
      targetSingularCode: "pm_work_item",
      targetIdColumnName: "parent_id",
    },
    {
      code: "subItems",
      name: "子工作项",
      type: "relation",
      targetSingularCode: "pm_work_item",
      selfIdColumnName: "parent_id",
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
      code: "currentStep",
      name: "当前步骤",
      type: "relation",
      targetSingularCode: "pm_work_item_type_step",
      targetIdColumnName: "current_step_id",
    },
    {
      code: "currentStepAssignee",
      name: "当前步骤责任人",
      type: "relation",
      targetSingularCode: "oc_user",
      targetIdColumnName: "current_step_assignee_id",
    },
    {
      code: "steps",
      name: "步骤",
      type: "relation[]",
      targetSingularCode: "pm_work_item_step",
      selfIdColumnName: "work_item_id",
    },
    {
      code: "estimate",
      name: "预计工作量",
      description: "例如：30m，8H，10D",
      type: "text",
    },
    {
      code: "progress",
      name: "进度",
      description: "进度百分比",
      type: "double",
      required: true,
      defaultValue: "0",
    },
    {
      code: "progressCoefficient",
      name: "进度权重",
      description: "如果一个工作项存在若干个子工作项，则可对各个子工作项分别设置进度权重，用于根据子工作项的进度自动计算上级工作项的进度。",
      type: "double",
      required: true,
      defaultValue: "1",
    },
    {
      code: "state",
      name: "状态",
      type: "option",
      dataDictionary: "PmWorkItemState",
      required: true,
      defaultValue: "'pending'",
    },
    {
      code: "resolution",
      name: "关闭决定",
      type: "relation",
      targetSingularCode: "oc_user",
      targetIdColumnName: "assigner_id",
    },
  ],
};

export default entity;

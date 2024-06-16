import type { PropertySequenceConfig } from "@ruiapp/rapid-core";
import type { TDictionaryCodes } from "../../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "app",
  code: "BpmInstance",
  name: "流程实例",
  description: "管理业务流程实例。例如：请假审批。项目立项流程。",
  fields: [
    {
      code: "process",
      name: "业务流程",
      type: "relation",
      required: true,
      targetSingularCode: "bpm_process",
      targetIdColumnName: "process_id",
    },
    {
      code: "code",
      name: "流程实例号",
      type: "text",
      required: true,
      config: {
        sequence: {
          enabled: true,
          config: {
            segments: [
              {
                type: "literal",
                content: "FLOW-"
              },
              {
                type: "year",
                length: 4,
              },
              {
                type: "autoIncrement",
                scope: "",
                period: "year",
                length: 5,
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
      code: "formData",
      name: "表单数据",
      type: "json",
    },
    {
      code: "variables",
      name: "流程变量",
      type: "json",
    },
    {
      code: "initiator",
      name: "发起人",
      type: "relation",
      targetSingularCode: "oc_user",
      targetIdColumnName: "initiator_id",
    },
    {
      code: "initiatedAt",
      name: "发起时间",
      type: "datetime",
    },
    {
      code: "cancelledAt",
      name: "撤销时间",
      type: "datetime",
    },
    {
      code: "completedAt",
      name: "完成时间",
      type: "datetime",
    },
    {
      code: "state",
      name: "流程状态",
      type: "option",
      dataDictionary: "BusinessInstanceState",
      required: true,
    },
    {
      code: "activities",
      name: "活动",
      type: "relation[]",
      targetSingularCode: "bpm_activity",
      selfIdColumnName: "instance_id",
    },
    {
      code: "currentActivity",
      name: "当前步骤",
      type: "relation",
      targetSingularCode: "bpm_activity",
      targetIdColumnName: "current_activity_id",
    },
  ],
};

export default entity;

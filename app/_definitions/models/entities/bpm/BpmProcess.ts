import { PropertySequenceConfig } from "@ruiapp/rapid-core";
import type { TDictionaryCodes } from "../../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "app",
  code: "BpmProcess",
  name: "流程定义",
  description: "管理业务流程配置信息，包括流程表单、审批配置、列表配置等。",
  fields: [
    {
      code: "category",
      name: "分组",
      type: "relation",
      targetSingularCode: "bpm_process_category",
      targetIdColumnName: "category_id",
    },
    {
      code: "type",
      name: "类型",
      description: "用于对流程进行分类，开发人员可根据类型信息进行流程启动前后、流程完成前后的扩展开发。",
      type: "text",
    },
    {
      code: "code",
      name: "编码",
      type: "text",
      required: true,
      config: {
        sequence: {
          enabled: true,
          config: {
            segments: [
              {
                type: "literal",
                content: "PROCESS-",
              },
              {
                type: "autoIncrement",
                scope: "",
                period: "forever",
              },
            ],
          },
        } satisfies PropertySequenceConfig,
      },
    },
    {
      code: "name",
      name: "名称",
      type: "text",
      required: true,
    },
    {
      code: "description",
      name: "描述",
      type: "text",
    },
    {
      code: "typeConfig",
      name: "类型设置",
      type: "json",
      required: false,
    },
    {
      code: "formConfig",
      name: "表单配置",
      type: "json",
      required: false,
    },
    {
      code: "flowConfig",
      name: "流程配置",
      type: "json",
      required: false,
    },
    {
      code: "listConfig",
      name: "列表配置",
      type: "json",
      required: false,
    },
    {
      code: "advancedConfig",
      name: "高级设置",
      type: "json",
      required: false,
    },
    {
      code: "state",
      name: "状态",
      type: "option",
      dataDictionary: "BusinessProcessState",
      required: true,
    },
    {
      code: "activeRevision",
      name: "当前版本",
      type: "relation",
      targetSingularCode: "bpm_process_revision",
      targetIdColumnName: "active_revision_id",
    },
  ],
};

export default entity;

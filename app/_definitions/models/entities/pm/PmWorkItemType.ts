import type { TDictionaryCodes } from "../../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "app",
  code: "PmWorkItemType",
  name: "工作项类型",
  fields: [
    {
      code: "code",
      name: "编码",
      type: "text",
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
      code: "orderNum",
      name: "排序",
      type: "integer",
      required: true,
      defaultValue: "0",
    },
    {
      code: "config",
      name: "配置",
      type: "json",
    },
    {
      code: "state",
      name: "状态",
      required: true,
      type: "option",
      dataDictionary: "EnabledDisabledState",
      defaultValue: "'enabled'",
    },
    {
      code: "projects",
      name: "项目",
      type: "relation[]",
      targetSingularCode: "pm_project",
      linkTableName: "pm_project_work_item_types",
      targetIdColumnName: "project_id",
      selfIdColumnName: "work_item_type_id",
    },
  ],
};

export default entity;

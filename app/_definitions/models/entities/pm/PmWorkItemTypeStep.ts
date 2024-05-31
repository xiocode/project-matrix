import type { TDictionaryCodes } from "../../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "app",
  code: "PmWorkItemTypeStep",
  name: "工作项类型步骤",
  fields: [
    {
      code: "workItemType",
      name: "工作项类型",
      type: "relation",
      targetSingularCode: "pm_work_item_type",
      targetIdColumnName: "work_item_type_id",
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
  ],
};

export default entity;

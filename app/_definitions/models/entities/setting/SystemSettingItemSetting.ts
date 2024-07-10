import type { TDictionaryCodes } from "../../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  metaOnly: true,
  namespace: "svc",
  code: "SystemSettingItemSetting",
  name: "系统设置项设置",
  fields: [
    {
      code: "group",
      name: "设置项分组",
      type: "relation",
      targetSingularCode: "system_setting_group_setting",
      targetIdColumnName: "group_id",
    },
    {
      code: "orderNum",
      name: "排序号",
      type: "integer",
      required: true,
    },
    {
      code: "type",
      name: "类型",
      type: "option",
      dataDictionary: "SettingItemType",
      required: true,
    },
    {
      code: "code",
      name: "编码",
      type: "text",
      required: true,
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
      code: "config",
      name: "其它设置",
      type: "json",
    },
  ],
};

export default entity;

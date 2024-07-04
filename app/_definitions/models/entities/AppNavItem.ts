import type { TDictionaryCodes } from "../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "app",
  code: "AppNavItem",
  name: "导航菜单",
  fields: [
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
      code: "client",
      name: "客户端",
      type: "relation",
      required: false,
      targetSingularCode: "app_client",
      targetIdColumnName: "client_id",
    },
    {
      code: "parent",
      name: "上级菜单",
      type: "relation",
      required: false,
      targetSingularCode: "app_nav_item",
      targetIdColumnName: "parent_id",
    },
    {
      code: "orderNum",
      name: "排序号",
      type: "integer",
      required: true,
    },
    {
      code: "icon",
      name: "图标",
      type: "text",
      required: false,
    },
    {
      code: "pageCode",
      name: "页面代码",
      type: "text",
      required: false,
    },
    {
      code: "config",
      name: "配置",
      type: "json",
      required: false,
    },
    {
      code: "state",
      name: "状态",
      type: "option",
      dataDictionary: "EnabledDisabledState",
      required: true,
    },
  ],
};

export default entity;

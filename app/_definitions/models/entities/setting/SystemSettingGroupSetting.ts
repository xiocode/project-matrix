import type { TDictionaryCodes } from "../../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  metaOnly: true,
  namespace: "svc",
  code: "SystemSettingGroupSetting",
  name: "系统设置项分组设置",
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
      code: "description",
      name: "描述",
      type: "text",
    },
    {
      code: "permissionAssignments",
      name: "权限设置",
      type: "json",
    },
    {
      code: "items",
      name: "设置项",
      type: "relation[]",
      targetSingularCode: "system_setting_item_setting",
      selfIdColumnName: "group_id",
    },
    {
      code: "details",
      name: "详细信息",
      description: '{"url": "", "actions": [{"text": "", "url": ""}]}',
      type: "json",
    },
    {
      code: "user",
      name: "用户",
      type: "relation",
      targetSingularCode: "oc_user",
      targetIdColumnName: "user_id",
    },
  ],
};

export default entity;

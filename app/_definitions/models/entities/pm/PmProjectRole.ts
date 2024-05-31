import type { TDictionaryCodes } from "../../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "app",
  code: "PmProjectRole",
  name: "项目角色",
  fields: [
    {
      code: "project",
      name: "项目",
      type: "relation",
      targetSingularCode: "pm_project",
      targetIdColumnName: "project_id",
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
      code: "users",
      name: "用户",
      type: "relation[]",
      targetSingularCode: "oc_user",
      linkTableName: "pm_project_role_user_links",
      targetIdColumnName: "user_id",
      selfIdColumnName: "project_role_id",
    },
  ],
};

export default entity;

import type { TDictionaryCodes } from "../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "mom",
  code: "MomWorkTeam",
  name: "班组",
  fields: [
    {
      code: "shop",
      name: "车间",
      type: "relation",
      targetSingularCode: "mom_shop",
      targetIdColumnName: "shop_id",
    },
    {
      code: "code",
      name: "Code",
      type: "text",
    },
    {
      code: "name",
      name: "名称",
      type: "text",
    },
    {
      code: "orderNum",
      name: "排序号",
      type: "integer",
      required: true,
      defaultValue: "0",
    },
    {
      code: "leader",
      name: "组长",
      type: "relation",
      targetSingularCode: "base_employee",
      targetIdColumnName: "leader_id",
    },
    {
      code: "members",
      name: "组员",
      type: "relation",
      targetSingularCode: "base_employee",
      linkTableName: "mom_work_team_members",
      targetIdColumnName: "employee_id",
      selfIdColumnName: "team_id",
    },
  ],
};

export default entity;

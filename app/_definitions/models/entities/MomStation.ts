import type { TDictionaryCodes } from "../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "mom",
  code: "MomStation",
  name: "工站",
  fields: [
    {
      code: "building",
      name: "建筑",
      type: "relation",
      targetSingularCode: "base_building",
      targetIdColumnName: "building_id",
    },
    {
      code: "location",
      name: "位置",
      type: "relation",
      targetSingularCode: "base_location",
      targetIdColumnName: "location_id",
    },
    {
      code: "shop",
      name: "车间",
      type: "relation",
      targetSingularCode: "mom_shop",
      targetIdColumnName: "shop_id",
    },
    {
      code: "line",
      name: "产线",
      type: "relation",
      targetSingularCode: "mom_line",
      targetIdColumnName: "line_id",
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
  ],
};

export default entity;

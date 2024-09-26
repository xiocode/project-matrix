import type { TDictionaryCodes } from "../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "mom",
  code: "MomEquipmentCategoryDimension",
  name: "设备采集参数",
  fields: [
    {
      code: "equipmentCategory",
      name: "设备分类",
      type: "relation",
      targetSingularCode: "mom_equipment_category",
      targetIdColumnName: "category_id",
    },
    {
      code: "code",
      name: "编码",
      type: "text",
    },
    {
      code: "name",
      name: "名称",
      type: "text",
    },
    {
      code: "config",
      name: "配置",
      type: "json",
    },
    {
      code: "orderNum",
      name: "排序号",
      type: "integer",
      defaultValue: "0",
    },
  ],
};

export default entity;

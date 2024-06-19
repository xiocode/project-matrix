import type { TDictionaryCodes } from "../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "mom",
  code: "MomWarehouseStrategy",
  name: "仓库出入库策略",
  description: "仓库出入库策略",
  fields: [
    {
      code: "materialCategory",
      name: "物料类型",
      type: "relation",
      targetSingularCode: "base_material_category",
      targetIdColumnName: "material_category_id",
    },
    {
      code: "warehouse",
      name: "仓库",
      type: "relation",
      targetSingularCode: "mom_warehouse",
      targetIdColumnName: "warehouse_id",
    },
    {
      code: "businessType",
      name: "操作类型",
      type: "relation",
      targetSingularCode: "mom_inventory_business_type",
      targetIdColumnName: "business_type_id",
    },
    {
      code: "strategy",
      name: "策略",
      type: "option",
      dataDictionary: "WarehouseStrategy",
    },
    {
      code: "priority",
      name: "优先级",
      type: "integer",
    },
    {
      code: "qualifiedFilter",
      name: "合格状态校验",
      type: "boolean",
    },
    {
      code: "validityFilter",
      name: "有效期校验",
      type: "boolean",
    },
    {
      code: "enabled",
      name: "启用",
      type: "boolean",
    },
  ],
};

export default entity;

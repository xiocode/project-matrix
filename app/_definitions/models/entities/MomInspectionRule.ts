import type { TDictionaryCodes } from "../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "mom",
  code: "MomInspectionRule",
  name: "检验规则",
  description: "设置被检物品在不同检验类型/场景下需要检验哪些特征，各个特征的理论值、合格条件等。",
  fields: [
    {
      code: "category",
      name: "检验类型",
      type: "relation",
      targetSingularCode: "mom_inspection_category",
      targetIdColumnName: "category_id",
    },
    {
      code: "material",
      name: "物品",
      type: "relation",
      targetSingularCode: "base_material",
      targetIdColumnName: "material_id",
    },
    {
      code: "routeProcess",
      name: "生产工序",
      type: "relation",
      targetSingularCode: "mom_route_process",
      targetIdColumnName: "route_process_id",
    },
    {
      code: "config",
      name: "配置",
      type: "json",
    },
  ],
};

export default entity;

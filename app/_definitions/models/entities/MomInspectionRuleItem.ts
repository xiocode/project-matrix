import type {TDictionaryCodes} from "../../meta/data-dictionary-codes";
import type {TEntitySingularCodes} from "../../meta/model-codes";
import type {RapidEntity} from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "mom",
  code: "MomInspectionRuleItem",
  name: "检验规则",
  description: "设置被检物品在不同检验类型/场景下需要检验哪些特征，各个特征的理论值、合格条件等。",
  fields: [
    {
      code: "rule",
      name: "检验规则",
      type: "relation",
      targetSingularCode: "mom_inspection_rule",
      targetIdColumnName: "rule_id",
    },
    {
      code: "required",
      name: "是否必检",
      type: "boolean",
    },
    {
      code: "method",
      name: "检验方法",
      type: "relation",
      targetSingularCode: "mom_inspection_method",
      targetIdColumnName: "method_id",
    },
    {
      code: "method",
      name: "检验方法",
      type: "relation",
      targetSingularCode: "mom_inspection_method",
      targetIdColumnName: "method_id",
    },
    {
      code: "condition",
      name: "条件",
      type: "option",
      dataDictionary: "InspectionDetermineType",
    },
  ],
};

export default entity;

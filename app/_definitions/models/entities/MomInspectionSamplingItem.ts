import type { TDictionaryCodes } from "../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "mom",
  code: "MomInspectionSamplingItem",
  name: "检验抽样",
  fields: [
    {
      code: "sampling",
      name: "采样规则",
      type: "relation",
      targetSingularCode: "mom_inspection_sampling",
      targetIdColumnName: "sampling_id",
    },
    {
      code: "from",
      name: "起始值",
      type: "decimal",
      required: true,
    },
    {
      code: "to",
      name: "截止值",
      type: "decimal",
      required: true,
    },
    {
      code: "samplingCount",
      name: "样本数",
      type: "integer",
      required: true,
    },
    {
      code: "factory",
      name: "工厂",
      type: "relation",
      targetSingularCode: "mom_factory",
      targetIdColumnName: "factory_id",
    },
  ],
};

export default entity;

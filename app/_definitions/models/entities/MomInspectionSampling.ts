import type { TDictionaryCodes } from "../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "mom",
  code: "MomInspectionSampling",
  name: "检验抽样",
  fields: [
    {
      code: "materialCategory",
      name: "物料类型",
      type: "relation",
      targetSingularCode: "base_material_category",
      targetIdColumnName: "material_category_id",
      required: true,
    },
    {
      code: "items",
      name: "明细项",
      type: "relation[]",
      targetSingularCode: "mom_inspection_sampling_item",
      selfIdColumnName: "sampling_id",
    },
  ],
};

export default entity;

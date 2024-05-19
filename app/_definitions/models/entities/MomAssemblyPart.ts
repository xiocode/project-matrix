import type { TDictionaryCodes } from "../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "mom",
  code: "MomAssemblyPart",
  name: "组装零件记录",
  fields: [
    {
      code: "main",
      name: "主体记录",
      type: "relation",
      targetSingularCode: "mom_assembly_main",
      targetIdColumnName: "main_id",
    },
    {
      code: "partMaterial",
      name: "下级物料",
      type: "relation",
      targetSingularCode: "base_material",
      targetIdColumnName: "part_material_id",
    },
    {
      code: "partMaterialCode",
      name: "主物料号",
      type: "text",
    },
    {
      code: "partLotNum",
      name: "批号",
      type: "text",
    },
    {
      code: "partSerialNum",
      name: "序列号",
      type: "text",
    },
  ],
};

export default entity;

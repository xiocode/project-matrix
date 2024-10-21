import type { TDictionaryCodes } from "../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "app",
  code: "HuateGCMS",
  name: "大门",
  fields: [
    {
      code: "material",
      name: "物料",
      type: "relation",
      targetSingularCode: "base_material",
      targetIdColumnName: "material_id",
    },
    {
      code: "code",
      name: "编码",
      type: "text",
    },
    {
      code: "enabled",
      name: "是否启用",
      type: "boolean",
    },
    {
      code: "needInspect",
      name: "是否需要审核",
      type: "boolean",
    },
    {
      code: "sheet",
      name: "检验单",
      type: "relation",
      targetSingularCode: "mom_inspection_sheet",
      targetIdColumnName: "sheet_id",
    },
  ],
};

export default entity;

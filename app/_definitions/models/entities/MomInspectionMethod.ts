import type { TDictionaryCodes } from "../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "mom",
  code: "MomInspectionMethod",
  name: "检验方法",
  description: "理化检验 / 感官检验",
  fields: [
    {
      code: "name",
      name: "名称",
      type: "text",
    },
    {
      code: "description",
      name: "描述",
      type: "text",
    },
  ],
};

export default entity;

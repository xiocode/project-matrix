import type { TDictionaryCodes } from "../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "mom",
  code: "MomInspectionCharacteristicCategory",
  name: "检验特征类型",
  description: "特征类型，比如尺寸、外观等。",
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

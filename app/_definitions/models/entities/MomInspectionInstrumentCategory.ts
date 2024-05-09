import type { TDictionaryCodes } from "../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "mom",
  code: "MomInspectionInstrumentCategory",
  name: "检验仪器类型",
  description: "如：游标卡尺、千分尺、温度计等。",
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

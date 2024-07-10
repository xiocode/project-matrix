import type { TDictionaryCodes } from "../../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  metaOnly: true,
  namespace: "svc",
  code: "SystemSettingItem",
  name: "系统设置项",
  fields: [
    {
      code: "groupCode",
      name: "分组代码",
      type: "text",
      required: true,
    },
    {
      code: "itemCode",
      name: "设置项代码",
      type: "text",
      required: true,
    },
    {
      code: "value",
      name: "设置值",
      type: "json",
    },
  ],
};

export default entity;

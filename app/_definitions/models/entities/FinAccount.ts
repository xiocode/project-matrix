import type { TDictionaryCodes } from "../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "app",
  code: "FinAccount",
  name: "账户",
  fields: [
    {
      code: "code",
      name: "编号",
      type: "text",
      required: false,
    },
    {
      code: "name",
      name: "名称",
      type: "text",
      required: true,
    },
    {
      code: "description",
      name: "描述",
      type: "text",
    },
    {
      code: "initialAmount",
      name: "初始金额",
      type: "double",
      required: true,
      defaultValue: "0",
    },
    {
      code: "balance",
      name: "账户余额",
      type: "double",
      required: true,
      defaultValue: "0",
    },
    {
      code: "state",
      name: "状态",
      required: true,
      type: "option",
      dataDictionary: "EnabledDisabledState",
    },
  ],
};

export default entity;

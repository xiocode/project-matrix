import type { TDictionaryCodes } from "../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "svc",
  code: "SvcPrinter",
  name: "打印机",
  fields: [
    {
      code: "code",
      name: "编码",
      type: "text",
      required: true,
    },
    {
      code: "description",
      name: "描述",
      type: "text",
    },
    {
      code: "networkState",
      name: "网络状态",
      type: "option",
      dataDictionary: "PrinterNetworkState",
      required: true,
    },
    {
      code: "orderNum",
      name: "排序号",
      type: "integer",
      required: true,
      defaultValue: "0",
    },
  ],
};

export default entity;

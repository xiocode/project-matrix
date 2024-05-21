import type { TDictionaryCodes } from "../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "svc",
  code: "SvcPrintTask",
  name: "打印任务",
  fields: [
    {
      code: "printer",
      name: "打印机",
      type: "relation",
      targetSingularCode: "svc_printer",
      targetIdColumnName: "printer_id",
    },
    {
      code: "name",
      name: "名称",
      type: "text",
    },
    {
      code: "type",
      name: "类型",
      type: "text",
    },
    {
      code: "data",
      name: "打印数据",
      type: "text",
    },
    {
      code: "state",
      name: "状态",
      type: "option",
      dataDictionary: "PrintTaskState",
      required: true,
    },
  ],
};

export default entity;

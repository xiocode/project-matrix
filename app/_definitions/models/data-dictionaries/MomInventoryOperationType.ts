import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: "MomInventoryOperationType",
  name: "库存操作类型",
  valueType: "string",
  level: "app",
  entries: [
    { name: "入库", value: "in" },
    { name: "出库", value: "out" },
    { name: "调拨", value: "transfer" },
    { name: "整理", value: "organize" },
    { name: "盘点", value: "adjust" },
  ],
} as RapidDataDictionary;

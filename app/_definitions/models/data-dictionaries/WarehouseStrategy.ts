import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: "WarehouseStrategy",
  name: "仓库策略",
  valueType: "integer",
  level: "app",
  entries: [
    { name: "先进先出", value: "fifo" },
    { name: "先到期先出", value: "fdfo" },
    { name: "合格状态校验", value: "qualified" },
    { name: "有效期校验", value: "validity" },
  ],
} as RapidDataDictionary;

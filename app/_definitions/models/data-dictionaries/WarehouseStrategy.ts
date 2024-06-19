import type {RapidDataDictionary} from "@ruiapp/rapid-extension";

export default {
  code: "WarehouseStrategy",
  name: "仓库策略",
  valueType: "integer",
  level: "app",
  entries: [
    {name: "先进先出", value: "fifo"},
    {name: "先到期先出", value: "fdfo"},
    {name: "手动分配", value: "manual"},
  ],
} as RapidDataDictionary;

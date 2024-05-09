import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: "FinTransactionType",
  name: "转账类型",
  valueType: "string",
  level: "app",
  entries: [
    { name: "转入", value: "in", color: "green" },
    { name: "转出", value: "out", color: "red" },
  ],
} as RapidDataDictionary;

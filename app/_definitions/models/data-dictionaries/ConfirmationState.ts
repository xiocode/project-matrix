import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: "ConfirmationState",
  name: "确认状态",
  valueType: "string",
  level: "app",
  entries: [
    { name: "待确认", value: "unconfirmed", color: "orange" },
    { name: "已确认", value: "confirmed", color: "green" },
  ],
} as RapidDataDictionary;

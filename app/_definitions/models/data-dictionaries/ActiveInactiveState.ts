import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: "ActiveInactiveState",
  name: "活跃/不活跃状态",
  valueType: "string",
  level: "sys",
  entries: [
    { name: "活跃", value: "active" },
    { name: "不活跃", value: "inactive" },
  ],
} as RapidDataDictionary;

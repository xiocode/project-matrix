import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: "SettingItemType",
  name: "设置项类型",
  valueType: "string",
  level: "sys",
  entries: [
    { name: "文本", value: "text" },
    { name: "整数", value: "integer" },
    { name: "布尔值", value: "boolean" },
  ],
} as RapidDataDictionary;

import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  metaOnly: true,
  code: "DataDictionaryValueType",
  name: "字典值类型",
  valueType: "string",
  level: "sys",
  entries: [
    { name: "文字", value: "string" },
    { name: "数字", value: "integer" },
  ],
} as RapidDataDictionary;

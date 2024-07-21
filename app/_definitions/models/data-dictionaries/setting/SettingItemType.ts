import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: "SettingItemType",
  name: "设置项类型",
  valueType: "string",
  level: "sys",
  entries: [
    { name: "文本", value: "text" },
    { name: "多行文本", value: "textarea" },
    { name: "数字", value: "number" },
    { name: "开关", value: "switch" },
    { name: "复选框", value: "checkbox" },
    { name: "日期", value: "date" },
    { name: "时间", value: "time" },
    { name: "日期时间", value: "datetime" },
    { name: "文件", value: "file" },
    { name: "JSON", value: "json" },
  ],
} as RapidDataDictionary;

import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: "DocumentType",
  name: "文档类型",
  valueType: "string",
  level: "app",
  entries: [
    { name: "文件夹", value: "directory" },
    { name: "文件", value: "file" },
    { name: "链接", value: "link" },
  ],
} as RapidDataDictionary;

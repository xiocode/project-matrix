import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: "MomPackageGoodState",
  name: "包内物品状态",
  valueType: "string",
  level: "app",
  entries: [
    { name: "已打包", value: "packed" },
    { name: "已拆包", value: "unpacked" },
  ],
} as RapidDataDictionary;

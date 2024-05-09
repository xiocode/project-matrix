import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: "MomGoodState",
  name: "物品状态",
  valueType: "string",
  level: "app",
  entries: [
    { name: "正常", value: "normal" },
    { name: "已分拆", value: "splitted" },
    { name: "已合并", value: "merged" },
    { name: "已转移", value: "transferred" },
    { name: "已销毁", value: "destroied" },
  ],
} as RapidDataDictionary;

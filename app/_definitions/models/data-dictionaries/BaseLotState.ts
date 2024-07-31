import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: "BaseLotState",
  name: "物品状态",
  valueType: "string",
  level: "app",
  entries: [
    { name: "正常", value: "normal" },
    { name: "已销毁", value: "destroyed" },
    { name: "待处理", value: "pending" },
    { name: "退货", value: "return" },
  ],
} as RapidDataDictionary;

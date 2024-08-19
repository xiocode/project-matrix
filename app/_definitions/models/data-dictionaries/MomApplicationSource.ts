import type {RapidDataDictionary} from "@ruiapp/rapid-extension";

export default {
  code: "MomApplicationSource",
  name: "库存申请单来源",
  valueType: "string",
  level: "app",
  entries: [
    { name: "金蝶KIS", value: "kis", color: "red" },
    { name: "手动创建", value: "manual", color: "orange" },
  ],
} as RapidDataDictionary;

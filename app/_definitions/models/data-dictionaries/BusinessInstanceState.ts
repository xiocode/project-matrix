import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: "BusinessInstanceState",
  name: "流程实例状态",
  valueType: "string",
  level: "app",
  entries: [
    { name: "草稿", value: "draft" },
    { name: "进行中", value: "processing", color: "orange" },
    { name: "已完成", value: "finished", color: "green" },
    { name: "已取消", value: "canceled", color: "gray" },
  ],
} as RapidDataDictionary;

import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: "PmWorkItemStepState",
  name: "工作项步骤状态",
  valueType: "string",
  level: "app",
  entries: [
    { name: "未开始", value: "pending", color: "orange" },
    { name: "进行中", value: "wip", color: "green" },
    { name: "已完成", value: "completed", color: "blue" },
  ],
} as RapidDataDictionary;

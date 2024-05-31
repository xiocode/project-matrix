import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: "PmWorkItemState",
  name: "工作项状态",
  valueType: "string",
  level: "app",
  entries: [
    { name: "未开始", value: "pending", color: "orange" },
    { name: "进行中", value: "wip", color: "green" },
    { name: "已完成", value: "completed", color: "blue" },
    { name: "已关闭", value: "closed", color: "purple" },
  ],
} as RapidDataDictionary;

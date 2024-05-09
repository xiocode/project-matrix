import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: "PmMilestoneState",
  name: "里程碑状态",
  valueType: "string",
  level: "app",
  entries: [
    { name: "未计划", value: "unplanned" },
    { name: "已计划", value: "planned", color: "purple" },
    { name: "进行中", value: "inProgress", color: "blue" },
    { name: "已完成", value: "completed", color: "green" },
    { name: "已延期", value: "delayed", color: "orange" },
    { name: "已取消", value: "cancelled", color: "red" },
  ],
} as RapidDataDictionary;

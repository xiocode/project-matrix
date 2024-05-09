import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: "MomMrpPlanningState",
  name: "生产资源计划规划状态",
  valueType: "string",
  level: "app",
  entries: [
    { name: "未计划", value: "unplanned" },
    { name: "计划中", value: "planning", color: "orange" },
    { name: "已计划", value: "planned", color: "green" },
    { name: "已取消", value: "canceled", color: "red" },
  ],
} satisfies RapidDataDictionary;

import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: "MomMrpExecutionState",
  name: "生产资源计划执行状态",
  valueType: "string",
  level: "app",
  entries: [
    { name: "未开始", value: "pending" },
    { name: "进行中", value: "processing", color: "lime" },
    { name: "已完成", value: "finished", color: "green" },
    { name: "已取消", value: "canceled", color: "red" },
  ],
} satisfies RapidDataDictionary;

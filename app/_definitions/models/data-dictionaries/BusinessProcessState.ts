import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: "BusinessProcessState",
  name: "流程定义状态",
  valueType: "string",
  level: "app",
  entries: [
    { name: "草稿", value: "draft", color: "gray" },
    { name: "审批中", value: "approving", color: "orange" },
    { name: "已发布", value: "published", color: "green" },
    { name: "已禁用", value: "disabled", color: "red" },
    { name: "已归档", value: "archived", color: "gray" },
  ],
} as RapidDataDictionary;

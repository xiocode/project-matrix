import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: "BusinessApplicationState",
  name: "流程申请单状态",
  valueType: "string",
  level: "app",
  entries: [
    { name: "草稿", value: "draft" },
    { name: "审批中", value: "processing", color: "orange" },
    { name: "已批准", value: "approved", color: "green" },
    { name: "已拒绝", value: "refused", color: "red" },
    { name: "已撤回", value: "withdrawed", color: "red" },
  ],
} as RapidDataDictionary;

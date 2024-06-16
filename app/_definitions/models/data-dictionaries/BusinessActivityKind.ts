import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: "BusinessActivityKind",
  name: "业务活动类型",
  valueType: "string",
  level: "app",
  entries: [
    { name: "审批", value: "approval" },
    { name: "提交表单", value: "form" },
    { name: "评论", value: "comment" },
  ],
} as RapidDataDictionary;

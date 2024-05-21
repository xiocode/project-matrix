import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: "PrintTaskState",
  name: "打印任务状态",
  valueType: "integer",
  level: "app",
  entries: [
    { name: "待打印", value: 0 },
    { name: "打印成功", value: 1 },
    { name: "打印失败", value: 2 },
  ],
} as RapidDataDictionary;

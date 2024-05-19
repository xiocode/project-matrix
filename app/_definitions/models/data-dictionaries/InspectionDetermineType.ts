import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: "InspectionDetermineType",
  name: "判定方式",
  valueType: "string",
  level: "app",
  entries: [
    { name: "公差", value: "inTolerance", description: "实测值在公差范围内为合格" },
    { name: "上下限", value: "inLimit", description: "实测值在上下限范围内为合格" },
    { name: "大于标准值", value: "gt", description: "实测值大于标准值为合格" },
    { name: "大于等于标准值", value: "ge", description: "实测值大于标准值为合格" },
    { name: "小于标准值", value: "lt", description: "实测值小于标准值为合格" },
    { name: "小于等于标准值", value: "le", description: "实测值小于标准值为合格" },
  ],
} as RapidDataDictionary;

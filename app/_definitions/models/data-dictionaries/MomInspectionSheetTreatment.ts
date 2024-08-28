import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: "MomInspectionSheetTreatment",
  name: "检验结果处理方式",
  valueType: "string",
  level: "app",
  entries: [
    { name: "特采", value: "special" , color: "orange" },
    { name: "退货", value: "withdraw", color: "red" },
    { name: "强制合格", value: "forced", color: "red" },
  ],
} as RapidDataDictionary;

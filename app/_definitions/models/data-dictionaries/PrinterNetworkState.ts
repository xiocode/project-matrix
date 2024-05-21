import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: "PrinterNetworkState",
  name: "打印机网络状态",
  valueType: "integer",
  level: "app",
  entries: [
    { name: "离线", value: 0 },
    { name: "在线", value: 1 },
  ],
} as RapidDataDictionary;

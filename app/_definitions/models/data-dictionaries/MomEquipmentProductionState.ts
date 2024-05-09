import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: "MomEquipmentProductionState",
  name: "设备生产状态",
  valueType: "string",
  level: "app",
  entries: [
    { name: "闲置", value: "idle" },
    { name: "调试", value: "commissioning" },
    { name: "加工", value: "processing" },
    { name: "故障", value: "fault" },
  ],
} as RapidDataDictionary;

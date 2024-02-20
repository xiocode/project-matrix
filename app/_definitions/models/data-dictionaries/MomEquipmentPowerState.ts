import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: 'MomEquipmentPowerState',
  name: '设备电源状态',
  valueType: 'string',
  level: "app",
  entries: [
    { name: '开', value: 'on' },
    { name: '关', value: 'off' },
  ],
} as RapidDataDictionary;

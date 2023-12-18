import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: 'UnitType',
  name: '单位类型',
  valueType: 'string',
  level: "app",
  entries: [
    { name: '物理量', value: 'quantity' },
    { name: '其它', value: 'others' },
  ],
} as RapidDataDictionary;

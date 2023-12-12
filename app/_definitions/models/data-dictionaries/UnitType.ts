import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: 'UnitType',
  name: '单位类型',
  valueType: 'string',
  level: "app",
  entries: [
    { name: '计量单位', value: 'quantity' },
    { name: '包装单位', value: 'packaging' },
  ],
} as RapidDataDictionary;

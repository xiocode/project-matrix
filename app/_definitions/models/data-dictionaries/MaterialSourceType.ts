import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: 'MaterialSourceType',
  name: '物料来源类型',
  valueType: 'string',
  level: "app",
  entries: [
    { name: '自制', value: 'selfMade' },
    { name: '外购', value: 'purchased' },
    { name: '外协', value: 'outsideProcessed' },
  ],
} as RapidDataDictionary;

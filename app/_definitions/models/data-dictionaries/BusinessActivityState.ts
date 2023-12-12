import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: 'BusinessActivityState',
  name: '流程活动状态',
  valueType: 'string',
  level: "app",
  entries: [
    { name: '进行中', value: 'pending', color: 'orange' },
    { name: '已完成', value: 'finished', color: 'green' },
  ],
} as RapidDataDictionary;

import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: 'PmBudgetType',
  name: '预算类型',
  valueType: 'string',
  level: "app",
  entries: [
    { name: '收入', value: 'in', color: 'green' },
    { name: '支出', value: 'out', color: 'red' },
  ],
} as RapidDataDictionary;

import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: 'MomInventoryOperationState',
  name: '库存操作状态',
  valueType: 'string',
  level: "app",
  entries: [
    { name: '待执行', value: 'pending', color: 'red' },
    { name: '执行中', value: 'processing', color: 'orange' },
    { name: '已完成', value: 'done', color: 'green' },
  ],
} as RapidDataDictionary;

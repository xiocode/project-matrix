import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: 'CbsOrderKind',
  name: '订单类型',
  valueType: 'string',
  level: "app",
  entries: [
    { name: '销售', value: 'sale', color: 'green' },
    { name: '采购', value: 'purchase', color: 'orange' },
  ],
} as RapidDataDictionary;

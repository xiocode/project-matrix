import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: 'CbsContractKind',
  name: '合同类型',
  valueType: 'string',
  level: "app",
  entries: [
    { name: '销售', value: 'sale', color: 'green' },
    { name: '采购', value: 'purchase', color: 'orange' },
    { name: '专项', value: 'special', color: 'blue' },
  ],
} as RapidDataDictionary;

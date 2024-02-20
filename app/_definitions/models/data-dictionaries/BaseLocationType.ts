import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: 'BaseLocationType',
  name: '地点类型',
  valueType: 'string',
  level: "app",
  entries: [
    { name: '工厂', value: 'factory' },
    { name: '建筑物', value: 'building' },
    { name: '车间', value: 'shop' },
    { name: '仓库', value: 'warehouse' },
    { name: '库位', value: 'storageArea' },
    { name: '办公楼', value: 'office' },
    { name: '实验室', value: 'lab' },
    { name: '大门', value: 'gate' },
    { name: '其它', value: 'other' },
  ],
} as RapidDataDictionary;

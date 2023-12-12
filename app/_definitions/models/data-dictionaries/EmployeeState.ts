import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: 'EmployeeState',
  name: '员工状态',
  valueType: 'string',
  level: "app",
  entries: [
    { name: '正常', value: 'normal', color: "green" },
    { name: '禁用', value: 'disabled', color: "red" },
    { name: '已离职', value: 'quitted' },
  ],
} as RapidDataDictionary;

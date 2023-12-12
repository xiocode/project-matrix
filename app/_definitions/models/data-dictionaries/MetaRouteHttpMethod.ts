import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: 'RouteHttpMethod',
  name: 'HTTP方法',
  valueType: 'string',
  level: "sys",
  entries: [
    { name: 'get', value: 'get' },
    { name: 'post', value: 'post' },
    { name: 'put', value: 'put' },
    { name: 'delete', value: 'delete' },
  ],
} as RapidDataDictionary;

import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: 'PmProjectStage',
  name: '项目阶段',
  valueType: 'string',
  level: "app",
  entries: [
    { name: '售前阶段', value: 'pre-sale', color: 'orange' },
    { name: '蓝图阶段', value: 'blueprint', color: 'blue' },
    { name: '实施阶段', value: 'executing', color: 'blue' },
    { name: '上线阶段', value: 'check', color: 'blue' },
    { name: '关闭阶段', value: 'closing', color: 'green' },
    { name: '已归档', value: 'archived' },
  ],
} as RapidDataDictionary;

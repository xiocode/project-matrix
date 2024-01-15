import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: 'PmProjectStage',
  name: '项目阶段',
  valueType: 'string',
  level: "app",
  entries: [
    { name: '立项阶段', value: 'proposal', color: 'orange' },
    { name: '启动阶段', value: 'initialization', color: 'orange' },
    { name: '规划阶段', value: 'planning', color: 'blue' },
    { name: '执行阶段', value: 'executing', color: 'blue' },
    { name: '关闭阶段', value: 'closing', color: 'purple' },
    { name: '已归档', value: 'archived', color: 'green' },
  ],
} as RapidDataDictionary;

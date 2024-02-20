import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: 'MomWorkTaskAssignmentState',
  name: '工序任务分配状态',
  valueType: 'string',
  level: "app",
  entries: [
    { name: '未分配', value: 'unassigned', color: 'orange' },
    { name: '已分配', value: 'assigned', color: 'green' },
    { name: '已取消', value: 'canceled', color: 'red' },
  ],
} satisfies RapidDataDictionary;

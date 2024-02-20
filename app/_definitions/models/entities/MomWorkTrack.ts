import type { TDictionaryCodes } from '../../meta/data-dictionary-codes';
import type { TEntitySingularCodes } from '../../meta/model-codes';
import type { RapidEntity } from '@ruiapp/rapid-extension';

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: 'mom',
  code: 'MomWorkTrack',
  name: '生产流转单',
  description: '用来记录一个/一批物品的生产流转过程',
  fields: [
    {
      code: 'code',
      name: '流转单号',
      type: 'text',
    },
    {
      code: 'workOrder',
      name: '生产工单',
      type: 'relation',
      targetSingularCode: 'mom_work_order',
      targetIdColumnName: 'work_order_id',
    },
    {
      code: 'assignmentState',
      name: '分配状态',
      type: 'option',
      dataDictionary: 'MomWorkTrackAssignmentState',
    },
    {
      code: 'executionState',
      name: '执行状态',
      type: 'option',
      dataDictionary: 'MomWorkTrackExecutionState',
    },
    {
      code: 'material',
      name: '物品',
      type: 'relation',
      targetSingularCode: 'base_material',
      targetIdColumnName: 'material_id',
    },
    {
      code: 'route',
      name: '工艺路线',
      type: 'relation',
      targetSingularCode: 'mom_route',
      targetIdColumnName: 'route_id',
    },
    {
      code: 'quantity',
      name: '数量',
      type: 'double',
    },
    {
      code: 'unit',
      name: '单位',
      type: 'relation',
      targetSingularCode: 'base_unit',
      targetIdColumnName: 'unit_id',
    },
    {
      code: 'scheduledStartDate',
      name: '计划开始日期',
      type: 'date',
    },
    {
      code: 'scheduledFinishDate',
      name: '计划完成日期',
      type: 'date',
    },
    {
      code: 'actualStartDate',
      name: '实际开始日期',
      type: 'date',
    },
    {
      code: 'actualFinishDate',
      name: '实际完成日期',
      type: 'date',
    },
    {
      code: 'productionTasks',
      name: '生产任务',
      type: 'relation[]',
      targetSingularCode: 'mom_work_task',
      selfIdColumnName: 'work_order_id',
    },
  ],
};

export default entity;

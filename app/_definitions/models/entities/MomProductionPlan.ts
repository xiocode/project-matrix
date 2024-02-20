import type { TDictionaryCodes } from '../../meta/data-dictionary-codes';
import type { TEntitySingularCodes } from '../../meta/model-codes';
import type { RapidEntity } from '@ruiapp/rapid-extension';

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: 'mom',
  code: 'MomProductionPlan',
  name: '生产计划',
  fields: [
    {
      code: 'code',
      name: '生产计划号',
      type: 'text',
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
      code: 'scheduleState',
      name: '计划状态',
      type: 'option',
      dataDictionary: 'MomProductionPlanScheduleState',
    },
    {
      code: 'executionState',
      name: '执行状态',
      type: 'option',
      dataDictionary: 'MomProductionPlanExecutionState',
    },
    {
      code: 'lineItems',
      name: '计划项',
      type: 'relation[]',
      targetSingularCode: 'mom_production_plan_item',
      selfIdColumnName: 'plan_id',
    },
    {
      code: 'productionOrders',
      name: '生产工单',
      type: 'relation[]',
      // targetSingularCode: 'mom_work_order',
      selfIdColumnName: 'plan_id',
    },
  ],
};

export default entity;

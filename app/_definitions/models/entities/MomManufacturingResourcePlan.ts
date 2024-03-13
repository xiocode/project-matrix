import type { TDictionaryCodes } from '../../meta/data-dictionary-codes';
import type { TEntitySingularCodes } from '../../meta/model-codes';
import type { RapidEntity } from '@ruiapp/rapid-extension';

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: 'mom',
  code: 'MomManufacturingResourcePlan',
  name: '物料需求计划',
  fields: [
    {
      code: 'name',
      name: '名称',
      type: 'text',
      required: true,
    },
    {
      code: 'result',
      name: '结果',
      type: 'json',
    },
    {
      code: 'planningState',
      name: '计划状态',
      type: 'option',
      dataDictionary: 'MomMrpPlanningState',
    },
    {
      code: 'executionState',
      name: '执行状态',
      type: 'option',
      dataDictionary: 'MomMrpExecutionState',
    },
    {
      code: 'productionSchedules',
      name: '主生产计划',
      type: 'relation[]',
      targetSingularCode: 'mom_master_production_schedule',
      selfIdColumnName: 'mrp_id',
    },
    {
      code: 'workOrders',
      name: '生产工单',
      type: 'relation[]',
      targetSingularCode: 'mom_work_order',
      selfIdColumnName: 'mrp_id',
    },
  ],
};

export default entity;

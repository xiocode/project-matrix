import type { TDictionaryCodes } from '../../meta/data-dictionary-codes';
import type { TEntitySingularCodes } from '../../meta/model-codes';
import type { RapidEntity } from '@ruiapp/rapid-extension';

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: 'mom',
  code: 'MomMasterProductionSchedule',
  name: '主生产计划',
  fields: [
    {
      code: 'code',
      name: '生产计划号',
      type: 'text',
    },
    {
      code: 'material',
      name: '物品',
      type: 'relation',
      targetSingularCode: 'base_material',
      targetIdColumnName: 'material_id',
    },
    {
      code: 'tags',
      name: '标签',
      type: 'text',
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
      code: 'scheduleState',
      name: '计划状态',
      type: 'option',
      dataDictionary: 'MomMpsScheduleState',
    },
    {
      code: 'executionState',
      name: '执行状态',
      type: 'option',
      dataDictionary: 'MomMpsExecutionState',
    },
    {
      code: 'mrp',
      name: '物料需求计划',
      type: 'relation',
      targetSingularCode: 'mom_manufacturing_resource_plan',
      targetIdColumnName: 'mrp_id',
    },
    {
      code: 'productionOrders',
      name: '生产工单',
      type: 'relation[]',
      targetSingularCode: 'mom_work_order',
      selfIdColumnName: 'mps_id',
    },
    {
      code: 'purchaseOrders',
      name: '采购订单',
      type: 'relation[]',
      targetSingularCode: 'cbs_order',
      linkTableName: 'mom_mps_purchase_orders',
      targetIdColumnName: 'order_id',
      selfIdColumnName: 'mps_id',
    },
  ],
};

export default entity;

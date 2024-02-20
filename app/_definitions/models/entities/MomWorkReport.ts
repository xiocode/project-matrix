import type { TDictionaryCodes } from '../../meta/data-dictionary-codes';
import type { TEntitySingularCodes } from '../../meta/model-codes';
import type { RapidEntity } from '@ruiapp/rapid-extension';

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: 'mom',
  code: 'MomWorkReport',
  name: '生产报工',
  fields: [
    {
      code: 'code',
      name: '生产报工号',
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
      code: 'workTrack',
      name: '生产流转单',
      type: 'relation',
      targetSingularCode: 'mom_work_track',
      targetIdColumnName: 'work_track_id',
    },
    {
      code: 'workTask',
      name: '生产任务',
      type: 'relation',
      targetSingularCode: 'mom_work_task',
      targetIdColumnName: 'work_task_id',
    },
    {
      code: 'route',
      name: '工艺路线',
      type: 'relation',
      targetSingularCode: 'mom_route',
      targetIdColumnName: 'route_id',
    },
    {
      code: 'routeProcess',
      name: '生产工序',
      type: 'relation',
      targetSingularCode: 'mom_route_process',
      targetIdColumnName: 'route_process_id',
    },
    {
      code: 'quantity',
      name: '数量',
      type: 'double',
    },
    {
      code: 'qualifiedQuantity',
      name: '合格数量',
      type: 'double',
    },
    {
      code: 'unqualifiedQuantity',
      name: '不合格数量',
      type: 'double',
    },
    {
      code: 'scrapQuantity',
      name: '不合格数量',
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
      code: 'equipment',
      name: '设备',
      type: 'relation',
      targetSingularCode: 'mom_equipment',
      targetIdColumnName: 'equipment_id',
    },
    {
      code: 'operators',
      name: '操作工',
      type: 'relation[]',
      targetSingularCode: 'base_employee',
      linkTableName: 'mom_work_report_operators',
      targetIdColumnName: 'operator_id',
      selfIdColumnName: 'report_id',
    },
    {
      code: 'extra',
      name: '其它信息',
      type: 'json',
    },
  ],
};

export default entity;

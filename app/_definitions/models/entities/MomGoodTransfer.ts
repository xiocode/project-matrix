import type { TDictionaryCodes } from '../../meta/data-dictionary-codes';
import type { TEntitySingularCodes } from '../../meta/model-codes';
import type { RapidEntity } from '@ruiapp/rapid-extension';

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: 'mom',
  code: 'MomGoodTransfer',
  name: '物品转移记录',
  description: '物品移动的历史记录',
  fields: [
    {
      code: 'operation',
      name: '操作记录',
      type: 'relation',
      targetSingularCode: 'mom_inventory_operation',
      targetIdColumnName: 'operation_id',
    },
    {
      code: 'orderNum',
      name: '排序号',
      type: 'integer',
      required: true,
      defaultValue: '0',
    },
    {
      code: 'good',
      name: '物品',
      type: 'relation',
      targetSingularCode: 'mom_good',
      targetIdColumnName: 'good_id',
    },
    {
      code: 'from',
      name: '转出位置',
      type: 'relation',
      targetSingularCode: 'base_location',
      targetIdColumnName: 'from_location_id',
    },
    {
      code: 'to',
      name: '转入位置',
      type: 'relation',
      targetSingularCode: 'base_location',
      targetIdColumnName: 'to_location_id',
    },
    {
      code: 'transferTime',
      name: '转移时间',
      type: 'datetime',
    },
  ],
};

export default entity;

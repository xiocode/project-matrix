import type { TDictionaryCodes } from '../../meta/data-dictionary-codes';
import type { TEntitySingularCodes } from '../../meta/model-codes';
import type { RapidEntity } from '@ruiapp/rapid-extension';

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: 'mom',
  code: 'MomInventoryOperation',
  name: '库存操作记录',
  description: '对物品库存操作的一次记录，一次操作可包含多个物品的转移记录。',
  fields: [
    {
      code: 'code',
      name: '编号',
      type: 'text',
    },
    {
      code: 'operationType',
      name: '操作类型',
      type: 'option',
      dataDictionary: 'MomInventoryOperationType',
      required: true,
    },
    {
      code: 'businessType',
      name: '业务类型',
      type: 'relation',
      targetSingularCode: 'mom_inventory_business_type',
      targetIdColumnName: 'business_id',
    },
    {
      code: 'businessDetails',
      name: '业务详情',
      type: 'json',
    },
    {
      code: 'state',
      name: '状态',
      type: 'option',
      dataDictionary: 'MomInventoryOperationState',
    },
    {
      code: 'transfers',
      name: '变更明细',
      type: 'relation[]',
      targetSingularCode: 'mom_good_transfer',
      selfIdColumnName: 'operation_id',
    },
  ],
};

export default entity;

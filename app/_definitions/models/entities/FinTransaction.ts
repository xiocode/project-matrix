import type { TDictionaryCodes } from '../../meta/data-dictionary-codes';
import type { TEntitySingularCodes } from '../../meta/model-codes';
import type { RapidEntity } from '@ruiapp/rapid-extension';

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: 'app',
  code: 'FinTransaction',
  name: '转账',
  fields: [
    {
      code: 'code',
      name: '编号',
      type: 'text',
      required: false,
    },
    {
      code: 'account',
      name: '账户',
      type: 'relation',
      targetSingularCode: 'fin_account',
      targetIdColumnName: 'account_id',
      required: true,
    },
    {
      code: 'type',
      name: '类型',
      required: true,
      type: 'option',
      dataDictionary: 'FinTransactionType',
    },
    {
      code: 'description',
      name: '描述',
      type: 'text',
    },
    {
      code: 'amount',
      name: '金额',
      type: 'double',
      required: true,
    },
    {
      code: 'balance',
      name: '账户余额',
      type: 'double',
    },
    {
      code: 'transferedAt',
      name: '转账时间',
      type: 'datetime',
    },
    {
      code: 'state',
      name: '状态',
      required: true,
      type: 'option',
      dataDictionary: 'ConfirmationState',
    },
    {
      code: 'contract',
      name: '合同',
      type: 'relation',
      targetSingularCode: 'cbs_contract',
      targetIdColumnName: 'contract_id',
    },
    {
      code: 'order',
      name: '订单',
      type: 'relation',
      targetSingularCode: 'cbs_order',
      targetIdColumnName: 'order_id',
    },
  ],
};

export default entity;

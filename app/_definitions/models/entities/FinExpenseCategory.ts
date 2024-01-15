import type { TDictionaryCodes } from '../../meta/data-dictionary-codes';
import type { TEntitySingularCodes } from '../../meta/model-codes';
import type { RapidEntity } from '@ruiapp/rapid-extension';

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: 'app',
  code: 'FinExpenseCategory',
  name: '费用类型',
  fields: [
    {
      code: 'code',
      name: '编号',
      type: 'text',
      required: false,
    },
    {
      code: 'name',
      name: '名称',
      type: 'text',
      required: true,
    },
    {
      code: 'orderNum',
      name: '排序号',
      type: 'integer',
      required: true,
    },
    {
      code: 'parent',
      name: '上级分类',
      type: 'relation',
      targetSingularCode: 'fin_expense_category',
      targetIdColumnName: 'parent_id',
    },
  ],
};

export default entity;

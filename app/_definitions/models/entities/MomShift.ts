import type { TDictionaryCodes } from '../../meta/data-dictionary-codes';
import type { TEntitySingularCodes } from '../../meta/model-codes';
import type { RapidEntity } from '@ruiapp/rapid-extension';

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: 'mom',
  code: 'MomShift',
  name: '班次',
  fields: [
    {
      code: 'code',
      name: 'Code',
      type: 'text',
    },
    {
      code: 'name',
      name: '名称',
      type: 'text',
    },
    {
      code: 'orderNum',
      name: '排序号',
      type: 'integer',
      required: true,
      defaultValue: '0',
    },
  ],
};

export default entity;

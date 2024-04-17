import type { TDictionaryCodes } from '../../meta/data-dictionary-codes';
import type { TEntitySingularCodes } from '../../meta/model-codes';
import type { RapidEntity } from '@ruiapp/rapid-extension';

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: 'app',
  code: 'BpmProcessCategory',
  name: '流程分组',
  fields: [
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
  ],
};

export default entity;

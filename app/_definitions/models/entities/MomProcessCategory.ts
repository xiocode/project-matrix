import type { TDictionaryCodes } from '../../meta/data-dictionary-codes';
import type { TEntitySingularCodes } from '../../meta/model-codes';
import type { RapidEntity } from '@ruiapp/rapid-extension';

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: 'mom',
  code: 'MomProcessCategory',
  name: '工序分类',
  description: '如：生产、检验、出入库等。',
  fields: [
    {
      code: 'code',
      name: 'Code',
      type: 'text',
      required: true,
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
  ],
};

export default entity;

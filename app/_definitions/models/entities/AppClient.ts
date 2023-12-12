import type { TDictionaryCodes } from '../../meta/data-dictionary-codes';
import type { TEntitySingularCodes } from '../../meta/model-codes';
import type { RapidEntity } from '@ruiapp/rapid-extension';

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: 'app',
  code: 'AppClient',
  name: '客户端',
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
      code: 'config',
      name: '配置',
      type: 'json',
      required: false,
    },
    {
      code: 'state',
      name: '状态',
      type: 'option',
      dataDictionary: 'UndeletedDeletedState',
      required: true,
    },
  ],
};

export default entity;

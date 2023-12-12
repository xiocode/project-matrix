import type { TDictionaryCodes } from '../../meta/data-dictionary-codes';
import type { TEntitySingularCodes } from '../../meta/model-codes';
import type { RapidEntity } from '@ruiapp/rapid-extension';

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: 'app',
  code: 'BaseWarehouse',
  name: '仓库',
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
  ],
};

export default entity;

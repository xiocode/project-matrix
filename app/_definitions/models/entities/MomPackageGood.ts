import type { TDictionaryCodes } from '../../meta/data-dictionary-codes';
import type { TEntitySingularCodes } from '../../meta/model-codes';
import type { RapidEntity } from '@ruiapp/rapid-extension';

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: 'mom',
  code: 'MomPackageGood',
  name: '物品包内物品',
  fields: [
    {
      code: 'package_id',
      name: '包',
      type: 'relation',
      targetSingularCode: 'mom_package',
      targetIdColumnName: 'package_id',
    },
    {
      code: 'good',
      name: '物品',
      type: 'relation',
      targetSingularCode: 'mom_good',
      targetIdColumnName: 'good_id',
    },
    {
      code: 'state',
      name: '状态',
      type: 'option',
      dataDictionary: 'MomPackageGoodState',
    },
  ],
};

export default entity;

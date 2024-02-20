import type { TDictionaryCodes } from '../../meta/data-dictionary-codes';
import type { TEntitySingularCodes } from '../../meta/model-codes';
import type { RapidEntity } from '@ruiapp/rapid-extension';

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: 'mom',
  code: 'MomGoodLocation',
  name: '物品位置',
  description: '物品在哪个位置的历史记录',
  fields: [
    {
      code: 'good',
      name: '物品',
      type: 'relation',
      targetSingularCode: 'mom_good',
      targetIdColumnName: 'good_id',
    },
    {
      code: 'location',
      name: '位置',
      type: 'relation',
      targetSingularCode: 'base_location',
      targetIdColumnName: 'location_id',
    },
    {
      code: 'putInTime',
      name: '放入时间',
      type: 'datetime',
    },
    {
      code: 'takeOutTime',
      name: '取出时间',
      type: 'datetime',
    },
  ],
};

export default entity;

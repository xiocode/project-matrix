import type { TDictionaryCodes } from '../../meta/data-dictionary-codes';
import type { TEntitySingularCodes } from '../../meta/model-codes';
import type { RapidEntity } from '@ruiapp/rapid-extension';

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: 'mom',
  code: 'MomGoodLabel',
  name: '物品标签',
  description: '物品的附加信息，比如是否合格、品质等级等。',
  fields: [
    {
      code: 'good',
      name: '物品',
      type: 'relation',
      targetSingularCode: 'mom_good',
      targetIdColumnName: 'good_id',
    },
    {
      code: 'name',
      name: '标签名',
      type: 'text',
      required: true,
    },
    {
      code: 'textValue',
      name: '值',
      type: 'text',
    },
    {
      code: 'numberValue',
      name: '值',
      type: 'double',
    },
  ],
};

export default entity;

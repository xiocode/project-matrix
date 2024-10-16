import type { TDictionaryCodes } from '../../meta/data-dictionary-codes';
import type { TEntitySingularCodes } from '../../meta/model-codes';
import type { RapidEntity } from '@ruiapp/rapid-extension';

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: 'mom',
  code: 'MomInspectionCharacteristic',
  name: '检验特征',
  description: '被检物品的一个特征，或者一个检验项目。',
  fields: [
    {
      code: 'rule',
      name: '检验规则',
      type: 'relation',
      targetSingularCode: 'mom_inspection_rule',
      targetIdColumnName: 'rule_id',
    },
    {
      code: 'name',
      name: '名称',
      type: 'text',
    },
    {
      code: 'category',
      name: '特征类型',
      type: 'relation',
      targetSingularCode: 'mom_inspection_characteristic_category',
      targetIdColumnName: 'category_id',
    },
    {
      code: 'method',
      name: '检验方法',
      type: 'relation',
      targetSingularCode: 'mom_inspection_method',
      targetIdColumnName: 'method_id',
    },
    {
      code: 'instrumentCategory',
      name: '检验仪器类型',
      type: 'relation',
      targetSingularCode: 'mom_inspection_instrument_category',
      targetIdColumnName: 'instrument_category_id',
    },
    {
      code: 'instrument',
      name: '检验仪器',
      type: 'relation',
      targetSingularCode: 'mom_inspection_instrument',
      targetIdColumnName: 'instrument_id',
    },
    {
      code: 'config',
      name: '配置',
      type: 'json',
    },
  ],
};

export default entity;

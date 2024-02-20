import type { TDictionaryCodes } from '../../meta/data-dictionary-codes';
import type { TEntitySingularCodes } from '../../meta/model-codes';
import type { RapidEntity } from '@ruiapp/rapid-extension';

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: 'mom',
  code: 'MomInspectionInstrument',
  name: '检验仪器',
  fields: [
    {
      code: 'code',
      name: '仪器编号',
      type: 'text',
    },
    {
      code: 'category',
      name: '仪器类型',
      type: 'relation',
      targetSingularCode: 'mom_inspection_instrument_category',
      targetIdColumnName: 'category_id',
    },
  ],
};

export default entity;

import type { TDictionaryCodes } from '../../meta/data-dictionary-codes';
import type { TEntitySingularCodes } from '../../meta/model-codes';
import type { RapidEntity } from '@ruiapp/rapid-extension';

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: 'mom',
  code: 'MomMaterialBreakdown',
  name: 'BOM',
  fields: [
    {
      code: 'material',
      name: '物料',
      type: 'relation',
      targetSingularCode: 'base_material',
      targetIdColumnName: 'material_id',
    },
    {
      code: 'version',
      name: '版本',
      type: 'text',
    },
    {
      code: 'quantity',
      name: '数量',
      type: 'double',
    },
    {
      code: 'unit',
      name: '单位',
      type: 'relation',
      targetSingularCode: 'base_unit',
      targetIdColumnName: 'unit_id',
    },
    {
      code: 'state',
      name: '状态',
      type: 'option',
      dataDictionary: 'EnabledDisabledState',
      required: true,
    },
    {
      code: 'parts',
      name: '下级物料',
      type: 'relation[]',
      targetSingularCode: 'mom_material_breakdown_part',
      selfIdColumnName: 'breakdown_id',
    },
  ],
};

export default entity;

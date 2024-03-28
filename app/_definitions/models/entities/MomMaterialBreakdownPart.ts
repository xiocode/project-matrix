import type { TDictionaryCodes } from '../../meta/data-dictionary-codes';
import type { TEntitySingularCodes } from '../../meta/model-codes';
import type { RapidEntity } from '@ruiapp/rapid-extension';

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: 'mom',
  code: 'MomMaterialBreakdownPart',
  name: '下级物料',
  fields: [
    {
      code: 'materialBreakdown',
      name: 'BOM',
      type: 'relation',
      targetSingularCode: 'mom_material_breakdown',
      targetIdColumnName: 'breakdown_id',
    },
    {
      code: 'orderNum',
      name: '排序号',
      type: 'integer',
      required: true,
    },
    {
      code: 'subMaterial',
      name: '下级物料',
      type: 'relation',
      targetSingularCode: 'base_material',
      targetIdColumnName: 'sub_material_id',
    },
    {
      code: 'matchTags',
      name: '匹配参数',
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
  ],
};

export default entity;

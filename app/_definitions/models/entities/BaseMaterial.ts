import type { TDictionaryCodes } from '../../meta/data-dictionary-codes';
import type { TEntitySingularCodes } from '../../meta/model-codes';
import type { RapidEntity } from '@ruiapp/rapid-extension';

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: 'app',
  code: 'BaseMaterial',
  name: '物料',
  fields: [
    {
      code: 'code',
      name: '物料号',
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
      code: 'brand',
      name: '品牌',
      type: 'text',
    },
    {
      code: 'specification',
      name: '规格',
      type: 'text',
    },
    {
      code: 'description',
      name: '描述',
      type: 'text',
    },
    {
      code: 'category',
      name: '分类',
      type: 'relation',
      required: true,
      targetSingularCode: 'base_material_category',
      targetIdColumnName: 'category_id',
    },
    {
      code: 'canProduce',
      name: '可生产',
      type: 'boolean',
    },
    {
      code: 'canPurchase',
      name: '可采购',
      type: 'boolean',
    },
    {
      code: 'canSale',
      name: '可销售',
      type: 'boolean',
    },
    {
      code: 'state',
      name: '状态',
      type: 'option',
      dataDictionary: 'EnabledDisabledState',
      required: true,
    },
  ],
};

export default entity;

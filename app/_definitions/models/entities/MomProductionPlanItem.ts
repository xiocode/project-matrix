import type { TDictionaryCodes } from '../../meta/data-dictionary-codes';
import type { TEntitySingularCodes } from '../../meta/model-codes';
import type { RapidEntity } from '@ruiapp/rapid-extension';

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: 'mom',
  code: 'MomProductionPlanItem',
  name: '生产计划项',
  fields: [
    {
      code: 'productionPlan',
      name: '生产计划',
      type: 'relation',
      targetSingularCode: 'mom_production_plan',
      targetIdColumnName: 'production_plan_id',
    },
    {
      code: 'material',
      name: '物品',
      type: 'relation',
      targetSingularCode: 'base_material',
      targetIdColumnName: 'material_id',
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

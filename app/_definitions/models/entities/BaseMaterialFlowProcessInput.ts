import type { TDictionaryCodes } from '../../meta/data-dictionary-codes';
import type { TEntitySingularCodes } from '../../meta/model-codes';
import type { RapidEntity } from '@ruiapp/rapid-extension';

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: 'app',
  code: 'BaseMaterialFlowProcessInput',
  name: '物料生产工序输入物料',
  fields: [
    {
      code: 'materialProcess',
      name: '物料生产工序',
      type: 'relation',
      required: true,
      targetSingularCode: 'base_material_flow_process',
      targetIdColumnName: 'material_process_id',
    },
    {
      code: 'material',
      name: '物料',
      type: 'relation',
      required: true,
      targetSingularCode: 'base_material',
      targetIdColumnName: 'material_id',
    },
    {
      code: 'amount',
      name: '数量',
      type: 'double',
      required: true,
    },
    {
      code: 'unit',
      name: '单位',
      type: 'relation',
      required: true,
      targetSingularCode: 'base_unit',
      targetIdColumnName: 'unit_id',
    },
    {
      code: 'config',
      name: '配置',
      type: 'json',
    },
  ],
};

export default entity;

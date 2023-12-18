import type { TDictionaryCodes } from '../../meta/data-dictionary-codes';
import type { TEntitySingularCodes } from '../../meta/model-codes';
import type { RapidEntity } from '@ruiapp/rapid-extension';

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: 'app',
  code: 'BaseMaterialFlow',
  name: '物料工艺流程',
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
      required: true,
    },
    {
      code: 'state',
      name: '状态',
      type: 'option',
      dataDictionary: 'EnabledDisabledState',
      required: true,
    },
    {
      code: 'publishState',
      name: '发布状态',
      type: 'option',
      dataDictionary: 'PublishState',
      required: true,
      defaultValue: "'draft'",
    },
    {
      code: 'processes',
      name: '物料生产工序',
      type: 'relation[]',
      targetSingularCode: 'base_material_flow_process',
      selfIdColumnName: 'material_flow_id',
    },
  ],
};

export default entity;

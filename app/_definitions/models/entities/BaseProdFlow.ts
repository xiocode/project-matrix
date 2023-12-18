import type { TDictionaryCodes } from '../../meta/data-dictionary-codes';
import type { TEntitySingularCodes } from '../../meta/model-codes';
import type { RapidEntity } from '@ruiapp/rapid-extension';

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: 'app',
  code: 'BaseProdFlow',
  name: '工艺流程',
  fields: [
    {
      code: 'name',
      name: '名称',
      type: 'text',
      required: true,
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
      code: 'processes',
      name: '工序',
      type: 'relation[]',
      targetSingularCode: 'base_prod_flow_process',
      selfIdColumnName: 'flow_id',
    },
  ],
};

export default entity;

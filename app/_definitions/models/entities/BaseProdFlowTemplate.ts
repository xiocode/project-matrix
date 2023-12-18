import type { TDictionaryCodes } from '../../meta/data-dictionary-codes';
import type { TEntitySingularCodes } from '../../meta/model-codes';
import type { RapidEntity } from '@ruiapp/rapid-extension';

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: 'app',
  code: 'BaseProdFlowTemplate',
  name: '工艺流程模板',
  fields: [
    {
      code: 'name',
      name: '名称',
      type: 'text',
      required: true,
    },
    {
      code: 'processes',
      name: '工序',
      type: 'relation',
      targetSingularCode: 'base_prod_flow_template_process',
      selfIdColumnName: 'flow_template_id',
    },
  ],
};

export default entity;

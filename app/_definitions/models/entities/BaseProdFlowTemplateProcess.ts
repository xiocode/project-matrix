import type { TDictionaryCodes } from '../../meta/data-dictionary-codes';
import type { TEntitySingularCodes } from '../../meta/model-codes';
import type { RapidEntity } from '@ruiapp/rapid-extension';

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: 'app',
  code: 'BaseProdFlowTemplateProcess',
  name: '工艺流程模板工序',
  fields: [
    {
      code: 'flowTemplate',
      name: '工艺流程模板',
      type: 'relation',
      required: true,
      targetSingularCode: 'base_prod_flow_template',
      targetIdColumnName: 'flow_template_id',
    },
    {
      code: 'process',
      name: '生产工序',
      type: 'relation',
      required: true,
      targetSingularCode: 'base_prod_process',
      targetIdColumnName: 'process_id',
    },
    {
      code: 'standardCycleTime',
      name: '标准周期时间',
      type: 'integer',
      description: '以秒为单位',
    },
  ],
};

export default entity;

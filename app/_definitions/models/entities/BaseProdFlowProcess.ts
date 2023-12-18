import type { TDictionaryCodes } from '../../meta/data-dictionary-codes';
import type { TEntitySingularCodes } from '../../meta/model-codes';
import type { RapidEntity } from '@ruiapp/rapid-extension';

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: 'app',
  code: 'BaseProdFlowProcess',
  name: '工序',
  fields: [
    {
      code: 'flow',
      name: '工艺流程',
      type: 'relation',
      required: true,
      targetSingularCode: 'base_prod_flow',
      targetIdColumnName: 'flow_id',
    },
    {
      code: 'orderNum',
      name: '排序号',
      type: 'integer',
      required: true,
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

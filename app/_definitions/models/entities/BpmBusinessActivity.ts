import type { TDictionaryCodes } from '../../meta/data-dictionary-codes';
import type { TEntitySingularCodes } from '../../meta/model-codes';
import type { RapidEntity } from '@ruiapp/rapid-extension';

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: 'app',
  code: 'BpmBusinessActivity',
  name: '审批步骤',
  fields: [
    {
      code: 'application',
      name: '申请单',
      type: 'relation',
      required: true,
      targetSingularCode: 'bpm_business_application',
      targetIdColumnName: 'application_id',
    },
    {
      code: 'name',
      name: '步骤名',
      type: 'text',
      required: true,
    },
    {
      code: 'kind',
      name: '步骤类型',
      type: 'option',
      dataDictionary: 'BusinessActivityKind',
      required: true,
    },
    {
      code: 'tasks',
      name: '审批任务',
      type: 'relation[]',
      targetSingularCode: 'bpm_business_task',
      selfIdColumnName: 'activity_id',
    },
    {
      code: 'state',
      name: '步骤状态',
      type: 'option',
      dataDictionary: 'BusinessActivityState',
      required: true,
    },
    {
      code: 'resolution',
      name: '步骤决议',
      type: 'text',
      required: false,
    },
  ],
};

export default entity;

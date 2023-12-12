import type { TDictionaryCodes } from '../../meta/data-dictionary-codes';
import type { TEntitySingularCodes } from '../../meta/model-codes';
import type { RapidEntity } from '@ruiapp/rapid-extension';

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: 'app',
  code: 'BpmBusinessTask',
  name: '审批任务',
  fields: [
    {
      code: 'activity',
      name: '审批步骤',
      type: 'relation',
      required: true,
      targetSingularCode: 'bpm_business_activity',
      targetIdColumnName: 'activity_id',
    },
    {
      code: 'assignee',
      name: '负责人',
      type: 'relation',
      required: true,
      targetSingularCode: 'oc_user',
      targetIdColumnName: 'assignee_id',
    },
    {
      code: 'state',
      name: '任务状态',
      type: 'option',
      dataDictionary: 'BusinessTaskState',
      required: true,
    },
    {
      code: 'resolution',
      name: '任务决议',
      type: 'text',
      required: false,
    },
  ],
};

export default entity;

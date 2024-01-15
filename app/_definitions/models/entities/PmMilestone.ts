import type { TDictionaryCodes } from '../../meta/data-dictionary-codes';
import type { TEntitySingularCodes } from '../../meta/model-codes';
import type { RapidEntity } from '@ruiapp/rapid-extension';

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: 'app',
  code: 'PmMilestone',
  name: '里程碑',
  fields: [
    {
      code: 'project',
      name: '项目',
      type: 'relation',
      targetSingularCode: "pm_project",
      targetIdColumnName: "project_id",
    },
    {
      code: 'phase',
      name: '阶段',
      type: 'relation',
      targetSingularCode: "pm_phase",
      targetIdColumnName: "phase_id",
    },
    {
      code: 'name',
      name: '名称',
      type: 'text',
      required: true,
    },
    {
      code: 'description',
      name: '描述',
      type: 'text',
    },
    {
      code: 'deadline',
      name: '截止日期',
      type: 'date',
    },
    {
      code: 'state',
      name: '状态',
      type: 'option',
      dataDictionary: 'PmMilestoneState',
    },
    {
      code: 'completedAt',
      name: '完成日期',
      type: 'date',
    },
  ],
};

export default entity;

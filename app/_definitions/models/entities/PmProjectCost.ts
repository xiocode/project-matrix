import type { TDictionaryCodes } from '../../meta/data-dictionary-codes';
import type { TEntitySingularCodes } from '../../meta/model-codes';
import type { RapidEntity } from '@ruiapp/rapid-extension';

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: 'app',
  code: 'PmProjectCostBudget',
  name: '项目成本',
  fields: [
    {
      code: 'project',
      name: '项目',
      type: 'relation',
      targetSingularCode: "pm_project",
      targetIdColumnName: "project_id",
    },
    {
      code: 'title',
      name: '标题',
      type: 'text',
      required: true,
    },
    {
      code: 'amount',
      name: '金额',
      type: 'double',
      required: true,
    },
    {
      code: 'costCategory',
      name: '成本类型',
      type: 'relation',
      targetSingularCode: "pm_project_cost_category",
      targetIdColumnName: "cost_category_id",
    },
    {
      code: 'paymentTime',
      name: '付款时间',
      type: 'datetime',
    },
  ],
};

export default entity;

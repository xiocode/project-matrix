import type { TDictionaryCodes } from '../../meta/data-dictionary-codes';
import type { TEntitySingularCodes } from '../../meta/model-codes';
import type { RapidEntity } from '@ruiapp/rapid-extension';

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: 'app',
  code: 'PmProject',
  name: '项目',
  fields: [
    {
      code: 'code',
      name: '编号',
      type: 'text',
      required: true,
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
      code: 'category',
      name: '项目类型',
      type: 'relation',
      targetSingularCode: "pm_project_category",
      targetIdColumnName: "category_id",
    },
    {
      code: 'customer',
      name: '客户',
      type: 'relation',
      targetSingularCode: "base_partner",
      targetIdColumnName: "customer_id",
    },
    {
      code: 'stage',
      name: '当前阶段',
      required: true,
      type: 'option',
      dataDictionary: 'PmProjectStage',
    },
    {
      code: 'state',
      name: '状态',
      required: true,
      type: 'option',
      dataDictionary: 'PmProjectState',
    },
    {
      code: 'owner',
      name: '负责人',
      type: 'relation',
      targetSingularCode: "oc_user",
      targetIdColumnName: "owner_id",
    },
    {
      code: 'salesman',
      name: '销售',
      type: 'relation',
      targetSingularCode: "oc_user",
      targetIdColumnName: "salesman_id",
    },
    {
      code: 'projectManager',
      name: '项目经理',
      type: 'relation',
      targetSingularCode: "oc_user",
      targetIdColumnName: "project_manager_id",
    },
    {
      code: 'distributor',
      name: '经销商',
      type: 'relation',
      targetSingularCode: "base_partner",
      targetIdColumnName: "distributor_id",
    },
  ],
};

export default entity;

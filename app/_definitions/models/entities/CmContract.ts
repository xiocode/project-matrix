import type { TDictionaryCodes } from '../../meta/data-dictionary-codes';
import type { TEntitySingularCodes } from '../../meta/model-codes';
import type { RapidEntity } from '@ruiapp/rapid-extension';

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: 'app',
  code: 'CmContract',
  name: '合同',
  fields: [
    {
      code: 'code',
      name: '编号',
      type: 'text',
      required: false,
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
      code: 'project',
      name: '所属项目',
      type: 'relation',
      targetSingularCode: "pm_project",
      targetIdColumnName: "project_id",
    },
    {
      code: 'salesman',
      name: '销售',
      type: 'relation',
      targetSingularCode: "oc_user",
      targetIdColumnName: "salesman_id",
    },
    {
      code: 'totalAmount',
      name: '合同金额',
      type: 'integer',
      required: true,
    },
    {
      code: 'state',
      name: '状态',
      required: true,
      type: 'option',
      dataDictionary: 'CmContractState',
    },
  ],
};

export default entity;

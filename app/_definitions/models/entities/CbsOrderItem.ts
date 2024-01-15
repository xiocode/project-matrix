import type { TDictionaryCodes } from '../../meta/data-dictionary-codes';
import type { TEntitySingularCodes } from '../../meta/model-codes';
import type { RapidEntity } from '@ruiapp/rapid-extension';

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: 'app',
  code: 'CbsOrderItem',
  name: '订单项',
  fields: [
    {
      code: 'order',
      name: '订单',
      type: 'relation',
      targetSingularCode: "cbs_order",
      targetIdColumnName: "order_id",
      required: true,
    },
    {
      code: 'orderNum',
      name: '排序号',
      type: 'integer',
      required: true,
      defaultValue: '0',
    },
    {
      code: 'subject',
      name: '产品/服务',
      type: 'relation',
      targetSingularCode: "base_material",
      targetIdColumnName: "subject_id",
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
      code: 'price',
      name: '单价',
      type: 'integer',
      required: true,
    },
    {
      code: 'quantity',
      name: '数量',
      type: 'integer',
      required: true,
    },
    {
      code: 'unit',
      name: '单位',
      type: 'relation',
      targetSingularCode: 'base_unit',
      targetIdColumnName: 'unit_id',
    },
    {
      code: 'taxRate',
      name: '税率',
      type: 'integer',
      required: true,
    },
  ],
};

export default entity;

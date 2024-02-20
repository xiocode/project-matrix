import type { TDictionaryCodes } from '../../meta/data-dictionary-codes';
import type { TEntitySingularCodes } from '../../meta/model-codes';
import type { RapidEntity } from '@ruiapp/rapid-extension';

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: 'mom',
  code: 'MomEquipmentCategory',
  name: '设备分类',
  fields: [
    {
      code: 'name',
      name: '名称',
      type: 'text',
    },
    {
      code: 'orderNum',
      name: '排序号',
      type: 'integer',
    },
    {
      code: 'parent',
      name: '上级分类',
      type: 'relation',
      targetSingularCode: 'mom_equipment_category',
      targetIdColumnName: 'category_id',
    },
    {
      code: 'equipments',
      name: '设备',
      type: 'relation[]',
      targetSingularCode: 'mom_equipment',
      selfIdColumnName: 'category_id',
    },
  ],
};

export default entity;

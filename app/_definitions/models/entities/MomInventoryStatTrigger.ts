import type { TDictionaryCodes } from '../../meta/data-dictionary-codes';
import type { TEntitySingularCodes } from '../../meta/model-codes';
import type { RapidEntity } from '@ruiapp/rapid-extension';

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: 'mom',
  code: 'MomInventoryStatTrigger',
  name: '物品库存统计触发配置',
  description: '配置在哪些条件下触发库存量统计，更新哪些数量统计字段。',
  fields: [
    {
      code: 'name',
      name: '名称',
      type: 'text',
    },
    {
      code: 'config',
      name: '配置',
      type: 'json',
    },
  ],
};

export default entity;

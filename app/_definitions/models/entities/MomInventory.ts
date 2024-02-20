import type { TDictionaryCodes } from '../../meta/data-dictionary-codes';
import type { TEntitySingularCodes } from '../../meta/model-codes';
import type { RapidEntity } from '@ruiapp/rapid-extension';

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: 'mom',
  code: 'MomInventory',
  name: '物品库存',
  description: '记录某一种物品的数量',
  fields: [
    {
      code: 'material',
      name: '物品',
      type: 'relation',
      targetSingularCode: 'base_material',
      targetIdColumnName: 'material_id',
    },
    {
      code: 'allocableQuantity',
      name: '可分配数量',
      description: '可分配数量，包括已采购、在途和在库但未被预定以及在库但未被分配的数量。',
      type: 'double',
    },
    {
      code: 'availableQuantity',
      name: '可用数量',
      description: '可用数量，包括在库但未被预定以及在库但未被分配的数量。',
      type: 'double',
    },
    {
      code: 'purchasedQuantity',
      name: '已采购数量',
      description: '已经下单购买但还未发货的数量',
      type: 'double',
    },
    {
      code: 'intransitQuantity',
      name: '在途数量',
      description: '采购在途数量',
      type: 'double',
    },
    {
      code: 'instockQuantity',
      name: '在库数量',
      description: '在仓库中的数量，包括已被预订和已经被分配的数量。',
      type: 'double',
    },
    {
      code: 'processingQuantity',
      name: '加工中数量',
      description: '加工过程中的投入物料数量。物料可能在线边等待加工，也可能已经加工完成但未报工。',
      type: 'double',
    },
    {
      code: 'processedQuantity',
      name: '已加工数量',
      description: '已加工完成，并且进行了报工的投入物料数量。',
      type: 'double',
    },
    {
      code: 'yieldQuantity',
      name: '已产出数量',
      description: '已加工完成，并且进行了报工的产出物料数量。',
      type: 'double',
    },
    {
      code: 'reservedQuantity',
      name: '已预定数量',
      type: 'double',
      description: '已经被客户预定的成品数量；或者已经创建生产计划但还在审核中的物料需求数量。已预定数量和在库数量无关，在库数量不一定大于等于已预定数量。生产计划或者订单审核通过，应该扣减掉对应的已预定数量，增加对应的已分配数量。',
    },
    {
      code: 'allocatedQuantity',
      name: '已分配数量',
      type: 'double',
      description: '客户已经下单购买但还没有运达的成品数量；或者已经生产计划已经审核通过但还未领料的数量。已分配数量和在库数量无关，在库数量不一定大于等于已分配数量。一旦订单开始发货，或者做了生产领料，应该扣减掉对应的已分配数量',
    },
    {
      code: 'shippingQuantity',
      name: '已发货数量',
      description: '正在发往客户途中的数量。一旦运达，应该扣减相应的已发货数量，增加相应的已交付数量。',
      type: 'double',
    },
    {
      code: 'deliveredQuantity',
      name: '已交付数量',
      description: '已交付客户的数量。',
      type: 'double',
    },
    {
      code: 'unit',
      name: '单位',
      type: 'relation',
      targetSingularCode: 'base_unit',
      targetIdColumnName: 'unit_id',
    },
    {
      code: 'labels',
      name: '标签',
      type: 'relation[]',
      targetSingularCode: 'mom_inventory_label',
      selfIdColumnName: 'inventory_id',
    },
  ],
};

export default entity;

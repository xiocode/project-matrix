import type { TDictionaryCodes } from "../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "mom",
  code: "MomGoodShelve",
  name: "物品上架记录",
  description: "物品上架的历史记录",
  fields: [
    {
      code: "operation",
      name: "操作记录",
      type: "relation",
      targetSingularCode: "mom_inventory_operation",
      targetIdColumnName: "operation_id",
    },
    {
      code: "good_transfer",
      name: "货品移动记录",
      type: "relation",
      targetSingularCode: "mom_good_transfer",
      targetIdColumnName: "good_transfer_id",
    },
    {
      code: "good",
      name: "物品",
      type: "relation",
      targetSingularCode: "mom_good",
      targetIdColumnName: "good_id",
    },
    {
      code: "trackingCode",
      name: "跟踪码",
      type: "text",
    },
    {
      code: "material",
      name: "物品",
      type: "relation",
      targetSingularCode: "base_material",
      targetIdColumnName: "material_id",
    },
    {
      code: "palletNum",
      name: "托盘号",
      type: "text",
    },
    {
      code: "lotNum",
      name: "批号",
      type: "text",
    },
    {
      code: "binNum",
      name: "箱号",
      type: "text",
    },
    {
      code: "serialNum",
      name: "序列号",
      type: "text",
    },
    {
      code: "tags",
      name: "标签",
      type: "text",
    },
    {
      code: "printStatus",
      name: "打印状态",
      type: "boolean",
    },
    {
      code: "quantity",
      name: "数量",
      type: "double",
      required: true,
    },
    {
      code: "unit",
      name: "单位",
      type: "relation",
      targetSingularCode: "base_unit",
      targetIdColumnName: "unit_id",
    },
    {
      code: "from",
      name: "转出位置",
      type: "relation",
      targetSingularCode: "base_location",
      targetIdColumnName: "from_location_id",
    },
    {
      code: "to",
      name: "转入位置",
      type: "relation",
      targetSingularCode: "base_location",
      targetIdColumnName: "to_location_id",
    },
    {
      code: "transferTime",
      name: "转移时间",
      type: "datetime",
    },
    {
      code: "printTime",
      name: "打印时间",
      type: "datetime",
    },
  ],
};

export default entity;

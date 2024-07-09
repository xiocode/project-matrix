import type {TDictionaryCodes} from "../../meta/data-dictionary-codes";
import type {TEntitySingularCodes} from "../../meta/model-codes";
import type {RapidEntity} from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "mom",
  code: "MomInventoryCheckRecord",
  name: "库存盘点记录",
  description: "库存盘点记录",
  fields: [
    {
      code: "operation",
      name: "操作记录",
      type: "relation",
      targetSingularCode: "mom_inventory_operation",
      targetIdColumnName: "operation_id",
    },
    {
      code: "orderNum",
      name: "排序号",
      type: "integer",
      required: true,
      defaultValue: "0",
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
      code: "location",
      name: "位置",
      type: "relation",
      targetSingularCode: "base_location",
      targetIdColumnName: "location_id",
    },
    {
      code: "packageNum",
      name: "包数",
      type: "text",
    },
    {
      code: "manufactureDate",
      name: "生产日期",
      type: "datetime",
    },
    {
      code: "validityDate",
      name: "有效期至",
      type: "datetime",
    },
    {
      code: "lot",
      name: "批次信息",
      type: "relation",
      targetSingularCode: "base_lot",
      targetIdColumnName: "lot_id",
    },
  ],
};

export default entity;

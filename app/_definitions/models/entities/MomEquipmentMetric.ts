import type { TDictionaryCodes } from "../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "mom",
  code: "MomEquipmentMetric",
  name: "设备采集参数",
  fields: [
    {
      code: "factory",
      name: "工厂",
      type: "relation",
      targetSingularCode: "mom_factory",
      targetIdColumnName: "factory_id",
    },
    {
      code: "equipment",
      name: "设备",
      type: "relation",
      targetSingularCode: "mom_equipment",
      targetIdColumnName: "equipment_id",
    },
    {
      code: "process",
      name: "工序",
      type: "relation",
      targetSingularCode: "mom_process",
      targetIdColumnName: "process_id",
    },
    {
      code: "workOrder",
      name: "生产工单",
      type: "relation",
      targetSingularCode: "mom_work_order",
      targetIdColumnName: "work_order_id",
    },
    {
      code: "workReport",
      name: "生产报工",
      type: "relation",
      targetSingularCode: "mom_work_report",
      targetIdColumnName: "work_report_id",
    },
    {
      code: "dimension",
      name: "采集参数",
      type: "relation",
      targetSingularCode: "mom_equipment_dimension",
      targetIdColumnName: "dimension_id",
    },
    {
      code: "nominal",
      name: "标准值",
      type: "double",
    },
    {
      code: "upperLimit",
      name: "上限值",
      type: "double",
    },
    {
      code: "lowerLimit",
      name: "下限值",
      type: "double",
    },
    {
      code: "lowerLimit",
      name: "下限值",
      type: "double",
    },
    {
      code: "value",
      name: "实际值",
      type: "double",
    },
    {
      code: "isOutSpecification",
      name: "是否超标",
      type: "boolean",
    },
  ],
};

export default entity;

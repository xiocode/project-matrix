import type { TDictionaryCodes } from "../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "mom",
  code: "MomInspectionSheet",
  name: "检验单",
  description: "记录对一个或多个样本使用某个检验规则进行的一次检验，包含被检测样本的信息以及本次检验产生的多条检验记录和缺陷记录。",
  fields: [
    {
      code: "code",
      name: "检验单号",
      type: "text",
    },
    {
      code: "state",
      name: "检验单状态",
      type: "option",
      dataDictionary: "MomInspectionSheetState",
    },
    {
      code: "result",
      name: "检验结果",
      type: "option",
      dataDictionary: "InspectionResult",
    },
    {
      code: "material",
      name: "物品",
      type: "relation",
      targetSingularCode: "base_material",
      targetIdColumnName: "material_id",
    },
    {
      code: "materialCode",
      name: "物料号",
      type: "text",
    },
    {
      code: "lotNum",
      name: "批号",
      type: "text",
    },
    {
      code: "serialNum",
      name: "序列号",
      type: "text",
    },
    {
      code: "sampleCount",
      name: "样本数量",
      type: "integer",
      defaultValue: "1",
    },
    {
      code: "workOrder",
      name: "生产工单",
      type: "relation",
      targetSingularCode: "mom_work_order",
      targetIdColumnName: "work_order_id",
    },
    {
      code: "workTrack",
      name: "生产流转单",
      type: "relation",
      targetSingularCode: "mom_work_track",
      targetIdColumnName: "work_track_id",
    },
    {
      code: "workTask",
      name: "生产任务",
      type: "relation",
      targetSingularCode: "mom_work_task",
      targetIdColumnName: "work_task_id",
    },
    {
      code: "rule",
      name: "检验规则",
      type: "relation",
      targetSingularCode: "mom_inspection_rule",
      targetIdColumnName: "rule_id",
    },
    {
      code: "routeProcess",
      name: "生产工序",
      type: "relation",
      targetSingularCode: "mom_route_process",
      targetIdColumnName: "route_process_id",
    },
    {
      code: "sender",
      name: "送检人",
      type: "relation",
      targetSingularCode: "base_employee",
      targetIdColumnName: "sender_id",
    },
    {
      code: "inspector",
      name: "检验员",
      type: "relation",
      targetSingularCode: "base_employee",
      targetIdColumnName: "inspector_id",
    },
    {
      code: "reviewer",
      name: "审核人",
      type: "relation",
      targetSingularCode: "base_employee",
      targetIdColumnName: "reviewer_id",
    },
    {
      code: "measurements",
      name: "检验记录",
      type: "relation[]",
      targetSingularCode: "mom_inspection_measurement",
      selfIdColumnName: "sheet_id",
    },
    {
      code: "defectStats",
      name: "缺陷统计",
      type: "relation[]",
      targetSingularCode: "mom_inspection_defect_stat",
      selfIdColumnName: "sheet_id",
    },
  ],
};

export default entity;

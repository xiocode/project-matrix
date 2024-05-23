import type { TDictionaryCodes } from "../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "mom",
  code: "MomAssemblyMain",
  name: "组装主体记录",
  fields: [
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
      code: "route",
      name: "工艺路线",
      type: "relation",
      targetSingularCode: "mom_route",
      targetIdColumnName: "route_id",
    },
    {
      code: "routeProcess",
      name: "生产工序",
      type: "relation",
      targetSingularCode: "mom_route_process",
      targetIdColumnName: "route_process_id",
    },
    {
      code: "mainMaterial",
      name: "主物料",
      type: "relation",
      targetSingularCode: "base_material",
      targetIdColumnName: "main_material_id",
    },
    {
      code: "mainMaterialCode",
      name: "主物料号",
      type: "text",
    },
    {
      code: "mainLotNum",
      name: "批号",
      type: "text",
    },
    {
      code: "mainSerialNum",
      name: "序列号",
      type: "text",
    },
    {
      code: "parts",
      name: "零件",
      type: "relation[]",
      targetSingularCode: "mom_assembly_part",
      selfIdColumnName: "main_id",
    },
  ],
};

export default entity;

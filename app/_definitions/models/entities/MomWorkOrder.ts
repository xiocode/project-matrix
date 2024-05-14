import type { PropertySequenceConfig } from "@ruiapp/rapid-core";
import type { TDictionaryCodes } from "../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "mom",
  code: "MomWorkOrder",
  name: "生产工单",
  description: "管理生产工单/生产订单/生产指令单。一个生产工单可以包含一种产出物。",
  fields: [
    {
      code: "code",
      name: "工单号",
      type: "text",
      config: {
        sequence: {
          autoGenerate: true,
          ruleConfig: {
            segments: [
              {
                type: "literal",
                content: "W"
              },
              {
                type: "year",
                length: 4,
              },
              {
                type: "month",
                length: 2,
                padding: "0",
              },
              {
                type: "dayOfMonth",
                length: 2,
                padding: "0",
              },
              {
                type: "autoIncrement",
                scope: "",
                period: "day",
                length: 3,
              },
            ],
          },
        } satisfies PropertySequenceConfig,
      },
    },
    {
      code: "mrp",
      name: "物料需求计划",
      type: "relation",
      targetSingularCode: "mom_manufacturing_resource_plan",
      targetIdColumnName: "mrp_id",
    },
    {
      code: "material",
      name: "物品",
      type: "relation",
      targetSingularCode: "base_material",
      targetIdColumnName: "material_id",
    },
    {
      code: "tags",
      name: "标签",
      type: "text",
    },
    {
      code: "route",
      name: "工艺路线",
      type: "relation",
      targetSingularCode: "mom_route",
      targetIdColumnName: "route_id",
    },
    {
      code: "quantity",
      name: "数量",
      type: "double",
    },
    {
      code: "unit",
      name: "单位",
      type: "relation",
      targetSingularCode: "base_unit",
      targetIdColumnName: "unit_id",
    },
    {
      code: "assignmentState",
      name: "分配状态",
      type: "option",
      dataDictionary: "MomWorkOrderAssignmentState",
    },
    {
      code: "executionState",
      name: "执行状态",
      type: "option",
      dataDictionary: "MomWorkOrderExecutionState",
    },
    {
      code: "scheduledStartDate",
      name: "计划开始日期",
      type: "date",
    },
    {
      code: "scheduledFinishDate",
      name: "计划完成日期",
      type: "date",
    },
    {
      code: "actualStartDate",
      name: "实际开始日期",
      type: "date",
    },
    {
      code: "actualFinishDate",
      name: "实际完成日期",
      type: "date",
    },
    {
      code: "productionTasks",
      name: "生产任务",
      type: "relation[]",
      targetSingularCode: "mom_work_task",
      selfIdColumnName: "work_order_id",
    },
    {
      code: "workReports",
      name: "生产报工单",
      type: "relation[]",
      targetSingularCode: "mom_work_report",
      selfIdColumnName: "work_order_id",
    },
    {
      code: "inspectionSheets",
      name: "检验单",
      type: "relation[]",
      targetSingularCode: "mom_inspection_sheet",
      selfIdColumnName: "work_task_id",
    },
  ],
};

export default entity;

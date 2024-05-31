import type { TDictionaryCodes } from "../../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "app",
  code: "PmProjectBudget",
  name: "项目预算",
  fields: [
    {
      code: "project",
      name: "项目",
      type: "relation",
      targetSingularCode: "pm_project",
      targetIdColumnName: "project_id",
      required: true,
    },
    {
      code: "orderNum",
      name: "排序号",
      type: "integer",
      required: true,
      defaultValue: "0",
    },
    {
      code: "type",
      name: "类型",
      required: true,
      type: "option",
      dataDictionary: "PmBudgetType",
    },
    {
      code: "title",
      name: "标题",
      type: "text",
      required: true,
    },
    {
      code: "subject",
      name: "产品/服务",
      type: "relation",
      targetSingularCode: "base_material",
      targetIdColumnName: "subject_id",
    },
    {
      code: "cost",
      name: "成本单价",
      type: "double",
      required: true,
    },
    {
      code: "price",
      name: "单价",
      type: "double",
      required: true,
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
      code: "taxRate",
      name: "税率",
      type: "double",
      required: true,
    },
    {
      code: "businessCategory",
      name: "业务类型",
      type: "relation",
      targetSingularCode: "fin_business_category",
      targetIdColumnName: "business_category_id",
    },
    {
      code: "expenseCategory",
      name: "费用类型",
      type: "relation",
      targetSingularCode: "fin_expense_category",
      targetIdColumnName: "expense_category_id",
    },
    {
      code: "scheduledPaymentDate",
      name: "计划付款日期",
      type: "date",
    },
  ],
};

export default entity;

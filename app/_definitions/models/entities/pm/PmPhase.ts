import type { TDictionaryCodes } from "../../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "app",
  code: "PmPhase",
  name: "阶段",
  fields: [
    {
      code: "project",
      name: "项目",
      type: "relation",
      targetSingularCode: "pm_project",
      targetIdColumnName: "project_id",
    },
    {
      code: "name",
      name: "名称",
      type: "text",
      required: true,
    },
    {
      code: "description",
      name: "描述",
      type: "text",
    },
    {
      code: "startDate",
      name: "计划开始日期",
      type: "date",
    },
    {
      code: "endDate",
      name: "计划结束日期",
      type: "date",
    },
    {
      code: "state",
      name: "状态",
      type: "option",
      dataDictionary: "PmPhaseState",
    },
    {
      code: "actualStartedAt",
      name: "实际开始日期",
      type: "date",
    },
    {
      code: "actualCompletedAt",
      name: "实际完成日期",
      type: "date",
    },
  ],
};

export default entity;

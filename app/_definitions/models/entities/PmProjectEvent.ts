import type { TDictionaryCodes } from "../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "app",
  code: "PmProjectEvent",
  name: "项目事件",
  fields: [
    {
      code: "project",
      name: "项目",
      type: "relation",
      targetSingularCode: "pm_project",
      targetIdColumnName: "project_id",
    },
    {
      code: "title",
      name: "标题",
      type: "text",
      required: true,
    },
    {
      code: "content",
      name: "描述",
      type: "text",
    },
  ],
};

export default entity;

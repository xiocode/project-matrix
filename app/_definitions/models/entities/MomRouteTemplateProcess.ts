import type { TDictionaryCodes } from "../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "mom",
  code: "MomRouteTemplateProcess",
  name: "工艺流程模板工序",
  fields: [
    {
      code: "routeTemplate",
      name: "工艺流程模板",
      type: "relation",
      required: true,
      targetSingularCode: "mom_route_template",
      targetIdColumnName: "route_template_id",
    },
    {
      code: "process",
      name: "工序",
      type: "relation",
      required: true,
      targetSingularCode: "mom_process",
      targetIdColumnName: "process_id",
    },
    {
      code: "standardCycleTime",
      name: "标准周期时间",
      type: "integer",
      description: "以秒为单位",
    },
  ],
};

export default entity;

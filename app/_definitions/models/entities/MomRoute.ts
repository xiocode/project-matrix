import type { TDictionaryCodes } from "../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "mom",
  code: "MomRoute",
  name: "工艺流程",
  description: "工艺流程 / 工艺路线 / 生产流程",
  fields: [
    {
      code: "material",
      name: "物料",
      type: "relation",
      targetSingularCode: "base_material",
      targetIdColumnName: "material_id",
    },
    {
      code: "version",
      name: "版本",
      type: "text",
      required: true,
    },
    {
      code: "state",
      name: "状态",
      type: "option",
      dataDictionary: "EnabledDisabledState",
      required: true,
    },
    {
      code: "publishState",
      name: "发布状态",
      type: "option",
      dataDictionary: "PublishState",
      required: true,
      defaultValue: "'draft'",
    },
    {
      code: "processes",
      name: "工序",
      type: "relation[]",
      targetSingularCode: "mom_route_process",
      selfIdColumnName: "route_id",
    },
  ],
};

export default entity;

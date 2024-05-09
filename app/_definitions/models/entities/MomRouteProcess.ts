import type { TDictionaryCodes } from "../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "mom",
  code: "MomRouteProcess",
  name: "工序",
  fields: [
    {
      code: "route",
      name: "工艺流程",
      type: "relation",
      required: true,
      targetSingularCode: "mom_route",
      targetIdColumnName: "route_id",
    },
    {
      code: "orderNum",
      name: "排序号",
      type: "integer",
      required: true,
    },
    {
      code: "process",
      name: "生产工序",
      type: "relation",
      required: true,
      targetSingularCode: "mom_process",
      targetIdColumnName: "process_id",
    },
    {
      code: "aliasName",
      name: "工序别名",
      type: "text",
    },
    {
      code: "inputs",
      name: "输入物料",
      type: "relation[]",
      targetSingularCode: "mom_route_process_input",
      selfIdColumnName: "route_process_id",
    },
    {
      code: "outputs",
      name: "输出物料",
      type: "relation[]",
      targetSingularCode: "mom_route_process_output",
      selfIdColumnName: "route_process_id",
    },
    {
      code: "standardCycleTime",
      name: "标准周期时间",
      type: "integer",
      description: "以秒为单位",
    },
    {
      code: "config",
      name: "配置",
      type: "json",
    },
  ],
};

export default entity;

import type { TDictionaryCodes } from "../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "mom",
  code: "MomProcess",
  name: "工序",
  fields: [
    {
      code: "code",
      name: "Code",
      type: "text",
    },
    {
      code: "name",
      name: "名称",
      type: "text",
      required: true,
    },
    {
      code: "category",
      name: "工序类型",
      type: "relation",
      targetSingularCode: "mom_process_category",
      targetIdColumnName: "category_id",
    },
    {
      code: "orderNum",
      name: "排序号",
      type: "integer",
      required: true,
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

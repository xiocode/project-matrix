import type { TDictionaryCodes } from "../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "mom",
  code: "MomInventoryStatTable",
  name: "库存统计表配置",
  description: "配置物品库存统计表的编号、分组字段、数量统计字段",
  fields: [
    {
      code: "name",
      name: "名称",
      type: "text",
    },
    {
      code: "config",
      name: "配置",
      type: "json",
    },
  ],
};

export default entity;

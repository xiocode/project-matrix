import type { TDictionaryCodes } from "../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "mom",
  code: "MomInventoryLabel",
  name: "库存标签",
  description: "对库存数量记录的同一种物品进行区分，比如区分检验状态、品质等级等。",
  fields: [
    {
      code: "inventory",
      name: "库存记录",
      type: "relation",
      targetSingularCode: "mom_inventory",
      targetIdColumnName: "inventory_id",
    },
    {
      code: "name",
      name: "标签名",
      type: "text",
      required: true,
    },
    {
      code: "textValue",
      name: "值",
      type: "text",
    },
    {
      code: "numberValue",
      name: "值",
      type: "double",
    },
  ],
};

export default entity;

import type { TDictionaryCodes } from "../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "mom",
  code: "MomPackage",
  name: "物品包",
  fields: [
    {
      code: "code",
      name: "数量",
      type: "text",
    },
    {
      code: "goods",
      name: "物品",
      type: "relation[]",
      targetSingularCode: "mom_good",
      selfIdColumnName: "package_id",
    },
  ],
};

export default entity;

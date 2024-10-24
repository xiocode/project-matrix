import type { TDictionaryCodes } from "../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "mom",
  code: "HuateWarehouseOperation",
  name: "华特出库登记",
  fields: [
    {
      code: "factory",
      name: "工厂",
      type: "relation",
      targetSingularCode: "mom_factory",
      targetIdColumnName: "factory_id",
    },
    {
      code: "material",
      name: "物料",
      type: "relation",
      targetSingularCode: "base_material",
      targetIdColumnName: "material_id",
    },
    {
      code: "quantity",
      name: "出库数量",
      type: "float",
    },
  ],
};

export default entity;

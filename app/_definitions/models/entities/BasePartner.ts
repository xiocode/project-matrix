import type { TDictionaryCodes } from "../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "app",
  code: "BasePartner",
  name: "合作伙伴",
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
      code: "categories",
      name: "分类",
      type: "relation[]",
      targetSingularCode: "base_partner_category",
      linkTableName: "base_partner_partner_category_link",
      targetIdColumnName: "category_id",
      selfIdColumnName: "partner_id",
    },
  ],
};

export default entity;

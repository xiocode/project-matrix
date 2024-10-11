import type { TDictionaryCodes } from "../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  metaOnly: true,
  namespace: "sys",
  code: "YidaConfig",
  name: "YidaConfig",
  tableName: "yida_config",
  fields: [
    {
      code: "yida_api_endpoint",
      name: "API Endpoint",
      type: "text",
    },
    {
      code: "dingtalk_api_endpoint",
      name: "API Endpoint",
      type: "text",
    },
    {
      code: "client_id",
      name: "client_id",
      type: "text",
    },
    {
      code: "client_secret",
      name: "client_secret",
      type: "text",
    },
    {
      code: "uid",
      name: "uid",
      type: "integer",
    },
    {
      code: "access_token",
      name: "access_token",
      type: "text",
      required: false,
    },
    {
      code: "access_token_expire_in",
      name: "access_token_expire_in",
      type: "integer",
      required: true,
    },
  ],
};

export default entity;

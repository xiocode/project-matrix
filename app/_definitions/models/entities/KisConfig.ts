import type { TDictionaryCodes } from "../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  metaOnly: true,
  namespace: "sys",
  code: "KisConfig",
  name: "KisConfig",
  tableName: "kis_config",
  fields: [
    {
      code: "api_endpoint",
      name: "API Endpoint",
      type: "text",
      required: true,
    },
    {
      code: "client_id",
      name: "client_id",
      type: "text",
      required: true,
    },
    {
      code: "client_secret",
      name: "client_secret",
      type: "text",
      required: false,
    },
    {
      code: "uid",
      name: "uid",
      type: "integer",
      required: true,
    },
    {
      code: "session_id",
      name: "session_id",
      type: "text",
      required: true,
    },
    {
      code: "access_token",
      name: "access_token",
      type: "text",
      required: false,
    },
    {
      code: "auth_data",
      name: "auth_data",
      type: "text",
      required: true,
    },
    {
      code: "refresh_auth_data_token",
      name: "refresh_auth_data_token",
      type: "text",
      required: true,
    },
    {
      code: "auth_data",
      name: "auth_data",
      type: "text",
      required: true,
    },
    {
      code: "gateway_router_addr",
      name: "gateway_router_addr",
      type: "text",
      required: true,
    },
    {
      code: "session_id_expire_in",
      name: "session_id_expire_in",
      type: "integer",
      required: true,
    },
    {
      code: "access_token_expire_in",
      name: "access_token_expire_in",
      type: "integer",
      required: true,
    },
    {
      code: "refresh_auth_data_token_expire_in",
      name: "refresh_auth_data_token_expire_in",
      type: "integer",
      required: true,
    },
    {
      code: "updated_at",
      name: "updated_at",
      type: "datetime",
      required: true,
    },
  ],
};

export default entity;

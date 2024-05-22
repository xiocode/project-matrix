import {IRpdServer} from "@ruiapp/rapid-core";
import KingdeeSDK from "~/sdk/kis/api";

class KisHelper {
  private server: IRpdServer;

  constructor(server: IRpdServer) {
    this.server = server;
  }

  public async NewAPIClient() {
    const kisConfigManager = this.server.getEntityManager("kis_config");
    const ksc = await kisConfigManager.findEntity({});

    return new KingdeeSDK({
      baseURL: ksc.api_endpoint,
      clientId: ksc.client_id,
      clientSecret: ksc.client_secret,
      accessToken: ksc.access_token,
      accessTokenExpireIn: ksc.access_token_expire_in,
      sessionId: ksc.session_id,
      sessionIdExpireIn: ksc.session_id_expire_in,
      authData: ksc.auth_data,
      refreshAuthDataToken: ksc.refresh_auth_data_token,
      refreshAuthDataTokenExpireIn: ksc.refresh_auth_data_token_expire_in,
      gatewayRouterAddr: ksc.gateway_router_addr,
    });
  }

}

export default KisHelper;

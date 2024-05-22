import type {ActionHandlerContext, CronJobConfiguration, IRpdServer} from "@ruiapp/rapid-core";
import KingdeeSDK from "~/sdk/kis/api";

export default {
  code: "kis-update-tokens-job",

  cronTime: "* * * * *",

  async handler(ctx: ActionHandlerContext) {
    const {server, logger} = ctx;
    // handle kis config
    await refreshKisTokens(server);

    logger.info("Finished kis update tokens job...");
  },
} satisfies CronJobConfiguration;


// handle kis config
async function refreshKisTokens(server: IRpdServer) {
  const kisConfigManager = server.getEntityManager("kis_config");

  const ksc = await kisConfigManager.findEntity({});

  const kis = new KingdeeSDK({
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


  await kis.ensureTokensAreValid()

  // update kis config


  const result = await kisConfigManager.updateEntityById({
    id: ksc.id,
    entityToSave: {
      access_token: kis.accessToken,
      access_token_expire_in: kis.accessTokenExpireIn,
      auth_data: kis.authData,
      refresh_auth_data_token: kis.refreshAuthDataToken,
      refresh_auth_data_token_expire_in: kis.refreshAuthDataTokenExpireIn,
      session_id: kis.sessionId,
      session_id_expire_in: kis.sessionIdExpireIn,
      gateway_router_addr: kis.gatewayRouterAddr,
    }
  })

  console.log(result)
}

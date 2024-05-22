import type {ActionHandlerContext, CronJobConfiguration, IRpdServer} from "@ruiapp/rapid-core";
import KisDataSync from "~/sdk/kis/sync";

export default {
  code: "kis-sync-data-job",

  cronTime: "*/5 * * * *",

  async handler(ctx: ActionHandlerContext) {
    const {server, logger} = ctx;
    logger.info("Executing kis data sync job...");

    // await syncKisData(server);

    logger.info("Finished kis data sync job...");
  },
} satisfies CronJobConfiguration;

async function syncKisData(server: IRpdServer) {
  const dataSync = new KisDataSync(server);
  await dataSync.initialize();
  await dataSync.syncAll();

}

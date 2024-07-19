import type {ActionHandlerContext, CronJobConfiguration, IRpdServer} from "@ruiapp/rapid-core";
import KisDataSync from "~/sdk/kis/sync";

export default {
  code: "kis-sync-inventory-notify-job",

  cronTime: "05 14 * * *",

  async handler(ctx: ActionHandlerContext) {
    const {server, logger} = ctx;
    logger.info("Executing kis inventory notify sync job...");

    // await syncKisInventoryNotify(ctx, server);

    logger.info("Finished kis inventory notify sync job...");
  },
} satisfies CronJobConfiguration;

async function syncKisInventoryNotify(ctx: ActionHandlerContext, server: IRpdServer) {
  const dataSync = new KisDataSync(server, ctx);
  await dataSync.initialize();
  await dataSync.syncBaseData();
  await dataSync.syncInventoryNotify();

}

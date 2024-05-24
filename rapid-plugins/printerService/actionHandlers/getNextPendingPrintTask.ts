import type { ActionHandlerContext } from "@ruiapp/rapid-core";
import type PrinterPlugin from "../PrinterPlugin";
import type { GetNextPendingPrintTaskInput } from "../PrinterPluginTypes";


const cometWaitingSeconds = 30;
const COMET_WAITING_MS = cometWaitingSeconds * 1000;


export const code = "getNextPendingPrintTask";

export type GetNextPendingPrintTaskActionHandlerConfig = {
}

export async function handler(
  plugin: PrinterPlugin,
  ctx: ActionHandlerContext,
  config: GetNextPendingPrintTaskActionHandlerConfig,
) {
  const input: GetNextPendingPrintTaskInput = ctx.input;

  return new Promise((resolve, reject) => {
    let beginTime = new Date();
    async function tryResponseFirstTask() {
      const task = await plugin.printerService.getNextPendingPrintTask(input);
      if (task) {
        ctx.output = task;
        resolve(true);
        return;
      }

      if (((new Date() as any) - (beginTime as any)) > COMET_WAITING_MS) {
        ctx.routerContext.json(null, 200);
        resolve(false);
      } else {
        setTimeout(tryResponseFirstTask, 1000);
      }
    }

    tryResponseFirstTask();
  });
}

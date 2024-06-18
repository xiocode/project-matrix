import type { ActionHandlerContext } from "@ruiapp/rapid-core";
import type PrinterPlugin from "../BpmPlugin";
import type { CreateProcessInstanceInput } from "../BpmPluginTypes";

export const code = "createProcessInstance";

export type CreatePrintTasksActionHandlerConfig = {
}

export async function handler(
  plugin: PrinterPlugin,
  ctx: ActionHandlerContext,
  config: CreatePrintTasksActionHandlerConfig,
) {
  const input: CreateProcessInstanceInput = ctx.input;

  const processInstance = await plugin.bpmService.createProcessInstance(input);

  ctx.output = processInstance;
}

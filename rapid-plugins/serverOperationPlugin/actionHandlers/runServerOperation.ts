import type { RapidPlugin, ActionHandlerContext } from "@ruiapp/rapid-core";

export const code = "runServerOperation";

export async function handler(
  plugin: RapidPlugin,
  ctx: ActionHandlerContext,
  options: {
    operation: (ctx: ActionHandlerContext) => Promise<void>;
  },
) {
  const { operation } = options;
  await operation(ctx);
}

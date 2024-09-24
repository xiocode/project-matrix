import type {ActionHandlerContext, ServerOperation} from "@ruiapp/rapid-core";

export type DeviceInput = {
  macAddr: string;
};

export default {
  code: "deviceBootstrap",
  method: "POST",
  async handler(ctx: ActionHandlerContext) {
    const { server } = ctx;
    const input: DeviceInput = ctx.input;

    ctx.output = {
      result: ctx.input,
    };
  },
} satisfies ServerOperation;

import type {ActionHandlerContext, ServerOperation} from "@ruiapp/rapid-core";

export type CallbackInput = {
  machine: any,
  runtimeFields: any
  activityFields: any
  attributeFields: any
};

export default {
  code: "callback",
  method: "POST",
  async handler(ctx: ActionHandlerContext) {
    const { server } = ctx;
    const input: CallbackInput = ctx.input;


  },
} satisfies ServerOperation;

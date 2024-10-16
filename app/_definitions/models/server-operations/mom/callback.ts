import type {ActionHandlerContext, ServerOperation} from "@ruiapp/rapid-core";

export type CallbackInput = {
};

export default {
  code: "callback",
  method: "POST",
  async handler(ctx: ActionHandlerContext) {
    const { server } = ctx;
    const input: CallbackInput = ctx.input;


    ctx.output = {
      result: ctx.input,
    };
  },
} satisfies ServerOperation;

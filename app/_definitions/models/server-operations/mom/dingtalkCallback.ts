import type {ActionHandlerContext, ServerOperation} from "@ruiapp/rapid-core";
import {MomInspectionSheet} from "~/_definitions/meta/entity-types";
import YidaHelper from "~/sdk/yida/helper";
import YidaApi from "~/sdk/yida/api";

export type CallbackInput = {
  code: string,
  sign: string
  id: string,
};

export default {
  code: "dingtalkCallback",
  method: "POST",
  async handler(ctx: ActionHandlerContext) {
    const { server } = ctx;
    const input: CallbackInput = ctx.input;

    const inspectSheet = await server.getEntityManager<MomInspectionSheet>("mom_inspection_sheet").findEntity({
      filters: [
        {
          operator: "eq",
          field: "yidaId",
          value: input.id,
        },
      ],
      properties: ["id", "material", "code"],
    });

    if (inspectSheet) {
      const yidaSDK = await new YidaHelper(server).NewAPIClient();
      const yidaAPI = new YidaApi(yidaSDK);

      const yidaResp = await yidaAPI.getAuditDetail(input.id)

      await server.getEntityManager<MomInspectionSheet>("mom_inspection_sheet").updateEntityById({
        routeContext: ctx.routerContext,
        id: inspectSheet.id,
        entityToSave: {
          result: yidaResp?.approvedResult === 'agree' ? 'approved' : 'rejected',
        }
      });
    }

  },
} satisfies ServerOperation;

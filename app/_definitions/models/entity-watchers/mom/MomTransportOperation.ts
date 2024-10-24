import type {EntityWatcher, EntityWatchHandlerContext} from "@ruiapp/rapid-core";
import type {MomTransportOperationItem} from "~/_definitions/meta/entity-types";
import YidaHelper from "~/sdk/yida/helper";
import YidaApi from "~/sdk/yida/api";

export default [
  {
    eventName: "entity.update",
    modelSingularCode: "mom_transport_operation",
    handler: async (ctx: EntityWatchHandlerContext<"entity.update">) => {
      const { server, payload } = ctx;
      const after = payload.after;
      const changes = payload.changes;


      try {
        if (changes.hasOwnProperty("state") && changes.state === "finished") {
          const transportItems = await server.getEntityManager<MomTransportOperationItem>("mom_transport_operation_item").findEntities({
            filters: [{ operator: "eq", field: "operation_id", value: after.id }],
            properties: ["id", "operation", "material", "lotNum", "quantity", "unit", "sealNum", "remark", "deliveryOrderFile", "qualityInspectionReportFile", "sealNumPicture"],
          });

          if (transportItems) {
            const yidaSDK = await new YidaHelper(server).NewAPIClient();
            const yidaAPI = new YidaApi(yidaSDK);

            await yidaAPI.uploadTransmitAudit(transportItems)
          }
        }

      } catch (e) {
        console.log(e)
      }

    }
  },
] satisfies EntityWatcher<any>[];

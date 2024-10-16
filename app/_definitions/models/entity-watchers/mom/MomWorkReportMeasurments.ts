import type {EntityWatcher, EntityWatchHandlerContext} from "@ruiapp/rapid-core";
import type {MomWorkTask} from "~/_definitions/meta/entity-types";

export default [
  {
    eventName: "entity.create",
    modelSingularCode: "mom_route_process_parameter_measurement",
    handler: async (ctx: EntityWatchHandlerContext<"entity.create">) => {
      const { server, payload } = ctx;
      const after = payload.after;


    }
  },
] satisfies EntityWatcher<any>[];

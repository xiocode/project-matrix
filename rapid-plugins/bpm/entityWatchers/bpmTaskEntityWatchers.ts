import type {EntityWatcher, EntityWatchHandlerContext} from "@ruiapp/rapid-core";
import type { BpmTask,} from "~/_definitions/meta/entity-types";
import type BpmService from "../BpmService";

export default [
  {
    eventName: "entity.update",
    modelSingularCode: "bpm_task",
    handler: async (ctx: EntityWatchHandlerContext<"entity.update">) => {
      const {server, payload} = ctx;

      const bpmService = server.getService<BpmService>("bpmService");

      const changes: Partial<BpmTask> = payload.changes;
      const after: Partial<BpmTask> = payload.after;

      console.log("bpm_task update", payload)
      if (changes.state === "finished") {
        bpmService.checkActivityState((after as any).activity_id);
      }
    },
  },
] satisfies EntityWatcher<any>[];

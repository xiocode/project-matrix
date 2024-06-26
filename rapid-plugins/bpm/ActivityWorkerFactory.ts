import type { IRpdServer } from "@ruiapp/rapid-core";
import type { ActivityFlowNode } from "./BpmPluginTypes";
import type BpmService from "./BpmService";
import ApprovalActivityWorker from "./activityWorkers/approvalActivityWorker";
import UpdateEntityActivityWorker from "./activityWorkers/updateEntityActivityWorker";

export function createActivityWorker (activityType: ActivityFlowNode["activityType"], server: IRpdServer, bpmService: BpmService) {
  if (activityType === "approval") {
    return new ApprovalActivityWorker(server, bpmService);
  } else {
    return new UpdateEntityActivityWorker(server, bpmService);
  }
}
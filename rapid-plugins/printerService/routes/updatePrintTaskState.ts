import type { RpdRoute } from "@ruiapp/rapid-core";

export default {
  namespace: "svc",
  name: "svc.updatePrintTaskState",
  code: "svc.updatePrintTaskState",
  type: "RESTful",
  method: "POST",
  endpoint: "/svc/printer/agent/printers/:code/tasks/:taskId/state",
  actions: [
    {
      code: "updatePrintTaskState",
    },
  ],
} satisfies RpdRoute;
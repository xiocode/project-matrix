import type { RpdRoute } from "@ruiapp/rapid-core";

export default {
  namespace: "svc",
  name: "svc.getNextPendingPrintTask",
  code: "svc.getNextPendingPrintTask",
  type: "RESTful",
  method: "GET",
  endpoint: "/svc/printer/agent/printers/:code/tasks/next",
  actions: [
    {
      code: "getNextPendingPrintTask",
    },
  ],
} satisfies RpdRoute;
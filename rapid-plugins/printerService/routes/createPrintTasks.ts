import type { RpdRoute } from "@ruiapp/rapid-core";

export default {
  namespace: "svc",
  name: "svc.createPrintTasks",
  code: "svc.createPrintTasks",
  type: "RESTful",
  method: "POST",
  endpoint: "/svc/printer/printers/:code/tasks",
  actions: [
    {
      code: "createPrintTasks",
    },
  ],
} satisfies RpdRoute;
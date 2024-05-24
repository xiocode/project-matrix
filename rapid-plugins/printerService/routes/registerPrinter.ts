import type { RpdRoute } from "@ruiapp/rapid-core";

export default {
  namespace: "svc",
  name: "svc.registerPrinter",
  code: "svc.registerPrinter",
  type: "RESTful",
  method: "POST",
  endpoint: "/svc/printer/agent/printers",
  actions: [
    {
      code: "registerPrinter",
    },
  ],
} satisfies RpdRoute;
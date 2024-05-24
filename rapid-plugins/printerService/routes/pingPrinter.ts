import type { RpdRoute } from "@ruiapp/rapid-core";

export default {
  namespace: "svc",
  name: "svc.pingPrinter",
  code: "svc.pingPrinter",
  type: "RESTful",
  method: "POST",
  endpoint: "/svc/printer/agent/printers/:code/ping",
  actions: [
    {
      code: "registerPrinter",
    },
  ],
} satisfies RpdRoute;
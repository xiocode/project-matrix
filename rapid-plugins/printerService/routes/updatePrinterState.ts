import type { RpdRoute } from "@ruiapp/rapid-core";

export default {
  namespace: "svc",
  name: "svc.updatePrinterState",
  code: "svc.updatePrinterState",
  type: "RESTful",
  method: "POST",
  endpoint: "/svc/printer/agent/printers/:code/state",
  actions: [
    {
      code: "updatePrinterState",
    },
  ],
} satisfies RpdRoute;
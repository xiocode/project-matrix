import type { RpdRoute } from "@ruiapp/rapid-core";

export default {
  namespace: "svc",
  name: "svc.bpm.createProcessInstance",
  code: "svc.bpm.createProcessInstance",
  type: "RESTful",
  method: "POST",
  endpoint: "/svc/bpm/instances",
  actions: [
    {
      code: "createProcessInstance",
    },
  ],
} satisfies RpdRoute;
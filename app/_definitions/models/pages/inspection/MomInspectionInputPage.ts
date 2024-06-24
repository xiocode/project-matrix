import { cloneDeep } from "lodash";
import type { RapidPage, RapidEntityFormConfig } from "@ruiapp/rapid-extension";

const page: RapidPage = {
  code: "mom_inspection_input",
  name: "检验录入",
  title: "检验录入",
  // permissionCheck: {any: []},
  view: [
    {
      $type: "rapidEntityForm",
      entityCode: "MomInspectionRule",
      mode: "view",
      column: 3,
      items: [
        {
          type: "auto",
          code: "category",
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          type: "auto",
          code: "material",
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          type: "auto",
          code: "routeProcess",
          rendererProps: {
            format: "{{aliasName}}",
          },
        },
        {
          type: "auto",
          code: "createdAt",
          width: "150px",
        },
      ],
      $exps: {
        entityId: "$rui.parseQuery().id",
      },
    },
  ],
};

export default page;

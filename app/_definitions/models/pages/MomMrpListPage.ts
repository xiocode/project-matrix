import { cloneDeep } from "lodash";
import type { RapidPage, RapidEntityFormConfig } from "@ruiapp/rapid-extension";

const formConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      type: "auto",
      code: "name",
    },
  ],
};

const page: RapidPage = {
  code: "mom_mrp_list",
  name: "物料需求计划列表",
  title: "物料需求计划",
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "MomManufacturingResourcePlan",
      viewMode: "table",
      selectionMode: "none",
      listActions: [],
      extraActions: [
        {
          $type: "sonicToolbarFormItem",
          formItemType: "search",
          placeholder: "Search",
          actionEventName: "onSearch",
          filterMode: "contains",
          filterFields: ["code"],
        },
      ],
      orderBy: [
        {
          field: "createdAt",
          desc: true,
        },
      ],
      columns: [
        {
          type: "link",
          code: "name",
          rendererType: "link",
          rendererProps: {
            url: "/pages/mom_mrp_details?id={{id}}",
          },
        },
        {
          type: "auto",
          code: "planningState",
          width: "100px",
        },
        {
          type: "auto",
          code: "executionState",
          width: "100px",
        },
        {
          type: "auto",
          code: "createdAt",
          width: "150px",
        },
      ],
      actions: [
        {
          $type: "sonicRecordActionEditEntity",
          code: "edit",
          actionType: "edit",
          actionText: "修改",
        },
        {
          $type: "sonicRecordActionDeleteEntity",
          code: "delete",
          actionType: "delete",
          actionText: "删除",
          dataSourceCode: "list",
          entityCode: "MomManufacturingResourcePlan",
        },
      ],
      editForm: cloneDeep(formConfig),
    },
  ],
};

export default page;

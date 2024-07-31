import { cloneDeep } from "lodash";
import type { RapidPage, RapidEntityFormConfig } from "@ruiapp/rapid-extension";

const formConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      code: "materialCategory",
      type: "auto",
    },
    {
      code: "samplingCount",
      type: "auto",
    },
  ],
};

const page: RapidPage = {
  code: "mom_inspection_sampling_list",
  name: "抽样规则列表",
  title: "抽样规则列表",
  // permissionCheck: {any: ["warehouseStrategy.manage"]},
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "MomInspectionSampling",
      viewMode: "table",
      selectionMode: "none",
      orderBy: [
        {
          field: "id",
        },
      ],
      listActions: [
        {
          $type: "sonicToolbarNewEntityButton",
          text: "新建",
          icon: "PlusOutlined",
          actionStyle: "primary",
          // $permissionCheck: "warehouseStrategy.manage",
        },
      ],
      extraActions: [
        {
          $type: "sonicToolbarFormItem",
          formItemType: "search",
          placeholder: "Search",
          actionEventName: "onSearch",
          filterMode: "contains",
          filterFields: ["name", "description"],
        },
      ],
      columns: [
        {
          code: "materialCategory",
          width: "100px",
          type: "auto",
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          code: "samplingCount",
          width: "100px",
          type: "auto",
        },
      ],
      actions: [
        {
          $type: "sonicRecordActionEditEntity",
          code: "edit",
          actionType: "edit",
          actionText: "修改",
          // $permissionCheck: "warehouseStrategy.manage",
        },
        {
          $type: "sonicRecordActionDeleteEntity",
          code: "delete",
          actionType: "delete",
          actionText: "删除",
          dataSourceCode: "list",
          entityCode: "MomInspectionSampling",
          // $permissionCheck: "warehouseStrategy.manage",
        },
      ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
    },
  ],
};

export default page;

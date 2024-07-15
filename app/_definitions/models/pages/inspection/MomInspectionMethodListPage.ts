import { cloneDeep } from "lodash";
import type { RapidPage, RapidEntityFormConfig } from "@ruiapp/rapid-extension";

const formConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      code: "name",
      type: "auto",
    },
    {
      code: "description",
      type: "auto",
    },
  ],
};

const page: RapidPage = {
  code: "mom_inspection_method_list",
  name: "检验方法",
  title: "检验方法",
  permissionCheck: { any: [] },
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "MomInspectionMethod",
      viewMode: "table",
      selectionMode: "none",
      orderBy: [
        {
          field: "name",
        },
      ],
      listActions: [
        {
          $type: "sonicToolbarNewEntityButton",
          text: "新建",
          icon: "PlusOutlined",
          actionStyle: "primary",
          $permissionCheck: "inspectionMethod.manage",
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
          type: "auto",
          code: "name",
          width: "120px",
          fixed: "left",
        },
        {
          type: "auto",
          code: "description",
          fixed: "left",
        },
      ],
      actions: [
        {
          $type: "sonicRecordActionEditEntity",
          code: "edit",
          actionType: "edit",
          actionText: "修改",
          $permissionCheck: "inspectionMethod.manage",
        },
        {
          $type: "sonicRecordActionDeleteEntity",
          code: "delete",
          actionType: "delete",
          actionText: "删除",
          dataSourceCode: "list",
          entityCode: "MomInspectionMethod",
          $permissionCheck: "inspectionMethod.manage",
        },
      ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
      searchForm: {
        entityCode: "MomInspectionMethod",
        items: [
          {
            type: "auto",
            code: "name",
            filterMode: "contains",
          },
          {
            type: "auto",
            code: "description",
            filterMode: "contains",
          },
        ],
      },
    },
  ],
};

export default page;

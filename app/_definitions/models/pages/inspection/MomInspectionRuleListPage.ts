import { cloneDeep } from "lodash";
import type { RapidPage, RapidEntityFormConfig } from "@ruiapp/rapid-extension";

const formConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      type: "auto",
      code: "name",
    },
    {
      type: "auto",
      code: "material",
    },
    {
      type: "auto",
      code: "category",
    },
    // {
    //   type: "auto",
    //   code: "routeProcess",
    // },
    {
      type: "auto",
      code: "config",
    },
    {
      type: "auto",
      code: "isDefault",
    },
  ],
  defaultFormFields: {
    isDefault: "false",
  },
};

const page: RapidPage = {
  code: "mom_inspection_rule_list",
  name: "检验规则",
  title: "检验规则",
  permissionCheck: { any: [] },
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "MomInspectionRule",
      viewMode: "table",
      selectionMode: "none",
      listActions: [
        {
          $type: "sonicToolbarNewEntityButton",
          text: "新建",
          icon: "PlusOutlined",
          actionStyle: "primary",
          $permissionCheck: "inspectionRule.manage",
        },
      ],
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
          field: "id",
        },
      ],
      pageSize: 20,
      columns: [
        {
          type: "link",
          code: "name",
          width: "100px",
          fixed: "left",
          rendererType: "link",
          rendererProps: {
            url: "/pages/mom_inspection_rule_details?id={{id}}",
          },
        },
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
        // {
        //   type: "auto",
        //   code: "routeProcess",
        //   rendererProps: {
        //     format: "{{aliasName}}",
        //   },
        // },
        // {
        //   type: "auto",
        //   code: "config",
        // },
        {
          type: "auto",
          code: "isDefault",
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
          $permissionCheck: "inspectionRule.manage",
        },
        {
          $type: "sonicRecordActionDeleteEntity",
          code: "delete",
          actionType: "delete",
          actionText: "删除",
          dataSourceCode: "list",
          entityCode: "MomInspectionRule",
          $permissionCheck: "inspectionRule.manage",
        },
      ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
    },
  ],
};

export default page;

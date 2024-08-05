import {cloneDeep} from "lodash";
import type {RapidPage, RapidEntityFormConfig} from "@ruiapp/rapid-extension";

const formConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      type: "auto",
      code: "name",
      required: true,
    },
    {
      type: "auto",
      code: "material",
      formControlProps: {
        listSearchable: true,
        listTextFormat: "{{code}}-{{name}}-{{specification}}",
        listFilterFields: ["label"],
      },
      required: true,
    },
    // {
    //   type: "auto",
    //   code: "category",
    //   required: true,
    // },
    {
      type: "auto",
      code: "customer",
      listDataFindOptions: {
        fixedFilters: [
          {
            field: "categories",
            operator: "exists",
            filters: [
              {
                field: "code",
                operator: "eq",
                value: "customer",
              },
            ],
          },
        ],
      },
      formControlProps: {
        listSearchable: true,
        listTextFormat: "{{code}}-{{name}}",
        listFilterFields: ["label"],
      },
      required: true,
    },
    // {
    //   type: "auto",
    //   code: "config",
    // },
    // {
    //   type: "auto",
    //   code: "isDefault",
    // },
  ],
  defaultFormFields: {
    isDefault: "false",
  },
};

const page: RapidPage = {
  code: "mom_inspection_customer_rule_list",
  name: "客户验收标准列表",
  title: "客户验收标准列表",
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
      fixedFilters: [
        {
          field: "customer",
          operator: "notNull",
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
            url: "/pages/mom_inspection_customer_rule_details?id={{id}}",
          },
        },
        // {
        //   type: "auto",
        //   code: "category",
        //   rendererProps: {
        //     format: "{{name}}",
        //   },
        // },
        {
          type: "auto",
          code: "material",
          rendererProps: {
            format: "{{code}}-{{name}}-{{specification}}",
          },
        },
        {
          type: "auto",
          code: "customer",
          rendererProps: {
            format: "{{code}}-{{name}}",
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
        // {
        //   type: "auto",
        //   code: "isDefault",
        // },
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

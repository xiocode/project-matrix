import { cloneDeep } from "lodash";
import type { RapidPage, RapidEntityFormConfig } from "@ruiapp/rapid-extension";

const formConfig: Partial<RapidEntityFormConfig> = {
  items: [
    // {
    //   type: "auto",
    //   code: "code",
    // },
    {
      type: "auto",
      code: "material",
      formControlProps: {
        listTextFormat: "{{code}} {{name}}",
        listFilterFields: ["label"],
      },
    },
    {
      type: "auto",
      code: "lotNum",
    },
    // {
    //   type: "auto",
    //   code: "serialNum",
    // },
    {
      code: "sampleCount",
      type: "auto",
    },
    {
      code: "inventoryOperation",
      type: "auto",
      formControlProps: {
        listTextFormat: "{{code}}",
        listFilterFields: ["label"],
      },
    },
    // {
    //   code: "workOrder",
    //   type: "auto",
    // },
    // {
    //   code: "workTrack",
    //   type: "auto",
    // },
    // {
    //   code: "workTask",
    //   type: "auto",
    // },
    {
      code: "rule",
      type: "auto",
    },
    // {
    //   code: "routeProcess",
    //   type: "auto",
    // },
    {
      type: "auto",
      code: "sender",
    },
    {
      type: "auto",
      code: "result",
    },
    {
      type: "auto",
      code: "state",
    },
    {
      type: "auto",
      code: "approvalState",
    },
  ],
};

const page: RapidPage = {
  code: "mom_inspection_sheet_list",
  name: "检验记录列表",
  title: "检验记录",
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "MomInspectionSheet",
      viewMode: "table",
      // permissionCheck: {any: ["inspection.manage"]},
      selectionMode: "none",
      // listActions: [
      //   {
      //     $type: "sonicToolbarNewEntityButton",
      //     text: "新建",
      //     icon: "PlusOutlined",
      //     actionStyle: "primary",
      //   },
      // ],
      extraActions: [
        {
          $type: "sonicToolbarFormItem",
          formItemType: "search",
          placeholder: "Search",
          actionEventName: "onSearch",
          filterMode: "contains",
          filterFields: ["code", "lotNum"],
        },
      ],
      searchForm: {
        entityCode: "MomInspectionSheet",
        items: [
          {
            type: "auto",
            code: "state",
            filterMode: "in",
            itemType: "text",
          },
          {
            type: "auto",
            code: "approvalState",
            filterMode: "in",
            itemType: "text",
          },
          {
            type: "auto",
            code: "result",
            filterMode: "in",
            itemType: "text",
          },
          {
            type: "auto",
            code: "inspector",
            filterMode: "in",
            filterFields: ["inspector_id"],
          },
        ],
      },
      orderBy: [
        {
          field: "id",
          desc: true,
        },
      ],
      columns: [
        {
          type: "auto",
          fixed: "left",
          code: "state",
          width: "100px",
        },
        {
          type: "auto",
          fixed: "left",
          code: "approvalState",
          width: "100px",
        },
        {
          type: "link",
          code: "code",
          width: "200px",
          fixed: "left",
          rendererType: "link",
          rendererProps: {
            url: "/pages/mom_inspection_sheet_details?id={{id}}",
          },
        },
        {
          type: "auto",
          code: "material",
          fixed: "left",
          rendererType: "anchor",
          rendererProps: {
            children: {
              $type: "materialLabelRenderer",
              $exps: {
                value: "$slot.value",
              },
            },
            $exps: {
              href: "$rui.execVarText('/pages/base_material_details?id={{id}}', $slot.value)",
            },
          },
        },
        {
          type: "auto",
          code: "lotNum",
          width: "150px",
        },
        {
          type: "auto",
          code: "inventoryOperation",
          width: "150px",
          rendererProps: {
            format: "{{code}}",
          },
        },
        {
          type: "auto",
          code: "result",
          width: "150px",
        },
        {
          type: "auto",
          code: "sender",
          width: "150px",
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          type: "auto",
          code: "inspector",
          width: "150px",
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          type: "auto",
          code: "reviewer",
          width: "150px",
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          type: "auto",
          code: "createdAt",
          width: "150px",
        },
      ],
      // actions: [
      //   {
      //     $type: "sonicRecordActionEditEntity",
      //     code: "edit",
      //     actionType: "edit",
      //     actionText: "修改",
      //     $permissionCheck: "inspection.manage",
      //   },
      //   {
      //     $type: "sonicRecordActionDeleteEntity",
      //     code: "delete",
      //     actionType: "delete",
      //     actionText: "删除",
      //     dataSourceCode: "list",
      //     entityCode: "MomInspectionSheet",
      //     $permissionCheck: "inspection.manage",
      //   },
      // ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
      $exps: {
        "newForm.fixedFields.state": '"pending"',
        "newForm.fixedFields.approvalState": '"approving"',
      },
    },
  ],
};

export default page;

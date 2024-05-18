import { cloneDeep } from "lodash";
import type { RapidPage, RapidEntityFormConfig } from "@ruiapp/rapid-extension";

const formConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      type: "auto",
      code: "code",
    },
    {
      type: "auto",
      code: "material",
      listDataFindOptions: {
        fixedFilters: [
          {
            operator: "eq",
            field: "can_produce",
            value: true,
          },
        ],
      },
      formControlProps: {
        listTextFormat: "{{code}} {{name}}",
      },
    },
    {
      type: "auto",
      code: "tags",
    },
    {
      type: "auto",
      code: "route",
      formControlProps: {
        listTextFieldName: "version",
      },
    },
    {
      type: "auto",
      code: "scheduledStartDate",
    },
    {
      type: "auto",
      code: "scheduledFinishDate",
    },
    {
      type: "auto",
      code: "quantity",
    },
    {
      type: "auto",
      code: "unit",
    },
    {
      type: "auto",
      code: "assignmentState",
    },
    {
      type: "auto",
      code: "executionState",
    },
  ],
};

const page: RapidPage = {
  code: "mom_work_order_list",
  name: "工单列表",
  title: "工单管理",
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "MomWorkOrder",
      viewMode: "table",
      orderBy: [
        {
          field: "id",
          desc: true,
        },
      ],
      listActions: [
        {
          $type: "sonicToolbarNewEntityButton",
          text: "新建",
          icon: "PlusOutlined",
          actionStyle: "primary",
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
      columns: [
        {
          type: "link",
          code: "code",
          width: "200px",
          fixed: "left",
          rendererType: "link",
          rendererProps: {
            url: "/pages/mom_work_order_details?id={{id}}",
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
          code: "route",
          width: "100px",
          rendererProps: {
            format: "{{version}}",
          },
        },
        {
          type: "auto",
          code: "tags",
          width: "100px",
        },
        {
          type: "auto",
          code: "scheduledStartDate",
          width: "100px",
        },
        {
          type: "auto",
          code: "scheduledFinishDate",
          width: "100px",
        },
        {
          type: "auto",
          code: "quantity",
          width: "100px",
        },
        {
          type: "auto",
          code: "unit",
          width: "50px",
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          type: "auto",
          code: "assignmentState",
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
          entityCode: "MomWorkOrder",
        },
      ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
      searchForm: {
        entityCode: "OcUser",
        items: [
          {
            type: "auto",
            code: "code",
            filterMode: "contains",
          },
        ],
      },
      $exps: {
        "newForm.fixedFields.assignmentState": "unassigned",
        "newForm.fixedFields.executionState": "pending",
      }
    },
  ],
};

export default page;

import { cloneDeep } from "lodash";
import type { RapidPage, RapidEntityFormConfig } from "@ruiapp/rapid-extension";

const formConfig: Partial<RapidEntityFormConfig> = {
  items: [
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
    {
      type: "auto",
      code: "binNum",
      label: "托盘号",
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
      code: "state",
      formControlProps: {
        listSearchable: true,
        listTextFormat: "{{name}} {{value}}",
        listFilterFields: ["label"],
      },
    },
  ],
};

const page: RapidPage = {
  code: "mom_good_list",
  name: "物品列表",
  title: "物品列表",
  // permissionCheck: {any: []},
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "MomGood",
      viewMode: "table",
      listActions: [
        {
          $type: "sonicToolbarNewEntityButton",
          text: "新建",
          icon: "PlusOutlined",
          actionStyle: "primary",
        },
        {
          $type: "mergeBinNumAction",
        },
      ],
      fixedFilters: [
        {
          field: "state",
          operator: "eq",
          value: "normal",
        },
      ],
      orderBy: [
        {
          field: "createdAt",
          desc: true,
        },
      ],
      extraActions: [
        {
          $type: "sonicToolbarFormItem",
          formItemType: "search",
          placeholder: "Search",
          actionEventName: "onSearch",
          filterMode: "contains",
          filterFields: ["materialCode", "lotNum", "serialNum"],
        },
      ],
      pageSize: 20,
      columns: [
        {
          type: "auto",
          code: "material",
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
          width: "200px",
        },
        {
          type: "auto",
          code: "binNum",
          title: "托盘号",
          width: "200px",
        },
        {
          type: "auto",
          code: "quantity",
          width: "100px",
        },
        {
          type: "auto",
          code: "unit",
          width: "100px",
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          type: "auto",
          code: "state",
          width: "100px",
        },
        {
          type: "auto",
          code: "location",
          width: "100px",
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          type: "auto",
          code: "lot",
          title: "检验状态",
          width: "100px",
          rendererProps: {
            format: "{{qualificationState}}",
          },
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
          entityCode: "MomGood",
        },
        {
          $type: "splitBinNumAction",
          code: "split",
          actionType: "split",
          actionText: "拆分",
        },
      ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
      onSelectedIdsChange: [
        {
          $action: "setVars",
          $exps: {
            "vars.selectedIds": "$event.args[0].selectedIds",
            "vars.selectedRecords": "$event.args[0].selectedRecords",
          },
        },
      ],
    },
  ],
};

export default page;

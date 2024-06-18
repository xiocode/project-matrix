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
      code: "warehouse",
    },
    {
      type: "auto",
      code: "unit",
    },
    {
      type: "auto",
      code: "allocableQuantity",
    },
    {
      type: "auto",
      code: "onHandQuantity",
    },
    {
      type: "auto",
      code: "allocatedQuantity",
    },
  ],
};

const page: RapidPage = {
  code: "mom_material_warehouse_inventory_balance_list",
  name: "库存查询",
  title: "库存查询",
  permissionCheck: { any: [] },
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "MomMaterialWarehouseInventoryBalance",
      viewMode: "table",
      listActions: [
        {
          $type: "sonicToolbarNewEntityButton",
          text: "新建",
          icon: "PlusOutlined",
          actionStyle: "primary",
        },
        {
          $type: "sonicToolbarRefreshButton",
          text: "刷新",
          icon: "ReloadOutlined",
        },
      ],
      extraActions: [
        {
          $type: "sonicToolbarFormItem",
          formItemType: "search",
          placeholder: "Search",
          actionEventName: "onSearch",
          filterMode: "contains",
          filterFields: ["material"],
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
          code: "warehouse",
          rendererProps: {
            format: "{{code}}-{{name}}",
          },
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
          code: "allocableQuantity",
        },
        {
          type: "auto",
          code: "onHandQuantity",
        },
        {
          type: "auto",
          code: "allocatedQuantity",
        },
      ],
      actionsColumnWidth: "80px",
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
          entityCode: "MomMaterialWarehouseInventoryBalance",
        },
      ],
      newForm: cloneDeep(formConfig) as RapidEntityFormConfig,
      editForm: cloneDeep(formConfig) as RapidEntityFormConfig,
    },
  ],
};

export default page;

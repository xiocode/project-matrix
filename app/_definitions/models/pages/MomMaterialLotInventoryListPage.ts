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
    // {
    //   type: "auto",
    //   code: "tags",
    // },
    {
      type: "auto",
      code: "unit",
    },
    {
      type: "auto",
      code: "lotNum",
    },
    {
      type: "auto",
      code: "onHandQuantity",
    },
  ],
};

const page: RapidPage = {
  code: "mom_material_lot_inventory_list",
  name: "存货数量",
  title: "存货数量",
  permissionCheck: { any: [] },
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "MomMaterialLotWarehouseInventoryBalance",
      viewMode: "table",
      selectionMode: "none",
      listActions: [
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
          code: "tags",
        },
        {
          type: "auto",
          code: "lotNum",
          width: "200px",
        },
        {
          type: "auto",
          code: "onHandQuantity",
          width: "100px",
        },
        // {
        //   type: "auto",
        //   code: "unit",
        //   width: "50px",
        //   rendererProps: {
        //     format: "{{name}}",
        //   },
        // },
      ],
    },
  ],
};

export default page;

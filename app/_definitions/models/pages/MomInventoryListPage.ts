import { cloneDeep } from "lodash";
import type { RapidPage, RapidEntityFormConfig, SonicEntityListRockConfig } from "@ruiapp/rapid-extension";

const formConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      type: "auto",
      code: "warehouse",
    },
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
      code: "tags",
    },
    {
      type: "auto",
      code: "allocableQuantity",
    },
    {
      type: "auto",
      code: "availableQuantity",
    },
    {
      type: "auto",
      code: "onOrderQuantity",
    },
    {
      type: "auto",
      code: "intransitQuantity",
    },
    {
      type: "auto",
      code: "onHandQuantity",
    },
    // {
    //   type: 'auto',
    //   code: 'processingQuantity',
    // },
    // {
    //   type: 'auto',
    //   code: 'processedQuantity',
    // },
    // {
    //   type: 'auto',
    //   code: 'yieldQuantity',
    // },
    {
      type: "auto",
      code: "reservedQuantity",
    },
    {
      type: "auto",
      code: "allocatedQuantity",
    },
    // {
    //   type: 'auto',
    //   code: 'shippingQuantity',
    // },
    // {
    //   type: 'auto',
    //   code: 'deliveredQuantity',
    // },
    {
      type: "auto",
      code: "unit",
    },
  ],
};

function genListConfig(warehouseCode?: string) {
  const listConfig: SonicEntityListRockConfig = {
    $type: "sonicEntityList",
    entityCode: "MomInventory",
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
    fixedFilters: warehouseCode
      ? [
          {
            field: "warehouse",
            operator: "exists",
            filters: [
              {
                operator: "eq",
                field: "code",
                value: warehouseCode,
              },
            ],
          },
        ]
      : [],
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
      // {
      //   type: 'auto',
      //   code: 'tags',
      // },
      {
        type: "auto",
        code: "tags",
        title: "d",
        fieldName: "tags",
        width: "50px",
        align: "right",
        rendererProps: {
          $exps: {
            value: "qs.parse($slot.value).d",
          },
        },
      },
      {
        type: "auto",
        code: "tags",
        title: "D",
        fieldName: "tags",
        width: "50px",
        align: "right",
        rendererProps: {
          $exps: {
            value: "qs.parse($slot.value).D",
          },
        },
      },
      {
        type: "auto",
        code: "tags",
        title: "b",
        fieldName: "tags",
        width: "50px",
        align: "right",
        rendererProps: {
          $exps: {
            value: "qs.parse($slot.value).b",
          },
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
        width: "100px",
      },
      {
        type: "auto",
        code: "availableQuantity",
        width: "100px",
      },
      {
        type: "auto",
        code: "onOrderQuantity",
        width: "100px",
      },
      {
        type: "auto",
        code: "intransitQuantity",
        width: "100px",
      },
      {
        type: "auto",
        code: "onHandQuantity",
        width: "100px",
      },
      // {
      //   type: 'auto',
      //   code: 'processingQuantity',
      //   width: '100px',
      // },
      // {
      //   type: 'auto',
      //   code: 'processedQuantity',
      //   width: '100px',
      // },
      // {
      //   type: 'auto',
      //   code: 'yieldQuantity',
      //   width: '100px',
      // },
      {
        type: "auto",
        code: "reservedQuantity",
        width: "100px",
      },
      {
        type: "auto",
        code: "allocatedQuantity",
        width: "100px",
      },
      // {
      //   type: 'auto',
      //   code: 'shippingQuantity',
      //   width: '100px',
      // },
      // {
      //   type: 'auto',
      //   code: 'deliveredQuantity',
      //   width: '100px',
      // },
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
        entityCode: "MomInventory",
      },
    ],
    newForm: cloneDeep(formConfig) as RapidEntityFormConfig,
    editForm: cloneDeep(formConfig) as RapidEntityFormConfig,
  } as any;
  return listConfig;
}

const page: RapidPage = {
  code: "mom_inventory_list",
  name: "存货数量",
  title: "存货数量",
  // permissionCheck: {any: []},
  view: [
    {
      $type: "antdTabs",
      items: [
        {
          key: "W1",
          label: "成品仓",
          children: [genListConfig("W1")],
        },
        {
          key: "W4",
          label: "半成品仓3",
          children: [genListConfig("W4")],
        },
        {
          key: "W3",
          label: "半成品仓2",
          children: [genListConfig("W3")],
        },
        {
          key: "W2",
          label: "半成品仓1",
          children: [genListConfig("W2")],
        },
        {
          key: "W5",
          label: "配件仓",
          children: [genListConfig("W5")],
        },
        {
          key: "W-ALL",
          label: "全部",
          children: [genListConfig()],
        },
      ],
    },
  ],
};

export default page;

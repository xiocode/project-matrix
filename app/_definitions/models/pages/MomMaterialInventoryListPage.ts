import { cloneDeep } from 'lodash';
import type { RapidPage, RapidEntityFormConfig } from '@ruiapp/rapid-extension';

const formConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      type: 'auto',
      code: 'material',
      formControlProps: {
        listTextFormat: "{{code}} {{name}}",
        listFilterFields: ['label']
      },
    },
    {
      type: 'auto',
      code: 'tags',
    },
    {
      type: 'auto',
      code: 'unit',
    },
    {
      type: 'auto',
      code: 'allocableQuantity',
    },
    {
      type: 'auto',
      code: 'availableQuantity',
    },
    {
      type: 'auto',
      code: 'onOrderQuantity',
    },
    {
      type: 'auto',
      code: 'intransitQuantity',
    },
    {
      type: 'auto',
      code: 'onHandQuantity',
    },
    {
      type: 'auto',
      code: 'reservedQuantity',
    },
    {
      type: 'auto',
      code: 'allocatedQuantity',
    },

  ],
}

const page: RapidPage = {
  code: 'mom_material_inventory_list',
  name: '存货数量',
  title: '存货数量',
  permissionCheck: {any: []},
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "MomMaterialInventory",
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
        }
      ],
      pageSize: 20,
      columns: [
        {
          type: 'auto',
          code: 'material',
          rendererType: "anchor",
          rendererProps: {
            children: {
              $type: 'materialLabelRenderer',
              $exps: {
                value: '$slot.value',
              }
            },
            $exps: {
              href: "$rui.execVarText('/pages/base_material_details?id={{id}}', $slot.value)",
            },
          },
        },
        {
          type: 'auto',
          code: 'tags',
        },
        {
          type: 'auto',
          code: 'unit',
          width: '50px',
          rendererProps: {
            format: '{{name}}',
          },
        },
        {
          type: 'auto',
          code: 'allocableQuantity',
          width: '100px',
        },
        {
          type: 'auto',
          code: 'availableQuantity',
          width: '100px',
        },
        {
          type: 'auto',
          code: 'onOrderQuantity',
          width: '100px',
        },
        {
          type: 'auto',
          code: 'intransitQuantity',
          width: '100px',
        },
        {
          type: 'auto',
          code: 'onHandQuantity',
          width: '100px',
        },
        {
          type: 'auto',
          code: 'reservedQuantity',
          width: '100px',
        },
        {
          type: 'auto',
          code: 'allocatedQuantity',
          width: '100px',
        },
      ],
      actionsColumnWidth: "80px",
      actions: [
        {
          $type: "sonicRecordActionEditEntity",
          code: 'edit',
          actionType: "edit",
          actionText: '修改',
        },
        {
          $type: "sonicRecordActionDeleteEntity",
          code: 'delete',
          actionType: 'delete',
          actionText: '删除',
          dataSourceCode: "list",
          entityCode: "MomMaterialInventory",
        },
      ],
      newForm: cloneDeep(formConfig) as RapidEntityFormConfig,
      editForm: cloneDeep(formConfig) as RapidEntityFormConfig,
    },
  ],
};

export default page;

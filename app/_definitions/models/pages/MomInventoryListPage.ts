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
      code: 'allocableQuantity',
    },
    {
      type: 'auto',
      code: 'availableQuantity',
    },
    {
      type: 'auto',
      code: 'purchasedQuantity',
    },
    {
      type: 'auto',
      code: 'intransitQuantity',
    },
    {
      type: 'auto',
      code: 'instockQuantity',
    },
    {
      type: 'auto',
      code: 'processingQuantity',
    },
    {
      type: 'auto',
      code: 'processedQuantity',
    },
    {
      type: 'auto',
      code: 'yieldQuantity',
    },
    {
      type: 'auto',
      code: 'reservedQuantity',
    },
    {
      type: 'auto',
      code: 'allocatedQuantity',
    },
    {
      type: 'auto',
      code: 'shippingQuantity',
    },
    {
      type: 'auto',
      code: 'deliveredQuantity',
    },
    {
      type: 'auto',
      code: 'unit',
    },
  ],
}

const page: RapidPage = {
  code: 'mom_inventory_list',
  name: '存货数量',
  title: '存货数量',
  // permissionCheck: {any: []},
  view: [
    {
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
          code: 'unit',
          width: '100px',
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
          code: 'purchasedQuantity',
          width: '100px',
        },
        {
          type: 'auto',
          code: 'intransitQuantity',
          width: '100px',
        },
        {
          type: 'auto',
          code: 'instockQuantity',
          width: '100px',
        },
        {
          type: 'auto',
          code: 'processingQuantity',
          width: '100px',
        },
        {
          type: 'auto',
          code: 'processedQuantity',
          width: '100px',
        },
        {
          type: 'auto',
          code: 'yieldQuantity',
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
        {
          type: 'auto',
          code: 'shippingQuantity',
          width: '100px',
        },
        {
          type: 'auto',
          code: 'deliveredQuantity',
          width: '100px',
        },
      ],
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
          entityCode: "MomInventory",
        },
      ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
    },
  ],
};

export default page;

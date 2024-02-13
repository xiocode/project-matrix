import { cloneDeep } from 'lodash';
import type { RapidPage, RapidEntityFormConfig } from '@ruiapp/rapid-extension';

const formConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      type: 'auto',
      code: 'code',
    },
    {
      type: 'auto',
      code: 'account',
    },
    {
      type: 'auto',
      code: 'type',
    },
    {
      type: 'textarea',
      code: 'description',
    },
    {
      type: 'auto',
      code: 'amount',
    },
    {
      type: 'auto',
      code: 'transferedAt',
    },
    {
      type: 'auto',
      code: 'contract',
      formControlProps: {
        listTextFormat: "{{code}} {{name}}",
        listFilterFields: ['label']
      }
    },
    {
      type: 'auto',
      code: 'order',
      formControlProps: {
        listTextFormat: "{{code}} {{name}}",
        listFilterFields: ['label']
      }
    },
    {
      type: 'auto',
      code: 'state',
    },
  ],
}

const page: RapidPage = {
  code: 'fin_franstaction_list',
  name: '收支记录',
  title: '收支记录',
  permissionCheck: {any: ["finTransaction.view", "finTransaction.new", "finTransaction.manage", "finTransaction.delete"]},
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "FinTransaction",
      viewMode: "table",
      listActions: [
        {
          $type: "sonicToolbarNewEntityButton",
          text: "新建",
          icon: "PlusOutlined",
          actionStyle: "primary",
        }
      ],
      extraActions: [
        {
          $type: "sonicToolbarFormItem",
          formItemType: "search",
          placeholder: "Search",
          actionEventName: "onSearch",
          filterMode: "contains",
          filterFields: ["code", "name"],
        }
      ],
      orderBy: [
        {
          field: "transferedAt",
          desc: true,
        },
      ],
      pageSize: 20,
      columns: [
        {
          type: 'auto',
          code: 'code',
          width: '100px',
          fixed: 'left',
        },
        {
          type: 'auto',
          code: 'transferedAt',
          width: '150px',
          fixed: 'left',
        },
        {
          type: 'auto',
          code: 'account',
          width: '150px',
          fieldName: 'account.name'
        },
        {
          type: 'auto',
          code: 'type',
          width: '80px',
        },
        {
          type: 'auto',
          code: 'amount',
          width: '120px',
          align: 'right',
          rendererType: 'rapidCurrencyRenderer',
        },
        {
          type: 'auto',
          code: 'balance',
          width: '120px',
          align: 'right',
          rendererType: 'rapidCurrencyRenderer',
        },
        {
          type: 'auto',
          code: 'description',
        },
        {
          type: 'auto',
          code: 'contract',
          rendererType: "rapidLinkRenderer",
          rendererProps: {
            text: "{{code}} {{name}}",
            url: "/pages/cbs_contract_details?id={{id}}",
          },
        },
        {
          type: 'auto',
          code: 'order',
          rendererType: "rapidLinkRenderer",
          rendererProps: {
            text: "{{code}} {{name}}",
            url: "/pages/cbs_order_details?id={{id}}",
          },
        },
        {
          type: 'auto',
          code: 'state',
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
          entityCode: "FinTransaction",
        },
      ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
    },
  ],
};

export default page;

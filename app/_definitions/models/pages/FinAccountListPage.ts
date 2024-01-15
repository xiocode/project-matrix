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
      code: 'name',
    },
    {
      type: 'textarea',
      code: 'description',
    },
    {
      type: 'auto',
      code: 'state',
    },
  ],
}

const page: RapidPage = {
  code: 'fin_account_list',
  name: '资金账户',
  title: '资金账户',
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "FinAccount",
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
          field: "code",
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
          code: 'name',
          width: '150px',
        },
        {
          type: 'auto',
          code: 'balance',
          width: '150px',
          align: 'right',
          rendererType: 'text',
          rendererProps: {
            $exps: {
              text: "Intl.NumberFormat('Zh-cn').format($slot.value)"
            },
          },
        },
        {
          type: 'auto',
          code: 'description',
        },
        {
          type: 'auto',
          code: 'state',
          width: '100px',
        },
        {
          type: 'auto',
          code: 'createdAt',
          width: '150px',
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
          entityCode: "FinAccount",
        },
      ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
    },
  ],
};

export default page;

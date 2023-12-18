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
      type: 'auto',
      code: 'description',
    },
    {
      type: 'auto',
      code: 'project',
    },
    {
      type: 'auto',
      code: 'salesman',
    },
    {
      type: 'auto',
      code: 'totalAmount',
    },
    {
      type: 'auto',
      code: 'state',
    },
  ],
}

const page: RapidPage = {
  code: 'cm_contract_list',
  name: '合同列表',
  title: '合同列表',
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "CmContract",
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
      pageSize: 20,
      columns: [
        {
          type: 'auto',
          code: 'code',
          fixed: 'left',
          width: '100px',
        },
        {
          type: 'auto',
          code: 'name',
          fixed: 'left',
        },
        {
          type: 'auto',
          code: 'project',
          fieldName: 'project.name',
        },
        {
          type: 'auto',
          code: 'salesman',
          fieldName: 'salesman.name',
          width: '100px',
        },
        {
          type: 'auto',
          code: 'totalAmount',
          width: '100px',
          align: 'right',
          rendererType: 'text',
          rendererProps: {
            $exps: {
              text: "Intl.NumberFormat('Zh-cn').format($slot.value)"
            }
          }
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
          entityCode: "CmContract",
        },
      ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
    },
  ],
};

export default page;

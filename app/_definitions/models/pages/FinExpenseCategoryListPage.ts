import { cloneDeep } from 'lodash';
import type { RapidPage, RapidEntityFormConfig } from '@ruiapp/rapid-extension';

const formConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      type: 'treeSelect',
      code: 'parent',
      formControlProps: {
        listDataSourceCode: "nodeList",
        listParentField: "parent.id",
      }
    },
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
      code: 'orderNum',
    },
  ],
}

const page: RapidPage = {
  code: 'fin_expense_category_list',
  name: '费用类型',
  title: '费用类型',
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "FinExpenseCategory",
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
          field: 'orderNum',
        },
      ],
      convertListToTree: true,
      listParentField: "parent.id",
      pageSize: -1,
      extraProperties: ['parent'],
      columns: [
        {
          type: 'auto',
          code: 'code',
          width: '100px',
        },
        {
          type: 'auto',
          code: 'name',
        },
        {
          type: 'auto',
          code: 'orderNum',
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
          entityCode: "FinExpenseCategory",
        },
      ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
      stores: [
        {
          type: "entityStore",
          name: "nodeList",
          entityCode: "FinExpenseCategory",
          properties: ["id", "code", "name", "parent", "orderNum", "createdAt"],
          filters: [
          ],
          orderBy: [
            {
              field: 'id',
            }
          ],
        }
      ],
    },
  ],
};

export default page;

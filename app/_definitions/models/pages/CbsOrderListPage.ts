import { cloneDeep } from 'lodash';
import type { RapidPage, RapidEntityFormConfig } from '@ruiapp/rapid-extension';

const formConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      type: 'auto',
      code: 'kind',
    },
    {
      type: 'auto',
      code: 'projects',
      formControlProps: {
        listTextFormat: "{{code}} {{name}}",
        listFilterFields: ['label']
      },
    },
    {
      type: 'auto',
      code: 'contracts',
      formControlProps: {
        listTextFormat: "{{code}} {{name}}",
        listFilterFields: ['label']
      },
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
      type: 'textarea',
      code: 'description',
    },
    {
      type: 'auto',
      code: 'state',
      formControlProps: {
        listSearchable: true,
        listTextFormat: "{{name}} {{value}}",
        listFilterFields: ['label'],
      },
    },
  ],
}

const page: RapidPage = {
  code: 'cbs_order_list',
  name: '订单列表',
  title: '订单列表',
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "CbsOrder",
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
          filterFields: ["code", "name"],
        }
      ],
      pageSize: 20,
      columns: [
        {
          type: 'auto',
          code: 'kind',
          fixed: 'left',
          width: '100px',
        },
        {
          type: 'auto',
          code: 'code',
          fixed: 'left',
          width: '100px',
        },
        {
          type: 'link',
          code: 'name',
          fixed: 'left',
          rendererProps: {
            url: "/pages/cbs_order_details?id={{id}}",
          },
        },
        {
          type: 'auto',
          code: 'totalAmount',
          width: '120px',
          align: 'right',
          rendererType: 'rapidCurrencyRenderer',
        },
        {
          type: 'auto',
          code: 'projects',
          width: '300px',
          rendererProps: {
            listContainer: {
              $type: "htmlElement",
              htmlTag: "div",
            },
            itemContainer: {
              $type: "htmlElement",
              htmlTag: "div",
            },
            item: {
              $type: "rapidLinkRenderer",
              url: "/pages/pm_project_details?id={{id}}",
              text: "{{code}} {{name}}",
            },
            separator: {
              $type: "htmlElement",
              htmlTag: "div",
            }
          },
        },
        {
          type: 'auto',
          code: 'contracts',
          width: '300px',
          rendererProps: {
            listContainer: {
              $type: "htmlElement",
              htmlTag: "div",
            },
            itemContainer: {
              $type: "htmlElement",
              htmlTag: "div",
            },
            item: {
              $type: "rapidLinkRenderer",
              url: "/pages/cbs_contract_details?id={{id}}",
              text: "{{code}} {{name}}",
            },
            separator: {
              $type: "htmlElement",
              htmlTag: "div",
            }
          },
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
          entityCode: "CbsOrder",
        },
      ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
    },
  ],
};

export default page;

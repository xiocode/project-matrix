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
      code: 'operationType',
    },
    {
      type: 'auto',
      code: 'business',
    },
  ],
}

const page: RapidPage = {
  code: 'mom_inventory_operation_list',
  name: '库存操作记录',
  title: '库存操作记录',
  // permissionCheck: {any: []},
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "MomInventoryOperation",
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
      orderBy: [
        {
          field: 'createdAt',
          desc: true,
        }
      ],
      pageSize: 20,
      columns: [
        {
          type: 'link',
          code: 'code',
          // rendererType: 'rapidLinkRenderer',
          rendererProps: {
            url: "/pages/mom_inventory_operation_details?id={{id}}",
          },
        },
        {
          type: 'auto',
          code: 'operationType',
          width: '100px',
        },
        {
          type: 'auto',
          code: 'business',
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
          entityCode: "MomInventoryOperation",
        },
      ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
    },
  ],
};

export default page;

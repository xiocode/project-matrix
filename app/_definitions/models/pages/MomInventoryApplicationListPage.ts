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
      code: 'businessType',
    },
    {
      type: 'auto',
      code: 'applicant',
    },
    {
      type: 'auto',
      code: 'state',
    },
  ],
}

const page: RapidPage = {
  code: 'mom_inventory_application_list',
  name: '库存业务申请',
  title: '库存业务申请',
  permissionCheck: {any: []},
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "MomInventoryApplication",
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
          filterFields: ["code"],
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
            url: "/pages/mom_inventory_application_details?id={{id}}",
          },
        },
        {
          type: 'auto',
          code: 'operationType',
          width: '100px',
        },
        {
          type: 'auto',
          code: 'businessType',
          width: '200px',
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          type: 'auto',
          code: 'createdAt',
          width: '150px',
        },
        {
          type: 'auto',
          code: 'state',
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
          entityCode: "MomInventoryApplication",
        },
      ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
    },
  ],
};

export default page;

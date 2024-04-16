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
      code: 'category',
    },
    {
      type: 'auto',
      code: 'orderNum',
    },
  ],
}

const page: RapidPage = {
  code: 'mom_process_list',
  name: '工序列表',
  title: '工序管理',
  permissionCheck: {any: []},
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "MomProcess",
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
          field: "orderNum",
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
        },
        {
          type: 'auto',
          code: 'category',
          width: '100px',
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          type: 'auto',
          code: 'orderNum',
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
          entityCode: "MomProcess",
        },
      ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
    },
  ],
};

export default page;

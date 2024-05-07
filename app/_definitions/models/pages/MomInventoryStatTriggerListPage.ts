import { cloneDeep } from 'lodash';
import type { RapidPage, RapidEntityFormConfig } from '@ruiapp/rapid-extension';

const formConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      type: 'auto',
      code: 'name',
    },
    {
      type: 'auto',
      code: 'config',
    },
  ],
}

const page: RapidPage = {
  code: 'mom_inventory_stat_trigger_list',
  name: '库存统计节点配置列表',
  title: '库存统计节点配置',
  permissionCheck: {any: []},
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "MomInventoryStatTrigger",
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
          filterFields: ["name"],
        }
      ],
      orderBy: [
        {
          field: 'id',
        }
      ],
      pageSize: 20,
      columns: [
        {
          type: 'auto',
          code: 'name',
        },
        {
          type: 'auto',
          code: 'config',
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
          entityCode: "MomInventoryStatTrigger",
        },
      ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
    },
  ],
};

export default page;

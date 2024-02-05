import { cloneDeep } from 'lodash';
import type { RapidPage, RapidEntityFormConfig } from '@ruiapp/rapid-extension';

const formConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      type: 'auto',
      code: 'client',
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
      code: 'parent',
      listDataFindOptions: {
        fixedFilters: [
          {
            operator: "null",
            field: "parent_id",
          }
        ],
        orderBy: [
          {
            field: 'orderNum',
          },
        ],
      }
    },
    {
      type: 'auto',
      code: 'orderNum',
    },
    {
      type: 'auto',
      code: 'icon',
    },
    {
      type: 'auto',
      code: 'pageCode',
    },
    {
      type: 'select',
      code: 'config',
      valueFieldName: 'config.permissionCheck.any',
      label: '权限检查',
      multipleValues: true,
      formControlProps: {
        listDataSourceCode: 'sysActions',
        listValueFieldName: 'code',
      },
    },
    {
      type: 'auto',
      code: 'config',
    },
    {
      type: 'auto',
      code: 'state',
    },
  ],
}

const page: RapidPage = {
  code: 'app_nav_item_list',
  name: '导航列表',
  title: '导航管理',
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "AppNavItem",
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
          type: 'link',
          code: 'code',
          fixed: 'left',
          minWidth: 300,
        },
        {
          type: 'auto',
          code: 'name',
          width: '150px',
          fixed: 'left',
        },
        {
          type: 'auto',
          code: 'client',
          width: '100px',
          rendererProps: {
            format: "{{name}}"
          },
        },
        {
          type: 'auto',
          code: 'orderNum',
          width: '100px',
        },
        {
          type: 'auto',
          code: 'icon',
          width: '200px',
        },
        {
          type: 'auto',
          code: 'pageCode',
        },
        {
          type: 'auto',
          code: 'createdAt',
          width: '150px',
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
          $type: "rapidTableAction",
          code: "disable",
          actionText: '禁用',
          $exps: {
            _hidden: "$slot.record.state !== 'enabled'"
          },
          onAction: [
            {
              $action: "sendHttpRequest",
              method: "PATCH",
              data: {state: 'disabled'},
              $exps: {
                url: `"/api/app/app_nav_items/" + $event.sender['data-record-id']`,
              }
            },
            {
              $action: "loadStoreData",
              storeName: "list",
            }
          ]
        },
        {
          $type: "rapidTableAction",
          code: "enable",
          actionText: '启用',
          $exps: {
            _hidden: "$slot.record.state === 'enabled'"
          },
          onAction: [
            {
              $action: "sendHttpRequest",
              method: "PATCH",
              data: {state: 'enabled'},
              $exps: {
                url: `"/api/app/app_nav_items/" + $event.sender['data-record-id']`,
              }
            },
            {
              $action: "loadStoreData",
              storeName: "list",
            }
          ]
        },
        {
          $type: "sonicRecordActionDeleteEntity",
          code: 'delete',
          actionType: 'delete',
          actionText: '删除',
          dataSourceCode: "list",
          entityCode: "AppNavItem",
        },
      ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
      searchForm: {
        entityCode: 'AppNavItem',
        items: [
          {
            type: 'auto',
            code: 'code',
            filterMode: 'contains',
          },
          {
            type: 'auto',
            code: 'name',
            filterMode: 'contains',
          },
          {
            type: 'auto',
            code: 'state',
            filterMode: 'eq',
          },
        ],
      },
      stores: [
        {
          type: "entityStore",
          name: "sysActions",
          entityCode: "SysAction",
          properties: ["id", "code", "name", "group", "orderNum"],
          filters: [
          ],
          orderBy: [
            {
              field: 'group_id',
            },
            {
              field: 'orderNum',
            }
          ],
        }
      ]
    },
  ],
};

export default page;

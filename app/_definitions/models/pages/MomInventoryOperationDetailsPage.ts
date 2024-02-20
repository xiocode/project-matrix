import { cloneDeep } from 'lodash';
import type { RapidPage, RapidEntityFormConfig } from '@ruiapp/rapid-extension';

const goodTransferFormConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      type: 'auto',
      code: 'good',
    },
    {
      type: 'treeSelect',
      code: 'from',
      formControlProps: {
        listDataSourceCode: "locations",
        listParentField: "parent.id",
      },
    },
    {
      type: 'treeSelect',
      code: 'to',
      formControlProps: {
        listDataSourceCode: "locations",
        listParentField: "parent.id",
      },
    },
    {
      type: 'auto',
      code: 'transferTime',
    },
  ],
};


const page: RapidPage = {
  code: 'mom_inventory_operation_details',
  name: '库存操作详情',
  title: '库存操作详情',
  // permissionCheck: {any: []},
  view: [
    {
      $type: 'rapidEntityForm',
      entityCode: 'MomInventoryOperation',
      mode: 'view',
      column: 3,
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
        {
          type: 'auto',
          code: 'createdAt',
        },
      ],
      $exps: {
        entityId: "$rui.parseQuery().id",
      }
    },
    {
      $type: "antdTabs",
      items: [
        {
          key: "items",
          label: "物品明细",
          children: [
            {
              $id: "projectLogList",
              $type: "sonicEntityList",
              entityCode: "MomGoodTransfer",
              viewMode: "table",
              fixedFilters: [
                {
                  field: "operation",
                  operator: "exists",
                  filters: [
                    {
                      field: "id",
                      operator: "eq",
                      value: ""
                    }
                  ]
                }
              ],
              listActions: [
                {
                  $type: "sonicToolbarNewEntityButton",
                  text: "新建",
                  icon: "PlusOutlined",
                  actionStyle: "primary",
                },
                {
                  $type: "sonicToolbarRefreshButton",
                  text: "刷新",
                  icon: "ReloadOutlined",
                },
              ],
              pageSize: -1,
              orderBy: [
                {
                  field: 'orderNum',
                }
              ],
              columns: [
                {
                  type: 'auto',
                  code: 'good',
                  width: '100px',
                  rendererProps: {
                    format: "{{lotNum}}/{{serialNum}}",
                  },
                },
                {
                  type: 'auto',
                  code: 'from',
                  width: '150px',
                },
                {
                  type: 'auto',
                  code: 'to',
                  width: '150px',
                  rendererProps: {
                    format: "{{name}}",
                  },
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
                  entityCode: "MomGoodTransfer",
                },
              ],
              newForm: cloneDeep(goodTransferFormConfig),
              editForm: cloneDeep(goodTransferFormConfig),
              stores: [
                {
                  type: "entityStore",
                  name: "locations",
                  entityCode: "BaseLocation",
                  properties: ["id", "type", "code", "name", "parent", "orderNum", "createdAt"],
                  filters: [
                  ],
                  orderBy: [
                    {
                      field: 'orderNum',
                    }
                  ],
                }
              ],
              $exps: {
                "fixedFilters[0].filters[0].value": "$rui.parseQuery().id",
                "newForm.fixedFields.operation_id": "$rui.parseQuery().id",
              },
            }
          ]
        },
      ]
    }
  ],
};

export default page;

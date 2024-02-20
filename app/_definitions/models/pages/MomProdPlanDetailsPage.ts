import { cloneDeep } from 'lodash';
import type { RapidPage, RapidEntityFormRockConfig } from '@ruiapp/rapid-extension';

const lineItemFormConfig: Partial<RapidEntityFormRockConfig> = {
  items: [
    {
      type: 'auto',
      code: 'material',
      listDataFindOptions: {
        fixedFilters: [
          {
            operator: 'eq',
            field: 'can_produce',
            value: true,
          }
        ],
        orderBy: [
          {
            field: "code",
          }
        ],
      },
      formControlProps: {
        listTextFormat: "{{code}} {{name}}",
      }
    },
    {
      type: 'auto',
      code: 'quantity',
    },
    {
      type: 'auto',
      code: 'unit',
    },
  ],
};


const orderFormConfig: Partial<RapidEntityFormRockConfig> = {
  items: [
    {
      type: 'auto',
      code: 'code',
    },
    {
      type: 'auto',
      code: 'material',
      // listDataFindOptions: {
      //   fixedFilters: [
      //     {
      //       field: "productionPlanItems",
      //       operator: "exists",
      //       filters: [
      //         {
      //           field: "production_plan_id",
      //           operator: "eq",
      //           value: ""
      //         }
      //       ]
      //     }
      //   ],
      //   $exps: {
      //     "fixedFilters[0].filters[0].value": "$rui.parseQuery().id",
      //   }
      // },
      formControlProps: {
        listTextFormat: "{{code}} {{name}}",
      },

    },
    {
      type: 'auto',
      code: 'route',
      listDataFindOptions: {
        fixedFilters: [
          {
            field: "material",
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
        $exps: {
          "fixedFilters[0].filters[0].value": "$scope.vars.active_material_id",
        }
      },
      formControlProps: {
        listTextFieldName: "version",
        $exps: {
          disabled: "!$self.form.getFieldValue('material')"
        }
      },
    },
    {
      type: 'auto',
      code: 'scheduledStartDate',
    },
    {
      type: 'auto',
      code: 'scheduledFinishDate',
    },
    {
      type: 'auto',
      code: 'quantity',
    },
    {
      type: 'auto',
      code: 'unit',
    },
    {
      type: 'auto',
      code: 'assignmentState',
    },
    {
      type: 'auto',
      code: 'executionState',
    },
  ],
  onFormRefresh: [
    {
      $action: "script",
      script: `function (event) {
        const material = event.args.form.getFieldValue("material");
        event.scope.setVars({
          active_material_id: material && material.id || material,
        }, true);
        event.scope.loadStoreData('dataFormItemList-route');
      }`
    },
  ],
  onValuesChange: [
    {
      $action: "script",
      script: `function (event) {
        const changedValues = event.args[0] || {};
        if(changedValues.hasOwnProperty('material')) {
          event.scope.setVars({
            active_material_id: changedValues.material,
          }, true);
          event.page.sendComponentMessage(event.sender.$id, {
            name: "setFieldsValue",
            payload: {
              route: null
            }
          });
          event.scope.loadStoreData('dataFormItemList-route');
        }
      }`
    },
  ]
};

const page: RapidPage = {
  code: 'mom_prod_plan_details',
  name: '生产计划详情',
  title: '生产计划详情',
  view: [
    {
      $type: 'rapidEntityForm',
      entityCode: 'MomProductionPlan',
      mode: 'view',
      column: 3,
      items: [
        {
          type: 'auto',
          code: 'code',
        },
        {
          type: 'auto',
          code: 'scheduleState',
        },
        {
          type: 'auto',
          code: 'executionState',
        },
        {
          type: 'auto',
          code: 'scheduledStartDate',
        },
        {
          type: 'auto',
          code: 'scheduledFinishDate',
        },
        {
          type: 'auto',
          code: 'actualStartDate',
        },
        {
          type: 'auto',
          code: 'actualFinishDate',
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
          key: "lineItems",
          label: "产品清单",
          children: [
            {
              $type: "sonicEntityList",
              entityCode: "MomProductionPlanItem",
              viewMode: "table",
              fixedFilters: [
                {
                  field: "production_plan_id",
                  operator: "eq",
                  value: "",
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
                }
              ],
              columns: [
                {
                  type: 'auto',
                  code: 'material',
                  rendererType: "anchor",
                  rendererProps: {
                    children: {
                      $type: 'materialLabelRenderer',
                      $exps: {
                        value: '$slot.value',
                      }
                    },
                    $exps: {
                      href: "$rui.execVarText('/pages/base_material_details?id={{id}}', $slot.value)",
                    },
                  },
                },
                {
                  type: 'auto',
                  code: 'quantity',
                  width: '100px',
                },
                {
                  type: 'auto',
                  code: 'unit',
                  width: '100px',
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
                  entityCode: "MomProductionPlanItem",
                },
              ],
              newForm: cloneDeep(lineItemFormConfig),
              editForm: cloneDeep(lineItemFormConfig),
              $exps: {
                "fixedFilters[0].value": "$rui.parseQuery().id",
                "newForm.fixedFields.production_plan_id": "$rui.parseQuery().id",
              },
            }
          ]
        },
        {
          key: "orders",
          label: "工单",
          children: [
            {
              $id: "productionOrders",
              $type: "sonicEntityList",
              entityCode: "MomWorkOrder",
              viewMode: "table",
              fixedFilters: [
                {
                  field: "production_plan_id",
                  operator: "eq",
                  value: "",
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
                }
              ],
              columns: [
                {
                  type: 'link',
                  code: 'code',
                  width: '150px',
                  fixed: 'left',
                  rendererType: "link",
                  rendererProps: {
                    url: "/pages/mom_prod_order_details?id={{id}}",
                  },
                },
                {
                  type: 'link',
                  code: 'material',
                  fixed: 'left',
                  rendererType: "link",
                  rendererProps: {
                    text: "{{material.code}} {{material.name}}",
                    url: "/pages/base_material_details?id={{material.id}}",
                  },
                },
                {
                  type: 'auto',
                  code: 'scheduledStartDate',
                  width: '100px',
                },
                {
                  type: 'auto',
                  code: 'scheduledFinishDate',
                  width: '100px',
                },
                {
                  type: 'auto',
                  code: 'quantity',
                  width: '100px',
                },
                {
                  type: 'auto',
                  code: 'unit',
                  width: '100px',
                  rendererProps: {
                    format: "{{name}}",
                  },
                },
                {
                  type: 'auto',
                  code: 'assignmentState',
                  width: '100px',
                },
                {
                  type: 'auto',
                  code: 'executionState',
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
                  entityCode: "MomWorkOrder",
                },
              ],
              newForm: cloneDeep(orderFormConfig),
              editForm: cloneDeep(orderFormConfig),
              $exps: {
                "fixedFilters[0].value": "$rui.parseQuery().id",
                "newForm.fixedFields.production_plan_id": "$rui.parseQuery().id",
              },
            }
          ]
        },
      ]
    }
  ],
};

export default page;

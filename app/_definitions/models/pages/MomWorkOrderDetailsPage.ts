import { cloneDeep } from 'lodash';
import type { RapidPage, RapidEntityFormRockConfig } from '@ruiapp/rapid-extension';

const taskFormConfig: Partial<RapidEntityFormRockConfig> = {
  items: [
    {
      type: 'auto',
      code: 'code',
    },
    {
      type: 'auto',
      code: 'material',
    },
    {
      type: 'auto',
      code: 'route',
      formControlProps: {
        listTextFieldName: "version",
      }
    },
    {
      type: 'auto',
      code: 'routeProcess',
      listDataFindOptions: {
        properties: ["id", "process", "aliasName"],
      },
      formControlProps: {
        listTextFormat: '{{process.code}} {{process.name}} ({{aliasName}})',
      },
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
      code: 'equipment',
      formControlProps: {
        listTextFormat: '{{code}} {{name}}',
      },
    },
    {
      type: 'auto',
      code: 'assignees',
      formControlProps: {
        listTextFormat: '{{name}} ({{department.name}})',
      },
      listDataFindOptions: {
        properties: ["id", "name", "department"],
        fixedFilters: [
          {
            field: "state",
            operator: "eq",
            value: "normal",
          }
        ],
        orderBy: [
          {
            field: 'code',
          },
        ],
      }
    },
    {
      type: 'auto',
      code: 'deadline',
    },
    {
      type: 'auto',
      code: 'assigner',
      formControlProps: {
        listTextFormat: '{{name}} ({{department.name}})',
      },
      listDataFindOptions: {
        properties: ["id", "name", "department"],
        fixedFilters: [
          {
            field: "state",
            operator: "eq",
            value: "normal",
          }
        ],
        orderBy: [
          {
            field: 'code',
          },
        ],
      }
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
};

const page: RapidPage = {
  code: 'mom_work_order_details',
  name: '工单详情',
  title: '工单详情',
  view: [
    {
      $type: 'rapidEntityForm',
      entityCode: 'MomWorkOrder',
      mode: 'view',
      column: 3,
      items: [
        {
          type: 'auto',
          code: 'code',
        },
        {
          type: 'auto',
          code: 'material',
          rendererType: "rapidLinkRenderer",
          rendererProps: {
            text: "{{code}} {{name}}",
            url: "/pages/base_material_details?id={{id}}",
          },
        },
        {
          type: 'auto',
          code: 'quantity',
        },
        {
          type: 'auto',
          code: 'unit',
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          type: 'auto',
          code: 'assignmentState',
        },
        {
          type: 'auto',
          code: 'executionState',
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
          key: "tasks",
          label: "工序任务",
          children: [
            {
              $type: "sonicEntityList",
              entityCode: "MomWorkTask",
              viewMode: "table",
              fixedFilters: [
                {
                  field: "work_order_id",
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
                  width: '200px',
                  fixed: 'left',
                  rendererType: "link",
                  rendererProps: {
                    url: "/pages/mom_work_task_details?id={{id}}",
                  },
                },
                {
                  type: 'auto',
                  code: 'routeProcess',
                  width: '150px',
                  fixed: 'left',
                  rendererProps: {
                    format: "{{aliasName}}",
                  },
                },
                {
                  type: 'auto',
                  code: 'quantity',
                  width: '80px',
                },
                {
                  type: 'auto',
                  code: 'unit',
                  width: '50px',
                  rendererProps: {
                    format: "{{name}}",
                  },
                },
                {
                  type: 'auto',
                  code: 'equipment',
                  width: '150px',
                  rendererProps: {
                    format: "{{code}} {{name}}",
                  },
                },
                {
                  type: 'auto',
                  code: 'assignees',
                  width: '150px',
                  rendererProps: {
                    format: "{{name}}",
                  },
                },
                {
                  type: 'auto',
                  code: 'deadline',
                  width: '150px',
                },
                {
                  type: 'auto',
                  code: 'assigner',
                  width: '100px',
                  rendererProps: {
                    format: "{{name}}",
                  },
                },
                {
                  type: 'auto',
                  code: 'assignedAt',
                  width: '150px',
                },
                {
                  type: 'auto',
                  code: 'acceptedAt',
                  width: '150px',
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
                  entityCode: "MomWorkTask",
                },
              ],
              newForm: cloneDeep(taskFormConfig),
              editForm: cloneDeep(taskFormConfig),
              $exps: {
                "fixedFilters[0].value": "$rui.parseQuery().id",
                "newForm.fixedFields.work_order_id": "$rui.parseQuery().id",
              },
            }
          ]
        },
      ]
    }
  ],
};

export default page;

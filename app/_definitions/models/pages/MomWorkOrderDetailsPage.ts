import { cloneDeep } from "lodash";
import type { RapidPage, RapidEntityFormRockConfig } from "@ruiapp/rapid-extension";

const reportFormConfig: Partial<RapidEntityFormRockConfig> = {
  items: [
    {
      type: "auto",
      code: "workTask",
      listDataFindOptions: {
        properties: ["id", "code", "routeProcess"],
      },
      formControlProps: {
        listTextFormat: "{{code}} {{routeProcess.name}}",
      },
    },
    {
      type: "auto",
      code: "qualifiedQuantity",
    },
    {
      type: "auto",
      code: "unqualifiedQuantity",
    },
    {
      type: "auto",
      code: "scrapQuantity",
    },
    {
      type: "auto",
      code: "unit",
    },
    {
      type: "auto",
      code: "equipment",
      formControlProps: {
        listTextFormat: "{{code}} {{name}}",
      },
    },
    {
      type: "auto",
      code: "operators",
      formControlProps: {
        listTextFormat: "{{name}} ({{department.name}})",
      },
      listDataFindOptions: {
        properties: ["id", "name", "department"],
        fixedFilters: [
          {
            field: "state",
            operator: "eq",
            value: "normal",
          },
        ],
        orderBy: [
          {
            field: "code",
          },
        ],
      },
    },
  ],
  defaultFormFields: {
    unqualifiedQuantity: 0,
    scrapQuantity: 0,
  }
};

const taskFormConfig: Partial<RapidEntityFormRockConfig> = {
  items: [
    {
      type: "auto",
      code: "code",
    },
    {
      type: "auto",
      code: "material",
      formControlProps: {
        listTextFormat: "{{code}} {{name}}",
        listFilterFields: ["label"],
      },
    },
    {
      type: "auto",
      code: "route",
      formControlProps: {
        listTextFieldName: "version",
      },
    },
    {
      type: "auto",
      code: "routeProcess",
      listDataFindOptions: {
        properties: ["id", "process", "aliasName"],
      },
      formControlProps: {
        listTextFormat: "{{process.code}} {{process.name}} ({{aliasName}})",
      },
    },
    {
      type: "auto",
      code: "quantity",
    },
    {
      type: "auto",
      code: "unit",
    },
    {
      type: "auto",
      code: "equipment",
      formControlProps: {
        listTextFormat: "{{code}} {{name}}",
      },
    },
    {
      type: "auto",
      code: "assignees",
      formControlProps: {
        listTextFormat: "{{name}} ({{department.name}})",
      },
      listDataFindOptions: {
        properties: ["id", "name", "department"],
        fixedFilters: [
          {
            field: "state",
            operator: "eq",
            value: "normal",
          },
        ],
        orderBy: [
          {
            field: "code",
          },
        ],
      },
    },
    {
      type: "auto",
      code: "deadline",
    },
    {
      type: "auto",
      code: "assigner",
      formControlProps: {
        listTextFormat: "{{name}} ({{department.name}})",
      },
      listDataFindOptions: {
        properties: ["id", "name", "department"],
        fixedFilters: [
          {
            field: "state",
            operator: "eq",
            value: "normal",
          },
        ],
        orderBy: [
          {
            field: "code",
          },
        ],
      },
    },
    {
      type: "auto",
      code: "assignmentState",
    },
    {
      type: "auto",
      code: "executionState",
    },
  ],
};

const page: RapidPage = {
  code: "mom_work_order_details",
  name: "工单详情",
  title: "工单详情",
  view: [
    {
      $type: "rapidToolbar",
      extras: [
        {
          $type: "rapidToolbarButton",
          text: "取消工单",
          onAction: [
            {
              $action: "sendHttpRequest",
              method: "PATCH",
              url: "",
              data: {
                $operation: {
                  type: "cancelOrder"
                },
                $stateProperties: ["executionState"],
              },
              $exps: {
                "url": "'/api/mom/mom_work_orders/' + $rui.parseQuery().id",
              },
            },
            {
              $action: "antdMessage",
              title: "工单取消成功。",
              onClose: [
                {
                  $action: "reloadPage",
                },
              ],
            },
          ],
          $exps: {
            _hidden: "!($stores.detail?.data?.list[0]?.executionState == 'pending' || $stores.detail?.data?.list[0]?.executionState == 'processing')",
          },
        },

        {
          $type: "rapidToolbarButton",
          text: "下发工单",
          actionStyle: "primary",
          onAction: [
            {
              $action: "sendHttpRequest",
              method: "PATCH",
              url: "",
              data: {
                $operation: {
                  type: "issueOrder"
                },
                $stateProperties: ["assignmentState"],
              },
              $exps: {
                "url": "'/api/mom/mom_work_orders/' + $rui.parseQuery().id",
              },
            },
            {
              $action: "antdMessage",
              title: "工单下发成功。",
              onClose: [
                {
                  $action: "loadScopeData",
                },
              ],
            },
          ],
          $exps: {
            _hidden: "!($stores.detail?.data?.list[0]?.assignmentState == 'assigning')",
          },
        },

        {
          $type: "rapidToolbarButton",
          text: "完成工单",
          actionStyle: "primary",
          onAction: [
            {
              $action: "sendHttpRequest",
              method: "PATCH",
              url: "",
              data: {
                $operation: {
                  type: "completeOrder"
                },
                $stateProperties: ["executionState"],
              },
              $exps: {
                "url": "'/api/mom/mom_work_orders/' + $rui.parseQuery().id",
              },
            },
            {
              $action: "antdMessage",
              title: "工单已完成。",
              onClose: [
                {
                  $action: "reloadPage",
                },
              ],
            },
          ],
          $exps: {
            _hidden: "!($stores.detail?.data?.list[0]?.executionState == 'processing')",
          },
        },

        {
          $type: "rapidToolbarButton",
          text: "重新开启",
          onAction: [
            {
              $action: "sendHttpRequest",
              method: "PATCH",
              url: "",
              data: {
                $operation: {
                  type: "reopenOrder"
                },
                $stateProperties: ["executionState"],
              },
              $exps: {
                "url": "'/api/mom/mom_work_orders/' + $rui.parseQuery().id",
              },
            },
            {
              $action: "antdMessage",
              title: "工单已重新开启。",
              onClose: [
                {
                  $action: "reloadPage",
                },
              ],
            },
          ],
          $exps: {
            _hidden: "!($stores.detail?.data?.list[0]?.executionState == 'canceled')",
          },
        },
      ],
    },
    {
      $type: "rapidEntityForm",
      entityCode: "MomWorkOrder",
      mode: "view",
      column: 3,
      items: [
        {
          type: "auto",
          code: "code",
        },
        {
          type: "auto",
          code: "material",
          rendererType: "rapidLinkRenderer",
          rendererProps: {
            text: "{{code}} {{name}}",
            url: "/pages/base_material_details?id={{id}}",
          },
        },
        {
          type: "auto",
          code: "quantity",
        },
        {
          type: "auto",
          code: "unit",
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          type: "auto",
          code: "assignmentState",
        },
        {
          type: "auto",
          code: "executionState",
        },
        {
          type: "auto",
          code: "createdAt",
        },
      ],
      $exps: {
        entityId: "$rui.parseQuery().id",
      },
    },
    {
      $type: "antdTabs",
      items: [
        {
          key: "workReports",
          label: "报工记录",
          children: [
            {
              $type: "sonicEntityList",
              entityCode: "MomWorkReport",
              viewMode: "table",
              fixedFilters: [
                {
                  field: "work_order_id",
                  operator: "eq",
                  value: "",
                },
              ],
              orderBy: [
                {
                  field: "id",
                },
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
              columns: [
                {
                  type: "auto",
                  code: "createdAt",
                  title: "报工时间",
                  width: "150px",
                },
                {
                  type: "auto",
                  code: "routeProcess",
                  width: "150px",
                  fixed: "left",
                  rendererProps: {
                    format: "{{aliasName}}",
                  },
                },
                {
                  type: "auto",
                  code: "qualifiedQuantity",
                  width: "80px",
                },
                {
                  type: "auto",
                  code: "unqualifiedQuantity",
                  width: "80px",
                },
                {
                  type: "auto",
                  code: "scrapQuantity",
                  width: "80px",
                },
                {
                  type: "auto",
                  code: "unit",
                  width: "50px",
                  rendererProps: {
                    format: "{{name}}",
                  },
                },
                {
                  type: "auto",
                  code: "equipment",
                  width: "150px",
                  rendererProps: {
                    format: "{{code}} {{name}}",
                  },
                },
                {
                  type: "auto",
                  code: "operators",
                  width: "150px",
                  rendererProps: {
                    format: "{{name}}",
                  },
                },
              ],
              actions: [
                {
                  $type: "sonicRecordActionEditEntity",
                  code: "edit",
                  actionType: "edit",
                  actionText: "修改",
                },
                {
                  $type: "sonicRecordActionDeleteEntity",
                  code: "delete",
                  actionType: "delete",
                  actionText: "删除",
                  dataSourceCode: "list",
                  entityCode: "MomWorkReport",
                },
              ],
              newForm: cloneDeep(reportFormConfig),
              editForm: cloneDeep(reportFormConfig),
              $exps: {
                "fixedFilters[0].value": "$rui.parseQuery().id",
                "newForm.fixedFields.work_order_id": "$rui.parseQuery().id",
              },
            },
          ],
        },
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
                },
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
              columns: [
                {
                  type: "link",
                  code: "code",
                  width: "200px",
                  fixed: "left",
                  rendererType: "link",
                  rendererProps: {
                    url: "/pages/mom_work_task_details?id={{id}}",
                  },
                },
                {
                  type: "auto",
                  code: "routeProcess",
                  width: "150px",
                  fixed: "left",
                  rendererProps: {
                    format: "{{aliasName}}",
                  },
                },
                {
                  type: "auto",
                  code: "quantity",
                  width: "80px",
                },
                {
                  type: "auto",
                  code: "unit",
                  width: "50px",
                  rendererProps: {
                    format: "{{name}}",
                  },
                },
                {
                  type: "auto",
                  code: "equipment",
                  width: "150px",
                  rendererProps: {
                    format: "{{code}} {{name}}",
                  },
                },
                {
                  type: "auto",
                  code: "assignees",
                  width: "150px",
                  rendererProps: {
                    format: "{{name}}",
                  },
                },
                {
                  type: "auto",
                  code: "deadline",
                  width: "150px",
                },
                {
                  type: "auto",
                  code: "assigner",
                  width: "100px",
                  rendererProps: {
                    format: "{{name}}",
                  },
                },
                {
                  type: "auto",
                  code: "assignedAt",
                  width: "150px",
                },
                {
                  type: "auto",
                  code: "acceptedAt",
                  width: "150px",
                },
                {
                  type: "auto",
                  code: "assignmentState",
                  width: "100px",
                },
                {
                  type: "auto",
                  code: "executionState",
                  width: "100px",
                },
              ],
              actions: [
                {
                  $type: "sonicRecordActionEditEntity",
                  code: "edit",
                  actionType: "edit",
                  actionText: "修改",
                },
                {
                  $type: "sonicRecordActionDeleteEntity",
                  code: "delete",
                  actionType: "delete",
                  actionText: "删除",
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
            },
          ],
        },
      ],
    },
  ],
};

export default page;

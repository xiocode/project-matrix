import { cloneDeep } from "lodash";
import type { RapidPage, RapidEntityFormConfig } from "@ruiapp/rapid-extension";

const stepRoleFormConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      type: "auto",
      code: "workItemTypeStep",
      listDataFindOptions: {
        filters: [
          {
            operator: "exists",
            field: "workItemType",
            filters: [
              {
                operator: "eq",
                field: "id",
                value: "",
              },
            ],
          },
        ],
        $exps: {
          "filters[0].filters[0].value": "$rui.parseQuery().workItemTypeId",
        },
      },
    },
    {
      type: "auto",
      code: "projectRole",
      listDataFindOptions: {
        filters: [
          {
            operator: "exists",
            field: "project",
            filters: [
              {
                operator: "eq",
                field: "id",
                value: "",
              },
            ],
          },
        ],
        $exps: {
          "filters[0].filters[0].value": "$rui.parseQuery().projectId",
        },
      },
    },
  ],
};

const page: RapidPage = {
  code: "pm_project_work_item_type_settings",
  name: "项目工作项类型设置",
  title: "项目工作项类型设置",
  permissionCheck: { any: ["pmProject.setting"] },
  view: [
    {
      $type: "rapidEntityForm",
      entityCode: "PmProjectWorkItemType",
      mode: "view",
      column: 2,
      items: [
        {
          type: "auto",
          code: "project",
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          type: "auto",
          code: "workItemType",
          rendererProps: {
            format: "{{name}}",
          },
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
          key: "stepRoles",
          label: "步骤角色",
          children: [
            {
              $id: "projectLogList",
              $type: "sonicEntityList",
              entityCode: "PmProjectWorkItemStepRole",
              viewMode: "table",
              selectionMode: "none",
              fixedFilters: [
                {
                  field: "project",
                  operator: "exists",
                  filters: [
                    {
                      field: "id",
                      operator: "eq",
                      value: "",
                    },
                  ],
                },
                {
                  field: "workItemType",
                  operator: "exists",
                  filters: [
                    {
                      field: "id",
                      operator: "eq",
                      value: "",
                    },
                  ],
                },
              ],
              listActions: [
                {
                  $type: "sonicToolbarNewEntityButton",
                  text: "新建",
                  icon: "PlusOutlined",
                  actionStyle: "primary",
                },
                // {
                //   $type: "sonicToolbarRefreshButton",
                //   text: "刷新",
                //   icon: "ReloadOutlined",
                // },
              ],
              pageSize: 20,
              columns: [
                {
                  type: "auto",
                  code: "workItemTypeStep",
                  width: "150px",
                  rendererProps: {
                    format: "{{name}}",
                  },
                },
                {
                  type: "auto",
                  code: "projectRole",
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
                  entityCode: "PmProjectWorkItemStepRole",
                },
              ],
              newForm: cloneDeep(stepRoleFormConfig),
              editForm: cloneDeep(stepRoleFormConfig),
              $exps: {
                "fixedFilters[0].filters[0].value": "$rui.parseQuery().projectId",
                "fixedFilters[1].filters[0].value": "$rui.parseQuery().workItemTypeId",
                "newForm.fixedFields.project_id": "$rui.parseQuery().projectId",
                "newForm.fixedFields.work_item_type_id": "$rui.parseQuery().workItemTypeId",
              },
            },
          ],
        },
      ],
    },
  ],
};

export default page;

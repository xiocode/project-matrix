import type { RapidEntityFormConfig, RapidPage } from "@ruiapp/rapid-extension";
import { cloneDeep } from "lodash";

const stepFormConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      type: "auto",
      code: "name",
    },
    {
      type: "textarea",
      code: "description",
    },
    {
      type: "auto",
      code: "orderNum",
    },
    {
      type: "auto",
      code: "state",
    },
  ],
  defaultFormFields: {
    state: "enabled",
  },
};

const page: RapidPage = {
  code: "pm_work_item_details",
  //@ts-ignore
  parentCode: "pm_work_item_list",
  name: "工作项详情",
  title: "工作项详情",
  permissionCheck: { any: ["pmWorkItem.view"] },
  view: [
    {
      $type: "rapidEntityForm",
      entityCode: "PmWorkItem",
      mode: "view",
      column: 3,
      items: [
        {
          type: "auto",
          code: "code",
        },
        {
          type: "auto",
          code: "title",
        },
        {
          type: "auto",
          code: "workItemType",
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          type: "auto",
          code: "project",
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          type: "auto",
          code: "milestone",
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          type: "auto",
          code: "createdAt",
        },
        {
          type: "auto",
          code: "assignee",
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          type: "auto",
          code: "assigner",
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          type: "auto",
          code: "state",
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
          key: "steps",
          label: "步骤",
          children: [
            {
              $id: "projectLogList",
              $type: "sonicEntityList",
              entityCode: "PmWorkItemTypeStep",
              viewMode: "table",
              selectionMode: "none",
              fixedFilters: [
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
              orderBy: [
                {
                  field: "orderNum",
                },
              ],
              columns: [
                {
                  type: "auto",
                  code: "orderNum",
                  width: "100px",
                },
                {
                  type: "auto",
                  code: "name",
                  width: "200px",
                },
                {
                  type: "auto",
                  code: "description",
                },
                {
                  type: "auto",
                  code: "state",
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
                  entityCode: "PmWorkItemTypeStep",
                },
              ],
              newForm: cloneDeep(stepFormConfig),
              editForm: cloneDeep(stepFormConfig),
              $exps: {
                "fixedFilters[0].filters[0].value": "$rui.parseQuery().id",
                "newForm.fixedFields.work_item_type_id": "$rui.parseQuery().id",
              },
            },
          ],
        },
      ],
    },
  ],
};

export default page;

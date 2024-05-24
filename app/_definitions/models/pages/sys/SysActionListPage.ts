import { cloneDeep } from "lodash";
import type { RapidPage, RapidEntityFormRockConfig } from "@ruiapp/rapid-extension";

const actionFormConfig: Partial<RapidEntityFormRockConfig> = {
  items: [
    {
      type: "auto",
      code: "group",
      formControlProps: {
        listOrderBy: [
          {
            field: "orderNum",
          },
        ],
      },
    },
    {
      type: "auto",
      code: "name",
    },
    {
      type: "auto",
      code: "code",
    },
    {
      type: "textarea",
      code: "description",
    },
    {
      type: "auto",
      code: "orderNum",
    },
  ],
};

const actionGroupFormConfig: Partial<RapidEntityFormRockConfig> = {
  items: [
    {
      type: "auto",
      code: "code",
    },
    {
      type: "auto",
      code: "name",
    },
    {
      type: "auto",
      code: "orderNum",
    },
  ],
};

const page: RapidPage = {
  code: "sys_action_list",
  name: "系统操作",
  title: "系统操作",
  permissionCheck: {
    any: ["dev.manage"],
    all: [],
  },
  view: [
    {
      $type: "antdTabs",
      items: [
        {
          key: "actions",
          label: "系统操作",
          children: [
            {
              $type: "sonicEntityList",
              entityCode: "SysAction",
              viewMode: "table",
              fixedFilters: [],
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
              columns: [
                {
                  type: "auto",
                  code: "orderNum",
                  width: "100px",
                },
                {
                  type: "auto",
                  code: "group",
                  width: "150px",
                  rendererProps: {
                    format: "{{name}}",
                  },
                },
                {
                  type: "auto",
                  code: "name",
                  width: "200px",
                },
                {
                  type: "auto",
                  code: "code",
                  width: "250px",
                },
                {
                  type: "auto",
                  code: "description",
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
                  entityCode: "SysAction",
                },
              ],
              newForm: cloneDeep(actionFormConfig),
              editForm: cloneDeep(actionFormConfig),
            },
          ],
        },
        {
          key: "actionGroups",
          label: "操作分组",
          children: [
            {
              $type: "sonicEntityList",
              entityCode: "SysActionGroup",
              viewMode: "table",
              fixedFilters: [],
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
              columns: [
                {
                  type: "auto",
                  code: "orderNum",
                  width: "100px",
                },
                {
                  type: "auto",
                  code: "code",
                  width: "150px",
                },
                {
                  type: "auto",
                  code: "name",
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
                  entityCode: "SysActionGroup",
                },
              ],
              newForm: cloneDeep(actionGroupFormConfig),
              editForm: cloneDeep(actionGroupFormConfig),
            },
          ],
        },
      ],
    },
  ],
};

export default page;

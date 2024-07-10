import { cloneDeep } from "lodash";
import type { RapidPage, RapidEntityFormRockConfig, SonicEntityListRockConfig } from "@ruiapp/rapid-extension";

const itemFormConfig: Partial<RapidEntityFormRockConfig> = {
  items: [
    {
      type: "auto",
      code: "group",
      formControlProps: {
        listOrderBy: [
          {
            field: "code",
          },
        ],
      },
    },
    {
      type: "auto",
      code: "orderNum",
    },
    {
      type: "auto",
      code: "type",
    },
    {
      type: "auto",
      code: "code",
    },
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
      code: "config",
    },
  ],
};

const itemGroupFormConfig: Partial<RapidEntityFormRockConfig> = {
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
      type: "textarea",
      code: "description",
    },
  ],
};

const page: RapidPage = {
  code: "dev_system_setting_item_setting",
  name: "系统设置项管理",
  title: "系统设置项管理",
  permissionCheck: {
    any: ["dev.manage"],
    all: [],
  },
  view: [
    {
      $type: "sonicMainSecondaryLayout",
      $id: "dictionariesLayout",
      mainTitle: "设置项分组",
      mainColSpan: 8,
      secondaryTitle: "设置项",
      secondaryColSpan: 16,
      main: {
        $type: "sonicEntityList",
        entityCode: "SystemSettingGroupSetting",
        viewMode: "table",
        selectionMode: "single",
        selectOnClickRow: true,
        fixedFilters: [],
        orderBy: [
          {
            field: "code",
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
        pageSize: -1,
        columns: [
          {
            type: "auto",
            code: "code",
            width: "100px",
          },
          {
            type: "auto",
            code: "name",
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
            entityCode: "SystemSettingGroupSetting",
          },
        ],
        newForm: cloneDeep(itemGroupFormConfig),
        editForm: cloneDeep(itemGroupFormConfig),
      } as SonicEntityListRockConfig,
      secondary: [
        {
          $type: "sonicEntityList",
          entityCode: "SystemSettingItemSetting",
          viewMode: "table",
          fixedFilters: [
            {
              field: "group_id",
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
          pageSize: -1,
          orderBy: [
            {
              field: "orderNum",
            },
          ],
          columns: [
            {
              type: "auto",
              code: "orderNum",
              width: "80px",
            },
            {
              type: "auto",
              code: "type",
              width: "100px",
            },
            {
              type: "auto",
              code: "code",
              width: "250px",
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
              entityCode: "SystemSettingItemSetting",
            },
          ],
          newForm: cloneDeep(itemFormConfig),
          editForm: cloneDeep(itemFormConfig),
          $exps: {
            _hidden: "!$scope.vars.activeId",
            "fixedFilters[0].value": "$scope.vars.activeId",
            "newForm.fixedFields.group_id": "$scope.vars.activeId",
          },
        },
      ],
    },
  ],
};

export default page;

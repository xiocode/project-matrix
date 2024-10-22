import type {RapidEntityFormConfig, RapidPage} from "@ruiapp/rapid-extension";
import {cloneDeep} from "lodash";

const formConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      type: "auto",
      code: "process",
      required: true,
    },
    {
      type: "auto",
      code: "app",
      required: true,
    },
    {
      type: "auto",
      code: "printTemplate",
    },
    {
      type: "auto",
      code: "config",
    },
  ],
};

const page: RapidPage = {
  code: "shopfloor_display_device_details",
  //@ts-ignore
  parentCode: "shopfloor_display_device_list",
  name: "展示设备详情",
  title: "展示设备详情",
  view: [
    {
      $type: "rapidEntityForm",
      entityCode: "ShopfloorDisplayDevice",
      mode: "view",
      column: 3,
      items: [
        {
          type: "auto",
          code: "name",
        },
        {
          type: "auto",
          code: "code",
        },
        {
          type: "auto",
          code: "identifier",
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
          key: "items",
          label: "功能列表",
          children: [
            {
              $id: "shopfloorDisplayDeviceFeature",
              $type: "sonicEntityList",
              entityCode: "ShopfloorDisplayDeviceFeature",
              viewMode: "table",
              selectionMode: "none",
              fixedFilters: [
                {
                  field: "display_device_id",
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
                  field: "createdAt",
                },
              ],
              columns: [
                {
                  type: "auto",
                  code: "process",
                },
                {
                  type: "auto",
                  code: "app",
                },
                {
                  type: "auto",
                  code: "printTemplate",
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
                  entityCode: "ShopfloorDisplayDeviceFeature",
                },
              ],
              newForm: cloneDeep(formConfig),
              editForm: cloneDeep(formConfig),
              $exps: {
                "fixedFilters[0].value": "$rui.parseQuery().id",
                "newForm.fixedFields.displayDevice": "$rui.parseQuery().id",
              },
            },
          ],
        },
      ],
    },
  ],
};

export default page;

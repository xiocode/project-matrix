import { cloneDeep } from "lodash";
import type { RapidPage, RapidEntityFormConfig } from "@ruiapp/rapid-extension";

const formConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      type: "auto",
      code: "factory",
    },
    {
      type: "auto",
      code: "code",
      required: true,
    },
    {
      type: "auto",
      code: "identifier",
      required: true,
    },
    {
      type: "auto",
      code: "name",
      label: "设备名称",
      required: true,
    },
    {
      type: "auto",
      code: "config",
    },
    {
      type: "textarea",
      code: "description",
    },
  ],
};

const page: RapidPage = {
  code: "shopfloor_display_device_list",
  name: "显示设备管理",
  title: "显示设备管理",
  // permissionCheck: {any: [""]},
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "ShopfloorDisplayDevice",
      viewMode: "table",
      selectionMode: "none",
      listActions: [
        {
          $type: "sonicToolbarNewEntityButton",
          text: "新建",
          icon: "PlusOutlined",
          actionStyle: "primary",
        },
      ],
      extraActions: [
        {
          $type: "sonicToolbarFormItem",
          formItemType: "search",
          placeholder: "搜索设备名称",
          actionEventName: "onSearch",
          filterMode: "contains",
          filterFields: ["name"],
        },
      ],
      extraProperties: ["description"],
      orderBy: [
        {
          field: "createdAt",
          desc: true,
        },
      ],
      pageSize: 20,
      columns: [
        {
          type: "auto",
          code: "factory",
        },
        {
          type: "auto",
          code: "code",
        },
        {
          type: "link",
          code: "identifier",
          width: "150px",
          fixed: "left",
          rendererType: "link",
          rendererProps: {
            url: "/pages/shopfloor_display_device_details?id={{id}}",
          },
        },
        {
          type: "auto",
          code: "name",
          title: "设备名称",
        },
        {
          type: "auto",
          code: "createdAt",
          width: "150px",
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
          entityCode: "ShopfloorDisplayDevice",
        },
      ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
    },
  ],
};

export default page;

import { cloneDeep } from "lodash";
import type { RapidPage, RapidEntityFormConfig } from "@ruiapp/rapid-extension";

const formConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      type: "auto",
      code: "category",
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
      code: "state",
    },
    {
      type: "auto",
      code: "flowConfig",
    },
    {
      type: "auto",
      code: "formConfig",
    },
    {
      type: "auto",
      code: "listConfig",
    },
    {
      type: "auto",
      code: "advancedConfig",
    },
  ],
};

const page: RapidPage = {
  code: "bpm_process_list",
  name: "业务流程定义",
  title: "业务流程定义",
  permissionCheck: { any: [] },
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "BpmProcess",
      viewMode: "table",
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
          placeholder: "Search",
          actionEventName: "onSearch",
          filterMode: "contains",
          filterFields: ["name"],
        },
      ],
      orderBy: [
        {
          field: "name",
        },
      ],
      pageSize: 20,
      columns: [
        {
          type: "auto",
          code: "name",
          width: "100px",
        },
        {
          type: "auto",
          width: "200px",
          code: "description",
        },
        {
          type: "auto",
          width: "100px",
          code: "state",
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
          entityCode: "BpmProcess",
        },
      ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
    },
  ],
};

export default page;

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
      code: "code",
      required: false,
    },
    {
      type: "auto",
      code: "type",
      formControlType: "rapidSelect",
      formControlProps: {
        listTextFieldName: "name",
        listValueFieldName: "value",
        listDataSource: {
          data: {
            list: [
              { name: "updateEntityApproval", value: "updateEntityApproval" },
              { name: "operationApproval", value: "operationApproval" },
            ],
          },
        },
      },
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
      code: "typeConfig",
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
          placeholder: "搜索名称",
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
          code: "type",
          width: "200px",
        },
        {
          type: "auto",
          code: "code",
          width: "250px",
        },
        {
          type: "auto",
          code: "name",
          width: "150px",
        },
        {
          type: "auto",
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

import { cloneDeep } from "lodash";
import type { RapidPage, RapidEntityFormConfig } from "@ruiapp/rapid-extension";

const formConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      type: "auto",
      code: "project",
    },
    {
      type: "auto",
      code: "title",
    },
    {
      type: "textarea",
      code: "content",
    },
  ],
};

const page: RapidPage = {
  code: "pm_project_event_list",
  name: "事件记录",
  title: "事件记录",
  permissionCheck: { any: ["pmProject.manage"] },
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "PmProjectEvent",
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
          placeholder: "Search",
          actionEventName: "onSearch",
          filterMode: "contains",
          filterFields: ["code", "name"],
        },
      ],
      pageSize: 20,
      orderBy: [
        {
          field: "createdAt",
          desc: true,
        },
      ],
      columns: [
        {
          type: "auto",
          code: "createdAt",
          width: "150px",
        },
        {
          type: "auto",
          code: "project",
          width: "250px",
          rendererType: "rapidLinkRenderer",
          rendererProps: {
            text: "{{code}} {{name}}",
            url: "/pages/pm_project_details?id={{id}}",
          },
        },
        {
          type: "auto",
          code: "title",
          width: "150px",
        },
        {
          type: "auto",
          code: "content",
        },
        {
          type: "auto",
          code: "createdBy",
          width: "100px",
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          type: "auto",
          code: "updatedAt",
          width: "150px",
        },
        {
          type: "auto",
          code: "updatedBy",
          width: "100px",
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
          entityCode: "PmProjectEvent",
        },
      ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
    },
  ],
};

export default page;

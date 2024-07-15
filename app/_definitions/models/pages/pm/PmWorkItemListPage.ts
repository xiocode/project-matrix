import { cloneDeep } from "lodash";
import type { RapidPage, RapidEntityFormConfig } from "@ruiapp/rapid-extension";

const formConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      type: "auto",
      code: "parent",
      listDataFindOptions: {
        orderBy: [
          {
            field: "id",
            desc: true,
          },
        ],
      },
      formControlProps: {
        listTextFieldName: "title",
      },
    },
    {
      type: "auto",
      code: "workItemType",
    },
    {
      type: "auto",
      code: "title",
    },
    {
      type: "textarea",
      code: "description",
    },
    {
      type: "auto",
      code: "project",
    },
    {
      type: "auto",
      code: "milestone",
      listDataFindOptions: {
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
        ],
        $exps: {
          "fixedFilters[0].filters[0].value": "$scope.vars.active_project_id",
        },
      },
      formControlProps: {
        $exps: {
          disabled: "!$self.form.getFieldValue('project')",
        },
      },
    },
    {
      type: "auto",
      code: "assignee",
    },
    {
      type: "auto",
      code: "scheduledStartTime",
    },
    {
      type: "auto",
      code: "scheduledCompleteTime",
    },
    {
      type: "auto",
      code: "estimate",
    },
    {
      type: "auto",
      code: "state",
    },
  ],
  defaultFormFields: {
    state: "pending",
  },
  onValuesChange: [
    {
      $action: "script",
      script: `
        const changedValues = event.args[0] || {};
        if(changedValues.hasOwnProperty('project')) {
          event.scope.setVars({
            active_project_id: changedValues.project,
          }, true);
          event.page.sendComponentMessage(event.sender.$id, {
            name: "setFieldsValue",
            payload: {
              milestone: null,
            },
          });
          event.scope.loadStoreData('dataFormItemList-milestone');
        }
      `,
    },
  ],
};

const page: RapidPage = {
  code: "pm_work_item_list",
  name: "工作项列表",
  title: "工作项",
  permissionCheck: { any: ["pmWorkItem.view"] },
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "PmWorkItem",
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
          filterFields: ["code", "title"],
        },
      ],
      orderBy: [
        {
          field: "id",
          desc: true,
        },
      ],
      pageSize: 20,
      columns: [
        {
          type: "auto",
          code: "code",
          width: "100px",
        },
        {
          type: "auto",
          code: "workItemType",
          width: "100px",
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          type: "link",
          code: "title",
          rendererProps: {
            url: "/pages/pm_work_item_details?id={{id}}",
          },
        },
        {
          type: "auto",
          code: "project",
          width: "200px",
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          type: "auto",
          code: "milestone",
          width: "200px",
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          type: "auto",
          code: "assignee",
          width: "100px",
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          type: "auto",
          code: "assigner",
          width: "80px",
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          type: "auto",
          code: "state",
          width: "80px",
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
          entityCode: "PmWorkItem",
        },
      ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
    },
  ],
};

export default page;

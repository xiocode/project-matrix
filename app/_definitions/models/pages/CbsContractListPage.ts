import { cloneDeep } from "lodash";
import type { RapidPage, RapidEntityFormConfig } from "@ruiapp/rapid-extension";

const formConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      type: "auto",
      code: "kind",
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
      type: "auto",
      code: "description",
    },
    {
      type: "auto",
      code: "project",
      formControlProps: {
        dropdownMatchSelectWidth: 300,
        listTextFormat: "{{code}} {{name}}",
        listFilterFields: ["name", "code"],
        columns: [
          { code: "code", title: "编号", width: 120 },
          { code: "name", title: "名称", width: 120 },
        ],
      },
    },
    {
      type: "auto",
      code: "salesman",
    },
    {
      type: "auto",
      code: "totalAmount",
    },
    {
      type: "auto",
      code: "state",
    },
  ],
};

const page: RapidPage = {
  code: "cbs_contract_list",
  name: "合同列表",
  title: "合同列表",
  permissionCheck: { any: ["cbsContract.view", "cbsContract.new", "cbsContract.manage", "cbsContract.delete"] },
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "CbsContract",
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
          placeholder: "搜索名称、编号",
          actionEventName: "onSearch",
          filterMode: "contains",
          filterFields: ["code", "name"],
        },
      ],
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
          code: "kind",
          fixed: "left",
          width: "100px",
        },
        {
          type: "auto",
          code: "code",
          fixed: "left",
          width: "100px",
        },
        {
          type: "link",
          code: "name",
          fixed: "left",
          rendererProps: {
            url: "/pages/cbs_contract_details?id={{id}}",
          },
        },
        {
          type: "auto",
          code: "project",
          rendererType: "rapidLinkRenderer",
          rendererProps: {
            text: "{{code}} {{name}}",
            url: "/pages/pm_project_details?id={{id}}",
          },
        },
        {
          type: "auto",
          code: "salesman",
          fieldName: "salesman.name",
          width: "100px",
        },
        {
          type: "auto",
          code: "totalAmount",
          width: "120px",
          align: "right",
          rendererType: "rapidCurrencyRenderer",
        },
        {
          type: "auto",
          code: "state",
          width: "100px",
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
          entityCode: "CbsContract",
        },
      ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
    },
  ],
};

export default page;

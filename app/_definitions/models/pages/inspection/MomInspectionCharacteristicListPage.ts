import { cloneDeep } from "lodash";
import type { RapidPage, RapidEntityFormConfig } from "@ruiapp/rapid-extension";

const formConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      type: "auto",
      code: "name",
    },
    {
      type: "auto",
      code: "rule",
    },
    {
      type: "auto",
      code: "skippable",
    },
    {
      type: "auto",
      code: "category",
    },
    {
      type: "auto",
      code: "method",
    },
    {
      type: "auto",
      code: "instrumentCategory",
    },
    {
      type: "auto",
      code: "instrument",
    },
    {
      type: "auto",
      code: "kind",
    },
    {
      type: "auto",
      code: "determineType",
    },
    {
      type: "auto",
      code: "norminal",
    },
    {
      type: "auto",
      code: "upperTol",
    },
    {
      type: "auto",
      code: "lowerTol",
    },
    {
      type: "auto",
      code: "upperLimit",
    },
    {
      type: "auto",
      code: "lowerLimit",
    },
  ],
};

const page: RapidPage = {
  code: "mom_inspection_characteristic_list",
  name: "检验特征",
  title: "检验特征",
  permissionCheck: { any: [] },
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "MomInspectionCharacteristic",
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
          field: "rule",
        },
      ],
      pageSize: 20,
      columns: [
        {
          type: "auto",
          code: "name",
        },
        {
          type: "auto",
          code: "rule",
        },
        {
          type: "auto",
          code: "skippable",
        },
        {
          type: "auto",
          code: "category",
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          type: "auto",
          code: "method",
        },
        {
          type: "auto",
          code: "instrumentCategory",
        },
        {
          type: "auto",
          code: "instrument",
        },
        {
          type: "auto",
          code: "determineType",
        },
        {
          type: "auto",
          code: "kind",
        },
        {
          type: "auto",
          code: "norminal",
        },
        {
          type: "auto",
          code: "upperTol",
        },
        {
          type: "auto",
          code: "lowerTol",
        },
        {
          type: "auto",
          code: "upperLimit",
        },
        {
          type: "auto",
          code: "lowerLimit",
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
          entityCode: "MomInspectionCharacteristic",
        },
      ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
    },
  ],
};

export default page;

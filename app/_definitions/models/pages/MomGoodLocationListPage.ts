import { cloneDeep } from "lodash";
import type { RapidPage, RapidEntityFormConfig } from "@ruiapp/rapid-extension";

const formConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      type: "auto",
      code: "good",
      formControlProps: {
        listTextFormat: "{{lotNum}} / {{serialNum}}",
        listFilterFields: ["label"],
      },
    },
    {
      type: "treeSelect",
      code: "location",
      formControlProps: {
        listDataSourceCode: "locations",
        listParentField: "parent.id",
      },
    },
    {
      type: "auto",
      code: "putInTime",
    },
    {
      type: "auto",
      code: "takeOutTime",
    },
  ],
};

const page: RapidPage = {
  code: "mom_good_location_list",
  name: "物品位置",
  title: "物品位置",
  // permissionCheck: {any: []},
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "MomGoodLocation",
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
          filterFields: ["good"],
        },
      ],
      fixedFilters: [
        {
          field: "take_out_time",
          operator: "null",
        },
      ],
      orderBy: [
        {
          field: "putInTime",
          desc: true,
        },
      ],
      pageSize: 20,
      columns: [
        {
          type: "auto",
          code: "good",
          rendererProps: {
            format: "{{lotNum}} / {{serialNum}}",
          },
        },
        {
          type: "auto",
          title: "数量",
          code: "id",
          fieldName: "good.quantity",
          width: "100px",
        },
        {
          type: "auto",
          code: "location",
          width: "200px",
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          type: "auto",
          code: "putInTime",
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
          entityCode: "MomGoodLocation",
        },
      ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
      stores: [
        {
          type: "entityStore",
          name: "locations",
          entityCode: "BaseLocation",
          properties: ["id", "type", "code", "name", "parent", "orderNum", "createdAt"],
          filters: [],
          orderBy: [
            {
              field: "orderNum",
            },
          ],
        },
      ],
    },
  ],
};

export default page;

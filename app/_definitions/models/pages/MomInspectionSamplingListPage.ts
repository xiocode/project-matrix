import { cloneDeep } from "lodash";
import type { RapidPage, RapidEntityFormConfig } from "@ruiapp/rapid-extension";

const formConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      code: "materialCategory",
      type: "auto",
    },
  ],
};

const page: RapidPage = {
  code: "mom_inspection_sampling_list",
  name: "抽样规则列表",
  title: "抽样规则列表",
  // permissionCheck: {any: ["warehouseStrategy.manage"]},
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "MomInspectionSampling",
      viewMode: "table",
      selectionMode: "none",
      orderBy: [
        {
          field: "id",
        },
      ],
      listActions: [
        {
          $type: "sonicToolbarNewEntityButton",
          text: "新建",
          icon: "PlusOutlined",
          actionStyle: "primary",
          // $permissionCheck: "warehouseStrategy.manage",
        },
      ],
      extraActions: [
        {
          $type: "sonicToolbarFormItem",
          formItemType: "search",
          placeholder: "搜索名称、编号",
          actionEventName: "onSearch",
          filterMode: "contains",
          filterFields: [
            {
              field: "materialCategory",
              operator: "exists",
              filters: [
                {
                  operator: "or",
                  filters: [
                    {
                      field: "name",
                      operator: "contains",
                    },
                    {
                      field: "code",
                      operator: "contains",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      columns: [
        {
          type: "link",
          code: "materialCategory",
          rendererType: "rapidLinkRenderer",
          rendererProps: {
            text: "{{materialCategory.code}}-{{materialCategory.name}}",
            url: "/pages/mom_inspection_sampling_details?id={{id}}",
          },
          width: "200px",
        },
        {
          code: "createdAt",
          type: "auto",
        },
      ],
      actions: [
        {
          $type: "sonicRecordActionEditEntity",
          code: "edit",
          actionType: "edit",
          actionText: "修改",
          // $permissionCheck: "warehouseStrategy.manage",
        },
        {
          $type: "sonicRecordActionDeleteEntity",
          code: "delete",
          actionType: "delete",
          actionText: "删除",
          dataSourceCode: "list",
          entityCode: "MomInspectionSampling",
          // $permissionCheck: "warehouseStrategy.manage",
        },
      ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
    },
  ],
};

export default page;

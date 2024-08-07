import { cloneDeep } from "lodash";
import type { RapidPage, RapidEntityFormConfig } from "@ruiapp/rapid-extension";

const formConfig: Partial<RapidEntityFormConfig> = {
  items: [],
};

const page: RapidPage = {
  code: "mom_inventory_search_list",
  name: "库存查询列表",
  title: "库存查询",
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "MomMaterialInventoryBalance",
      viewMode: "table",
      selectionMode: "none",
      listActions: [],
      extraActions: [
        {
          $type: "sonicToolbarFormItem",
          formItemType: "search",
          placeholder: "Search",
          actionEventName: "onSearch",
          filterMode: "contains",
          filterFields: [
            {
              field: "material",
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
                    {
                      field: "specification",
                      operator: "contains",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      pageSize: 20,
      relations: {
        material: {
          properties: ["id", "code", "name", "specification", "category"],
        },
      },
      columns: [
        {
          type: "auto",
          code: "material.code",
          title: "物料编号",
          // rendererProps: {
          //   format: "{{code}}",
          // },
        },
        {
          type: "auto",
          code: "material.name",
          title: "物料名称",
          // rendererProps: {
          //   format: "{{name}}",
          // },
        },
        {
          type: "auto",
          code: "material.specification",
          title: "规格",
          // rendererProps: {
          //   format: "{{specification}}",
          // },
        },
        {
          type: "auto",
          code: "material",
          title: "物料类型",
          rendererProps: {
            format: "{{category.name}}",
          },
        },
        {
          type: "auto",
          title: "库存数量",
          code: "onHandQuantity",
          width: "120px",
        },
        {
          type: "auto",
          code: "unit",
          width: "100px",
          rendererProps: {
            format: "{{name}}",
          },
        },
      ],
      actionsColumnWidth: "200px",
      actions: [
        {
          $type: "inventoryDetailViewer",
          contentType: "locationDetail",
          actionText: "库位明细",
        },
        {
          $type: "inventoryDetailViewer",
          contentType: "lotNumDetail",
          actionText: "批次明细",
        },
        {
          $type: "inventoryDetailViewer",
          contentType: "binNumDetail",
          actionText: "组托明细",
        },
      ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
    },
  ],
};

export default page;

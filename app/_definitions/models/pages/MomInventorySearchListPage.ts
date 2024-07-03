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
          filterFields: ["name"],
        },
      ],
      pageSize: 20,
      columns: [
        {
          type: "auto",
          code: "material",
          title: "物料编码",
          rendererProps: {
            format: "{{code}}",
          },
        },
        {
          type: "auto",
          code: "material",
          title: "物料名称",
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          type: "auto",
          code: "material",
          title: "规格",
          rendererProps: {
            format: "{{specification}}",
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
          $type: "sonicRecordActionEditEntity",
          code: "inventory",
          actionType: "edit",
          actionText: "库存明细",
        },
        {
          $type: "sonicRecordActionEditEntity",
          code: "lotNum",
          actionType: "edit",
          actionText: "批次明细",
        },
        {
          $type: "sonicRecordActionEditEntity",
          code: "binNum",
          actionType: "edit",
          actionText: "组托明细",
        },
      ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
    },
  ],
};

export default page;

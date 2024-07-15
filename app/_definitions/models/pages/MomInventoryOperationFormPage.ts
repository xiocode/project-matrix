import type { RapidPage } from "@ruiapp/rapid-extension";

const page: RapidPage = {
  code: "mom_inventory_operation_form",
  parentCode: "mom_inventory_operation_list",
  name: "新建库存操作",
  title: "新建库存操作",
  // permissionCheck: {any: []},
  view: [
    {
      $type: "inventoryOperationForm",
    },
  ],
};

export default page;

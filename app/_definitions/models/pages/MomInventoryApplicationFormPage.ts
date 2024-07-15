import type { RapidPage } from "@ruiapp/rapid-extension";

const page: RapidPage = {
  code: "mom_inventory_application_form",
  parentCode: "mom_inventory_application_list",
  name: "新建库存业务申请",
  title: "新建库存业务申请",
  permissionCheck: { any: [] },
  view: [
    {
      $type: "inventoryApplicationForm",
    },
  ],
};

export default page;

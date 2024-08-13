import type { RapidPage } from "@ruiapp/rapid-extension";

const page: RapidPage = {
  code: "mom_inspection_finishedstock_list",
  name: "成品检测数据",
  title: "成品检测数据",
  permissionCheck: { any: [] },
  view: [
    {
      $type: "inspectionFinishedStockList",
      $exps: {
        entityId: "$rui.parseQuery().id",
      },
    },
  ],
};

export default page;

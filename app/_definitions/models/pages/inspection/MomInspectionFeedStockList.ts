import type { RapidPage } from "@ruiapp/rapid-extension";

const page: RapidPage = {
  code: "mom_inspection_feedstock_list",
  name: "进料检测数据",
  title: "进料检测数据",
  permissionCheck: { any: [] },
  view: [
    {
      $type: "inspectionFeedStockList",
      $exps: {
        entityId: "$rui.parseQuery().id",
      },
    },
  ],
};

export default page;

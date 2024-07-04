import type { RapidPage, SonicEntityListRockConfig } from "@ruiapp/rapid-extension";

const page: RapidPage = {
  code: "my_notifications",
  name: "我的消息通知列表",
  title: "消息通知",
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "Notification",
      viewMode: "table",
      showHeader: false,
      selectionMode: "none",
      listActions: [
        {
          $type: "rapidToolbarButton",
          text: "全部已读",
          icon: "CheckOutlined",
          onAction: [
            {
              $action: "sendHttpRequest",
              method: "POST",
              data: {},
              url: "/api/app/readAllNotifications",
            },
            {
              $action: "loadStoreData",
              storeName: "list",
            },
          ],
        },
      ],
      fixedFilters: [
        {
          operator: "eq",
          field: "user_id",
          value: "",
        },
      ],
      orderBy: [
        {
          field: "id",
          desc: true,
        },
      ],
      extraProperties: ["content", "read", "details"],
      pageSize: 50,
      columns: [
        {
          type: "auto",
          code: "title",
          cell: {
            $type: "antdListItemMeta",
            title: [
              {
                $type: "antdSpace",
                children: [
                  {
                    $type: "antdBadge",
                    status: "processing",
                  },
                  {
                    $type: "anchor",
                    href: "",
                    children: "",
                  },
                ],
              },
            ],
            $exps: {
              "title[0].children[0]._hidden": "!!$slot.record.read",
              "title[0].children[1].children": "$slot.record.title",
              "title[0].children[1].href": "$slot.record.details?.url",
              description: "$slot.record.content",
            },
          },
        },
        {
          type: "auto",
          code: "createdAt",
          width: "160px",
        },
      ],
      actions: [],
      $exps: {
        "fixedFilters[0].value": "_.get(me, 'profile.id')",
      },
    } as SonicEntityListRockConfig,
  ],
};

export default page;

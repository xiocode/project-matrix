import type { EntityStoreConfig, RapidFormRockConfig, RapidPage } from "@ruiapp/rapid-extension";
import type { HttpRequestStoreConfig } from "@ruiapp/move-style";

const page: RapidPage = {
  code: "sys_system_setting",
  name: "系统设置",
  title: "系统设置",
  permissionCheck: {
    any: ["sys.setting.manage"],
  },
  view: [
    {
      $type: "antdSpin",
      children: [
        {
          $type: "rapidForm",
          layout: "vertical",
          items: [],
          actions: [
            {
              actionType: "submit",
              actionText: "保存",
            },
          ],
          onFinish: [
            {
              $action: "script",
              script: `
                await event.framework.utils.request({
                  method: "PATCH",
                  url: "/api/svc/systemSettingValues?groupCode=public",
                  data: {
                    values: event.args[0],
                  },
                });
              `,
            },
            {
              $action: "antdToast",
              type: "success",
              content: "保存成功。",
            },
          ],
          $exps: {
            defaultFormFields: `_.get($stores.systemValues, 'data')`,
            items: `_.map(_.get($stores.systemSettingItems, 'data.list'), function (item){
              return {
                type: item.type,
                code: item.code,
                label: item.name,
              }
            })`,
          },
        } as RapidFormRockConfig,
      ],
      $exps: {
        spinning: `!$stores.systemSettingItems.data || !$stores.systemValues.data`,
      },
    },
  ],
  stores: [
    {
      type: "entityStore",
      name: "systemSettingItems",
      entityCode: "SystemSettingItemSetting",
      filters: [
        {
          operator: "exists",
          field: "group",
          filters: [
            {
              operator: "eq",
              field: "code",
              value: "public",
            },
          ],
        },
      ],
    } as EntityStoreConfig,
    {
      type: "httpRequest",
      name: "systemValues",
      request: {
        method: "GET",
        url: "/api/svc/systemSettingValues?groupCode=public",
      },
    } as HttpRequestStoreConfig,
  ],
};

export default page;

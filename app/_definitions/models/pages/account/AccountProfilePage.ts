import type { RapidPage, RapidFormRockConfig } from "@ruiapp/rapid-extension";

const page: RapidPage = {
  code: "profile",
  name: "个人信息",
  title: "个人信息",
  view: [
    {
      $type: "box",
      style: {
        width: "500px",
      },
      children: [
        {
          $type: "rapidForm",
          items: [
            {
              type: "text",
              code: "name",
              label: "姓名",
              required: true,
              rules: [
                // eslint-disable-next-line no-template-curly-in-string
                { required: true, message: "请输入${label}" },
              ],
            },
            {
              type: "text",
              code: "email",
              label: "Email",
              required: true,
              rules: [
                // eslint-disable-next-line no-template-curly-in-string
                { required: true, message: "请输入${label}" },
              ],
            },
          ],
          actions: [
            {
              actionType: "submit",
              actionText: "保存",
            },
          ],
          onFinish: [
            {
              $action: "antdMessage",
              title: "保存成功。",
            },
          ],
        } as RapidFormRockConfig,
      ],
    },
  ],
};

export default page;

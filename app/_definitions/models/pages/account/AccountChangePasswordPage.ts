import type { RapidPage } from "@ruiapp/rapid-extension";

const page: RapidPage = {
  code: "change_password",
  name: "修改密码",
  title: "修改密码",
  view: [
    {
      $type: "box",
      style: {
        width: "500px",
      },
      children: [
        {
          $id: "changePasswordForm",
          $type: "rapidForm",
          items: [
            {
              type: "password",
              code: "oldPassword",
              label: "原密码",
              required: true,
              rules: [
                // eslint-disable-next-line no-template-curly-in-string
                { required: true, message: "请输入${label}" },
              ],
            },
            {
              type: "password",
              code: "newPassword",
              label: "新密码",
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
              actionText: "确认",
            },
          ],
          onFinish: [
            {
              $action: "printToConsole",
            },
            {
              $action: "sendHttpRequest",
              url: `/api/changePassword`,
              method: "POST",
              data: { oldPassword: "", newPassword: "" },
              onSuccess: [
                {
                  $action: "antdToast",
                  type: "success",
                  content: "密码修改成功。",
                },
              ],
              onError: [
                {
                  $action: "antdToast",
                  type: "error",
                  $exps: {
                    content: "$event.args[0].message",
                  },
                },
              ],
              $exps: {
                data: "$event.args[0]"
              },
            },
            // {
            //   $action: "sendComponentMessage",
            //   componentId: "changePasswordForm",
            //   message: {
            //     type: "submit",
            //   }
            // },

          ],
        },
      ],
    },
  ],
};

export default page;

import { Framework, MoveStyleUtils, Page, PageConfig, RuiEvent } from "@ruiapp/move-style";
import { Rui } from "@ruiapp/react-renderer";
import { HtmlElement, Box, Label, Text } from "@ruiapp/react-rocks";
import AntdExtension from "@ruiapp/antd-extension";
import { useState } from "react";

import styles from "antd/dist/antd.css";
import RapidExtension, { RapidFormRockConfig } from "@ruiapp/rapid-extension";
import { message } from "antd";
import { RuiLoggerProvider } from "rui-logger";
import { redirectOriginPath } from "~/utils/navigate";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

const framework = new Framework();
framework.setLoggerProvider(new RuiLoggerProvider());

framework.registerComponent(HtmlElement);
framework.registerComponent(Box);
framework.registerComponent(Label);
framework.registerComponent(Text);

framework.loadExtension(AntdExtension);
framework.loadExtension(RapidExtension);

const initialPageConfig: PageConfig = {
  view: [
    {
      $type: "box",
      style: {
        width: "300px",
        margin: "200px auto 0",
      },
      children: [
        {
          $type: "rapidForm",
          layout: "vertical",
          items: [
            {
              type: "text",
              code: "account",
              label: "用户名",
              required: true,
              rules: [
                // eslint-disable-next-line no-template-curly-in-string
                { required: true, message: "请输入${label}" },
              ],
            },
            {
              type: "password",
              code: "password",
              label: "密码",
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
              actionText: "登录",
              actionProps: {
                block: true,
              },
            },
          ],
          onFinish: [
            {
              $action: "script",
              script: async (event: RuiEvent) => {
                const formData = await event.sender.form.validateFields();
                try {
                  const res = await MoveStyleUtils.request({
                    method: "POST",
                    url: "/api/signin",
                    data: formData,
                  });

                  message.success("登录成功");
                  redirectOriginPath();
                } catch (err: any) {
                  console.error("Signin failed.", err);
                  const errorMessage = err?.response?.data?.error?.message || err.message;
                  message.error(errorMessage);
                  throw err;
                }
              },
            },
            // {
            //   $action: "goToPage",
            //   pageCode: "home",
            // },
          ],
        } as RapidFormRockConfig,
      ],
    },
  ],
};

export default function Index() {
  const [pageConfig] = useState(initialPageConfig);
  const [page] = useState(() => new Page(framework, pageConfig));

  return <Rui framework={framework} page={page} />;
}

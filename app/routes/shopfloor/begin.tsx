import { Framework, Page } from "@ruiapp/move-style";
import type { PageConfig, RockConfig, RockEvent } from "@ruiapp/move-style";
import { renderRock, Rui } from "@ruiapp/react-renderer";
import { Rui as RuiRock, ErrorBoundary, Show, HtmlElement, Anchor, Box, Label, List, Scope, Text } from "@ruiapp/react-rocks";
import AntdExtension from "@ruiapp/antd-extension";
import MonacoExtension from "@ruiapp/monaco-extension";
import RapidExtension from "@ruiapp/rapid-extension";
import { useEffect, useMemo, useState } from "react";
import _, { first, get } from "lodash";
import { redirect, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import qs from "qs";

import AppExtension from "~/app-extension/mod";
import LinkshopExtension from "~/linkshop-extension/mod";
import ShopfloorExtension from "~/shopfloor-extension/mod";

import antdStyles from "antd/dist/antd.css";
import indexStyles from "~/styles/index.css";
import customizeStyles from "~/styles/customize.css";
import flexStyles from "~/styles/flex.css";
import rapidService from "~/rapidService";

import { ShopfloorApp } from "~/_definitions/meta/entity-types";
import { LFStorage } from "~/utils/storage-utils";
import { redirectToSignin } from "~/utils/navigate";

export function links() {
  return [antdStyles, indexStyles, customizeStyles, flexStyles].map((styles) => {
    return { rel: "stylesheet", href: styles };
  });
}

const framework = new Framework();

framework.registerExpressionVar("_", _);
framework.registerExpressionVar("qs", qs);

framework.registerComponent(RuiRock);
framework.registerComponent(ErrorBoundary);
framework.registerComponent(Show);
framework.registerComponent(HtmlElement);
framework.registerComponent(Scope);
framework.registerComponent(Text);

framework.registerComponent(Anchor);
framework.registerComponent(Box);
framework.registerComponent(Label);
framework.registerComponent(List);

framework.loadExtension(AntdExtension);
framework.loadExtension(MonacoExtension);
framework.loadExtension(RapidExtension);
framework.loadExtension(AppExtension);
framework.loadExtension(LinkshopExtension);
framework.loadExtension(ShopfloorExtension);

const SHOPFLOOR_APP_CONFIG_CACHE_KEY = "shopfloor_app_config";

export type Params = {
  code: string;
};

type ViewModel = {
  myProfile: any;
  myAllowedActions: string[];
  pageAccessAllowed: boolean;
  shopfloorApps: ShopfloorApp[];
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const myProfile = (
    await rapidService.get(`me`, {
      headers: {
        Cookie: request.headers.get("Cookie"),
      },
    })
  ).data?.user;

  if (!myProfile) {
    return redirectToSignin(request.url);
  }

  const myAllowedActions = (
    await rapidService.get(`app/listMyAllowedSysActions`, {
      headers: {
        Cookie: request.headers.get("Cookie"),
      },
    })
  ).data;

  const shopfloorApps = (
    await rapidService.post(
      `shopfloor/shopfloor_apps/operations/find`,
      {
        properties: ["id", "name", "content"],
      },
      {
        headers: {
          Cookie: request.headers.get("Cookie"),
        },
      },
    )
  ).data.list;

  return {
    myProfile,
    myAllowedActions,
    shopfloorApps,
    pageAccessAllowed: true,
  };
};

export default function Begin() {
  const viewModel = useLoaderData<ViewModel>();
  const { myProfile, myAllowedActions, pageAccessAllowed, shopfloorApps } = viewModel;

  const shopfloorAppConfigCache = LFStorage.get(SHOPFLOOR_APP_CONFIG_CACHE_KEY);
  const [currentAppId, setCurrentAppId] = useState<any>(shopfloorAppConfigCache?.appId);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  framework.registerExpressionVar("me", {
    profile: myProfile,
    allowedActions: myAllowedActions,
  });

  useEffect(() => {
    if (!currentAppId) {
      const firstApp = shopfloorApps[0];
      setCurrentAppId(`${firstApp.id}`);
      LFStorage.set(SHOPFLOOR_APP_CONFIG_CACHE_KEY, { ...(shopfloorAppConfigCache || {}), appId: firstApp.id });
    }
  }, [shopfloorApps, currentAppId]);

  const page = useMemo(() => {
    let ruiPageConfig: PageConfig | undefined;
    if (!pageAccessAllowed) {
      ruiPageConfig = {
        view: [{ $type: "text", text: `You are not allowed to visit this Shopfloor App.` }],
      };
      return new Page(framework, ruiPageConfig);
    }

    if (!shopfloorApps?.length) {
      ruiPageConfig = {
        view: [{ $type: "text", text: `No Shopfloor Apps` }],
      };
      return new Page(framework, ruiPageConfig);
    }

    const currentApp = shopfloorApps.find((app) => `${app.id}` === `${currentAppId}`);
    if (!currentApp) {
      return null;
    }

    ruiPageConfig = {
      $id: `beginPage-${currentAppId}_${modalOpen}`,
      view: [
        {
          $type: "htmlElement",
          $id: "page_container",
          htmlTag: "div",
          attributes: {
            className: "rui-fullscreen rui-col-around",
          },
          style: {
            height: "100vh",
            padding: 36,
          },
          children: [
            {
              $type: "htmlElement",
              $id: "display-app-name",
              htmlTag: "div",
              attributes: {
                className: "rui-row-mid",
              },
              style: { cursor: "pointer" },
              children: [
                {
                  $id: "switch-app-btn",
                  $type: "htmlElement",
                  htmlTag: "span",
                  attributes: {
                    className: "rui-row-mid",
                  },
                  onClick: [
                    {
                      $action: "script",
                      script: () => {
                        setModalOpen(true);
                      },
                    },
                  ],
                  children: [
                    {
                      $type: "antdIcon",
                      size: 56,
                      name: "BarsOutlined",
                    },
                    {
                      $type: "htmlElement",
                      htmlTag: "span",
                      style: {
                        fontSize: 36,
                        marginLeft: 16,
                      },
                      children: {
                        $type: "text",
                        text: `${currentApp?.name}`,
                      },
                    },
                  ],
                },
                {
                  $id: "switch-app-modal",
                  $type: "antdModal",
                  title: "切换应用",
                  footer: false,
                  open: modalOpen,
                  children: [
                    {
                      $id: "apps-container",
                      $type: "antdRow",
                      gutter: [16, 16],
                      children: (shopfloorApps || []).map((app) => ({
                        $id: app.id,
                        $type: "antdCol",
                        span: 6,
                        children: {
                          $type: "antdButton",
                          $id: `${app.id}_button`,
                          type: currentApp?.id === app.id ? "primary" : "",
                          style: { width: "100%", height: "100%" },
                          onClick: {
                            $action: "script",
                            script: () => {
                              setCurrentAppId(app.id);
                              LFStorage.set(SHOPFLOOR_APP_CONFIG_CACHE_KEY, { ...(shopfloorAppConfigCache || {}), appId: app.id });
                              setModalOpen(false);
                            },
                          },
                          children: {
                            $type: "text",
                            text: `${app.name}`,
                          },
                        },
                      })),
                    },
                  ],
                  onCancel: [
                    {
                      $action: "script",
                      script: () => {
                        setModalOpen(false);
                      },
                    },
                  ],
                },
              ],
            },
            {
              $type: "htmlElement",
              htmlTag: "div",
              children: [
                {
                  $type: "antdButton",
                  disabled: !currentApp,
                  style: {
                    width: 360,
                    height: 200,
                    borderRadius: 8,
                    fontSize: 60,
                    padding: 0,
                    lineHeight: "200px",
                    textAlign: "center",
                  },
                  type: "primary",
                  children: {
                    $type: "text",
                    text: "开 始",
                  },
                  href: `/shopfloor/player?appId=${currentApp?.id}`,
                },
              ],
            },
            {
              $type: "htmlElement",
              htmlTag: "div",
              attributes: {
                className: "rui-row-mid",
              },
              children: [
                {
                  $type: "antdAvatar",
                  size: 56,
                  src: myProfile?.avatar,
                  style: {
                    marginRight: 8,
                  },
                },
                {
                  $type: "htmlElement",
                  htmlTag: "span",
                  style: {
                    fontSize: 28,
                  },
                  children: {
                    $type: "text",
                    text: `${myProfile?.name}`,
                  },
                },
              ],
            },
          ],
        },
      ],
    } as any;

    return new Page(framework, ruiPageConfig);
  }, [shopfloorApps, pageAccessAllowed, currentAppId, modalOpen]);

  if (!page) {
    return <div></div>;
  }

  return (
    <>
      <Rui framework={framework} page={page} />
    </>
  );
}

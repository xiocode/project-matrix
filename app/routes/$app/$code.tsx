import { Framework, Page } from "@ruiapp/move-style";
import type { PageConfig, RockConfig } from "@ruiapp/move-style";
import { Rui } from "@ruiapp/react-renderer";
import { Rui as RuiRock, ErrorBoundary, Show, HtmlElement, Anchor, Box, Label, List, Scope, Text } from "@ruiapp/react-rocks";
import AntdExtension from "@ruiapp/antd-extension";
import MonacoExtension from "@ruiapp/monaco-extension";
import DesignerExtension from "@ruiapp/designer-extension";
import RapidExtension, { rapidAppDefinition, RapidExtensionSetting } from "@ruiapp/rapid-extension";
import { useMemo } from "react";
import _, { find } from "lodash";
import { redirect, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { RapidPage, RapidEntity, RapidDataDictionary } from "@ruiapp/rapid-extension";
import qs from "qs";

import dataDictionaryModels from "~/_definitions/meta/data-dictionary-models";
import entityModels from "~/_definitions/meta/entity-models";
import pageModels from "~/_definitions/meta/page-models";

import AppExtension from "~/app-extension/mod";

import styles from "antd/dist/antd.css";
import rapidService from "~/rapidService";

import { Avatar, Dropdown, PageHeader } from "antd";
import type { MenuProps } from "antd";
import { ExportOutlined, KeyOutlined, ProfileOutlined, UserOutlined } from "@ant-design/icons";
import { isAccessAllowed } from "~/utils/access-control-utility";
import { RuiLoggerProvider } from "rui-logger";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

const framework = new Framework();
framework.setLoggerProvider(new RuiLoggerProvider());

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
framework.loadExtension(DesignerExtension);
framework.loadExtension(RapidExtension);
framework.loadExtension(AppExtension);

RapidExtensionSetting.setDefaultRendererPropsOfRendererType("rapidCurrencyRenderer", {
  usingThousandSeparator: true,
  decimalPlaces: 2,
  currencyCode: "CNY",
});

export interface GenerateRuiPageConfigOption<TPage = RapidPage> {
  sdPage: TPage;
  entities: RapidEntity[];
  dataDictionaries: RapidDataDictionary[];
}

export function generateRuiPage(option: GenerateRuiPageConfigOption) {
  const { sdPage } = option;
  const viewRocks = (sdPage.view ? (sdPage.view.length ? sdPage.view : [sdPage.view]) : []) as RockConfig[];

  const ruiPageConfig: PageConfig = {
    $id: sdPage.code,
    stores: sdPage.stores || [],
    view: [
      {
        $type: "box",
        $id: `page-section`,
        className: "rui-page-section",
        children: viewRocks,
      },
    ],
    // view: viewRocks.map((child, index) => {
    //   return {
    //     $type: "box",
    //     $id: `page-section-${index + 1}`,
    //     className: "rui-page-section",
    //     children: child,
    //   }
    // }),
    eventSubscriptions: sdPage.eventSubscriptions,
  };

  return ruiPageConfig;
}

export type Params = {
  code: string;
};

type ViewModel = {
  myProfile: any;
  myAllowedActions: string[];
  pageCode: string;
  pageAccessAllowed: boolean;
  sdPage: RapidPage;
  entities: RapidEntity[];
  dataDictionaries: RapidDataDictionary[];
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
    return redirect("/signin");
  }

  const pageCode = params.code;
  const sdPage: RapidPage | undefined = find(pageModels, (item) => item.code === pageCode);

  const myAllowedActions = (
    await rapidService.get(`app/listMyAllowedSysActions`, {
      headers: {
        Cookie: request.headers.get("Cookie"),
      },
    })
  ).data;
  let pageAccessAllowed = true;
  const permissionCheckPolicy = sdPage?.permissionCheck;
  if (permissionCheckPolicy) {
    pageAccessAllowed = isAccessAllowed(permissionCheckPolicy, myAllowedActions || []);
  }

  return {
    myProfile,
    myAllowedActions,
    pageCode,
    pageAccessAllowed,
    sdPage,
    entities: entityModels,
    dataDictionaries: dataDictionaryModels,
  };
};

export default function Index() {
  const viewModel = useLoaderData<ViewModel>();
  const { myProfile, myAllowedActions, pageCode, sdPage, entities, dataDictionaries, pageAccessAllowed } = viewModel;

  framework.registerExpressionVar("me", {
    profile: myProfile,
    allowedActions: myAllowedActions,
  });

  rapidAppDefinition.setAppDefinition({
    entities,
    dataDictionaries,
  });

  const page = useMemo(() => {
    let ruiPageConfig: PageConfig | undefined;
    if (!pageAccessAllowed) {
      ruiPageConfig = {
        view: [{ $type: "text", text: `You are not allowed to visit this page.` }],
      };
      return new Page(framework, ruiPageConfig);
    }

    if (!sdPage) {
      ruiPageConfig = {
        view: [{ $type: "text", text: `Page with code '${pageCode}' was not configured.` }],
      };
      return new Page(framework, ruiPageConfig);
    }

    ruiPageConfig = generateRuiPage({
      sdPage: sdPage as any,
      entities,
      dataDictionaries,
    });
    console.debug("[RUI][ReactPlayer] RUI page config:", ruiPageConfig);
    return new Page(framework, ruiPageConfig);
  }, [pageCode, sdPage, entities, dataDictionaries, pageAccessAllowed]);

  const profileMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      label: <a href="/account/profile">个人信息</a>,
      icon: <ProfileOutlined rev={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
    },
    {
      key: "change_password",
      label: <a href="/account/change_password">修改密码</a>,
      icon: <KeyOutlined rev={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
    },
    {
      key: "signout",
      label: <a href="/api/signout">登出</a>,
      icon: <ExportOutlined rev={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />,
    },
  ];

  return (
    <>
      <PageHeader
        title={sdPage?.title || sdPage?.name || pageCode}
        extra={
          <div>
            <Dropdown menu={{ items: profileMenuItems }}>
              <div className="rui-current-user-indicator">
                <Avatar icon={<UserOutlined rev={undefined} />} />
                {"" + myProfile?.name}
              </div>
            </Dropdown>
          </div>
        }
      ></PageHeader>
      <div className="rui-play-main-container-body">
        <Rui framework={framework} page={page} />
      </div>
    </>
  );
}

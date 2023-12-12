import { Framework, Page } from "@ruiapp/move-style";
import type { PageConfig, RockConfig } from "@ruiapp/move-style";
import { Rui } from "@ruiapp/react-renderer";
import { Rui as RuiRock, ErrorBoundary, Show, HtmlElement, Anchor, Box, Label, List, Scope, Text } from "@ruiapp/react-rocks";
import AntdExtension from "@ruiapp/antd-extension";
import MonacoExtension from "@ruiapp/monaco-extension";
import DesignerExtension from "@ruiapp/designer-extension";
import RapidExtension, { rapidAppDefinition } from '@ruiapp/rapid-extension';
import { useMemo } from "react";
import _, { find, first } from "lodash";
import { redirect, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { RapidPage, RapidEntity, RapidDataDictionary } from "@ruiapp/rapid-extension";

import dataDictionaryModels from "~/_definitions/meta/data-dictionary-models";
import entityModels from "~/_definitions/meta/entity-models";
import pageModels from "~/_definitions/meta/page-models";

import AppExtension from "~/app-extension/mod";

import styles from "antd/dist/antd.css";
import rapidService from "~/rapidService";

import { Avatar, Dropdown,  PageHeader } from "antd";
import type { MenuProps } from "antd";
import { ExportOutlined, UserOutlined } from "@ant-design/icons";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

const framework = new Framework();

framework.registerExpressionVar("_", _);

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
framework.loadExtension(DesignerExtension);
framework.loadExtension(AppExtension);


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
        $id: `${sdPage.code}-scope`,
        $type: "scope",
        children: viewRocks.map((child, index) => {
          return {
            $type: "box",
            $id: `page-section-${index + 1}`,
            className: "rui-page-section",
            children: child,
          }
        })
      },
    ],
    eventSubscriptions: sdPage.eventSubscriptions,
  };

  return ruiPageConfig;
}



export type Params = {
  code: string;
}

type ViewModel = {
  myProfile: any;
  pageCode: string;
  navItem: any;
  sdPage: RapidPage;
  entities: RapidEntity[];
  dataDictionaries: RapidDataDictionary[];
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const myProfile = (await rapidService.get(`me`, {
    headers: {
      "Cookie": request.headers.get("Cookie"),
    }
  })).data?.user;

  if (!myProfile) {
    return redirect("/signin");
  }


  const pageCode = params.code;
  const navItems = (await rapidService.post(`app/app_nav_items/operations/find`, {
    filters: [
      {
        field: "page_code",
        operator: "eq",
        value: pageCode,
      }
    ],
    properties: ["id", "code", "name", "pageCode"],
  }, {
    headers: {
      "Cookie": request.headers.get("Cookie"),
    }
  })).data;

  const sdPage: RapidPage | undefined = find(pageModels, item => item.code === pageCode);

  return {
    myProfile,
    pageCode,
    navItem: first(navItems.list),
    sdPage,
    entities: entityModels,
    dataDictionaries: dataDictionaryModels,
  }
}


export default function Index() {
  const viewModel = useLoaderData<ViewModel>();
  console.warn('viewModel', viewModel);
  const { myProfile, pageCode, sdPage, entities, dataDictionaries } = viewModel;

  rapidAppDefinition.setAppDefinition({
    entities,
    dataDictionaries,
  })

  const page = useMemo(() => {
    let ruiPageConfig: PageConfig | undefined;
    if (!sdPage) {
      ruiPageConfig = {
        view: [
          { $type: "text", text: `Page with code '${pageCode}' was not configured.`}
        ]
      }
      return new Page(framework, ruiPageConfig);
    }

    console.log(`[RUI][ReactPlayer] Generating RUI page config...`);
    ruiPageConfig = generateRuiPage({
      sdPage: sdPage as any,
      entities,
      dataDictionaries,
    });
    console.debug("[RUI][ReactPlayer] Auto generated RUI page config:", ruiPageConfig);
    return new Page(framework, ruiPageConfig);
  }, [pageCode, sdPage, entities, dataDictionaries]);

  const profileMenuItems: MenuProps['items'] = [
    {
      key: "signout",
      label: <a href="/api/signout">登出</a>,
      icon: <ExportOutlined rev={undefined} />
    }
  ]

  return <>
    <PageHeader
      title={sdPage?.title || sdPage?.name || pageCode}
      extra={
        <div>
            <Dropdown menu={{items: profileMenuItems}}>
              <div className="rui-current-user-indicator">
                <Avatar icon={<UserOutlined rev={undefined} />} />
                {"" + myProfile?.name}
              </div>
            </Dropdown>
        </div>
      }
    >
    </PageHeader>
    <div className="rui-play-main-container-body">
      <Rui framework={framework} page={page} />
    </div>
  </>
}
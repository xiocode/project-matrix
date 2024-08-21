import { useState } from "react";
import type { Rock } from "@ruiapp/move-style";
import LinkshopBuilderVariablesPanelMeta from "./LinkshopBuilderVariablesPanelMeta";
import type { LinkshopBuilderVariablesPanelRockConfig } from "./linkshop-builder-variables-panel-types";
import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import type { LinkshopAppDesignerStore } from "~/linkshop-extension/stores/LinkshopAppDesignerStore";
import { Dropdown } from "antd";
import { sendDesignerCommand } from "~/linkshop-extension/utilities/DesignerUtility";
import VariableSettingsFormModal from "./VariableSettingsFormModal";

enum VariableOperator {
  Modify = "modify",
  Remove = "remove",
}

export default {
  Renderer(context, props: LinkshopBuilderVariablesPanelRockConfig) {
    const { page } = context;
    const { designerStoreName } = props;

    const [state, setState] = useState<{ modelOpen?: boolean; variableConfig?: any }>({});

    const designerStore = page.getStore<LinkshopAppDesignerStore>(designerStoreName || "designerStore");

    const variables = designerStore.appConfig?.variables;

    const onVariableOperator = (key: VariableOperator, variableConfig: any) => {
      switch (key) {
        case VariableOperator.Modify:
          setState((draft) => {
            return { ...draft, variableConfig: variableConfig, modelOpen: true };
          });
          break;
        case VariableOperator.Remove:
          designerStore.removeVariable(variableConfig);
          break;
      }
    };

    return (
      <>
        <div className="lsb-sidebar-panel">
          <div
            className="lsb-sidebar-panel--add_btn"
            onClick={() => {
              setState((draft) => {
                return {
                  ...draft,
                  modelOpen: true,
                  variableConfig: null,
                };
              });
            }}
          >
            <span>
              <PlusOutlined style={{ marginRight: 4 }} />
              添加
            </span>
          </div>
          {variables?.map((item) => {
            return (
              <div key={item.name} className="lsb-sidebar-panel--item rui-row-mid">
                <span className="rui-text-ellipsis rui-flex">{item.name}</span>
                <Dropdown
                  menu={{
                    items: [
                      { label: "修改", key: VariableOperator.Modify },
                      { label: "删除", key: VariableOperator.Remove },
                    ],
                    onClick: ({ key }) => {
                      onVariableOperator(key as VariableOperator, item);
                    },
                  }}
                >
                  <span className="lsb-sidebar-panel--item_icon rui-noshrink" style={{ marginLeft: 6 }}>
                    <EllipsisOutlined />
                  </span>
                </Dropdown>
              </div>
            );
          })}
        </div>
        <VariableSettingsFormModal
          context={context}
          visible={state.modelOpen || false}
          variableConfigList={variables as any[]}
          variableConfig={state.variableConfig}
          onVisibleChange={(v) => {
            setState((draft) => {
              return { ...draft, modelOpen: v };
            });
          }}
          onFormSubmit={(config) => {
            if (state.variableConfig) {
              designerStore.updateVariable(config);
            } else {
              designerStore.addVariable(config);
            }
          }}
        />
      </>
    );
  },

  ...LinkshopBuilderVariablesPanelMeta,
} as Rock;

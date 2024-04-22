import type { Rock } from '@ruiapp/move-style';
import LinkshopBuilderStoresPanelMeta from './LinkshopBuilderStoresPanelMeta';
import type { LinkshopBuilderStoresPanelRockConfig } from './linkshop-builder-stores-panel-types';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import ModelSettingsFormModal from './ModelSettingsFormModal';
import { LinkshopAppDesignerStore } from '~/linkshop-extension/stores/LinkshopAppDesignerStore';

export default {
  Renderer(context, props: LinkshopBuilderStoresPanelRockConfig, state) {
    const { page } = context;
    const { designerStoreName } = props;

    const [visible, setVisible] = useState<boolean>(false);

    const designerStore = context.page.getStore<LinkshopAppDesignerStore>(designerStoreName || 'designerStore');
    const shopfloorApp = designerStore.appConfig;

    const stores = shopfloorApp?.stores || [];

    return (
      <>
        <div className="lsb-stores-panel">
          <div className="lsb-stores-panel--addBtn">
            <span
              onClick={() => {
                setVisible(true);
              }}
            >
              <PlusOutlined style={{ marginRight: 4 }} />
              添加
            </span>
          </div>
          {stores?.map((s) => {
            return (
              <div key={s.name} style={{ padding: '8px 16px' }}>
                {s.name}
              </div>
            );
          })}
        </div>
        <ModelSettingsFormModal
          visible={visible}
          onVisibleChange={(v) => {
            setVisible(v);
          }}
          onFormSubmit={(config) => {
            designerStore.processCommand({
              name: 'addStore',
              payload: {
                store: config,
              },
            });
          }}
        />
      </>
    );
  },

  ...LinkshopBuilderStoresPanelMeta,
} as Rock;

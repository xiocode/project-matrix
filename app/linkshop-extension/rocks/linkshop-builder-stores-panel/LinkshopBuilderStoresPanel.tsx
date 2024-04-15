import type { Rock } from '@ruiapp/move-style';
import LinkshopBuilderStoresPanelMeta from './LinkshopBuilderStoresPanelMeta';
import type { LinkshopBuilderStoresPanelRockConfig } from './linkshop-builder-stores-panel-types';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import ModelSettingsFormModal from './ModelSettingsFormModal';

export default {
  Renderer(context, props: LinkshopBuilderStoresPanelRockConfig, state) {
    const { page } = context;

    const [visible, setVisible] = useState<boolean>(false);

    const stores = (page.scope.config?.stores || []).filter((s) => s.type === 'entityStore');

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
            page.addStore(config);
            page.loadStoreData(config.name, {});
          }}
        />
      </>
    );
  },

  ...LinkshopBuilderStoresPanelMeta,
} as Rock;

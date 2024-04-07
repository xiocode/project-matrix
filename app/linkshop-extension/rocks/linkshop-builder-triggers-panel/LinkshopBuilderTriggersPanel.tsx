import type { Rock } from '@ruiapp/move-style';
import ShopfloorAppBuilderMeta from './LinkshopBuilderTriggersPanelMeta';
import type { LinkshopBuilderTriggersPanelRockConfig } from './linkshop-builder-triggers-panel-types';

export default {
  Renderer(context, props: LinkshopBuilderTriggersPanelRockConfig) {
    const { shopfloorApp } = props;

    return 'triggers';
  },

  ...ShopfloorAppBuilderMeta,
} as Rock;

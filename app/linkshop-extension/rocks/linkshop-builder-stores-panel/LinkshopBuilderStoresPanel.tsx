import type { Rock } from "@ruiapp/move-style";
import ShopfloorAppBuilderMeta from "./LinkshopBuilderStoresPanelMeta";
import type { LinkshopBuilderStoresPanelRockConfig } from "./linkshop-builder-stores-panel-types";


export default {
  Renderer(context, props: LinkshopBuilderStoresPanelRockConfig) {
    const { shopfloorApp } = props;

    return "stores"
  },

  ...ShopfloorAppBuilderMeta,
} as Rock;
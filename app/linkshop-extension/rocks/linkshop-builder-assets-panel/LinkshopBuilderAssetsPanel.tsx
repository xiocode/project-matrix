import type { Rock } from "@ruiapp/move-style";
import ShopfloorAppBuilderMeta from "./LinkshopBuilderAssetsPanelMeta";
import type { LinkshopBuilderAssetsPanelRockConfig } from "./linkshop-builder-assets-panel-types";


export default {
  Renderer(context, props: LinkshopBuilderAssetsPanelRockConfig) {
    const { shopfloorApp } = props;

    return "assets"
  },

  ...ShopfloorAppBuilderMeta,
} as Rock;
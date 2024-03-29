import type { Rock } from "@ruiapp/move-style";
import ShopfloorAppMeta from "./LinkshopAppMeta";
import { renderRockChildren } from "@ruiapp/react-renderer";
import type { LinkshopAppRockConfig } from "~/linkshop-extension/linkshop-types";

export default {
  Renderer(context, props: LinkshopAppRockConfig) {
    const { steps } = props;

    return renderRockChildren({context, rockChildrenConfig: steps || []});
  },

  ...ShopfloorAppMeta,
} as Rock;
import type { Rock } from "@ruiapp/move-style";
import ShopfloorAppStepMeta from "./LinkshopAppStepMeta";
import { renderRockChildren } from "@ruiapp/react-renderer";
import type { LinkshopAppStepRockConfig } from "~/linkshop-extension/linkshop-types";

export default {
  Renderer(context, props: LinkshopAppStepRockConfig) {
    const { children } = props;

    return <div style={{ width: "400px", height: "300px", border: "1px solid", backgroundColor: props.backgroundColor }}>
      {
        renderRockChildren({context, rockChildrenConfig: children || []})
      }
    </div>
  },

  ...ShopfloorAppStepMeta,
} as Rock;
import type { Rock } from "@ruiapp/move-style";
import SfTextMeta from "./SfTextMeta";
import type { SfTextRockConfig } from "./sf-text-types";

export default {
  Renderer(context, props: SfTextRockConfig) {
    const { text } = props;

    return text || "";
  },

  ...SfTextMeta,
} as Rock;
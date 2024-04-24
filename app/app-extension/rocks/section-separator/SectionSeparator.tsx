import type { Rock } from "@ruiapp/move-style";
import SectionSeparatorMeta from "./SectionSeparatorMeta";
import type { SectionSeparatorRockConfig } from "./section-separator-types";

export default {
  Renderer(context, props: SectionSeparatorRockConfig) {
    const { showLine } = props;

    return <div className="rui-page-section-separator">
      {
        showLine && <div className="rui-page-section-separator-line"></div>
      }
    </div>
  },

  ...SectionSeparatorMeta,
} as Rock;
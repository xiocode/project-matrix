import { CommonProps, type Rock } from "@ruiapp/move-style";
import SfTextMeta from "./SfTextMeta";
import type { SfTextRockConfig } from "./sf-text-types";
import { pick } from "lodash";

export default {
  Renderer(context, props: SfTextRockConfig) {
    const { text } = props;

    const wrapStyle: React.CSSProperties = pick(props, CommonProps.PositionStylePropNames) as any;
    wrapStyle.position = "absolute";
    return <div data-component-id={props.$id} style={wrapStyle}>
      {
        text
      }
    </div>;
  },

  ...SfTextMeta,
} as Rock;
import { CommonProps, RockConfig, type Rock } from "@ruiapp/move-style";
import SfIconMeta from "./SfIconMeta";
import type { SfIconRockConfig } from "./sf-icon-types";
import { min, pick } from "lodash";
import { renderRock } from "@ruiapp/react-renderer";

export default {
  Renderer(context, props: SfIconRockConfig) {
    const { icon, color, width, height, size } = props;

    const iconRockConfig: RockConfig = {
      $type: "antdIcon",
      name: icon,
      color,
      size: size || min([width, height]) || 32,
    };

    const wrapStyle: React.CSSProperties = pick(props, CommonProps.PositionStylePropNames) as any;
    wrapStyle.position = "absolute";
    return (
      <div data-component-id={props.$id} style={wrapStyle}>
        {renderRock({
          context,
          rockConfig: iconRockConfig,
        })}
      </div>
    );
  },

  ...SfIconMeta,
} as Rock;

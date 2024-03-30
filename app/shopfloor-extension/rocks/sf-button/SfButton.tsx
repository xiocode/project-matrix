import { CommonProps, type Rock } from "@ruiapp/move-style";
import SfButtonMeta from "./SfButtonMeta";
import type { SfButtonRockConfig } from "./sf-button-types";
import { pick } from "lodash";
import { Button } from "antd";
import { renderRock } from "@ruiapp/react-renderer";

export default {
  Renderer(context, props: SfButtonRockConfig) {
    const { text, icon } = props;

    const wrapStyle: React.CSSProperties = pick(props, CommonProps.PositionStylePropNames) as any;
    wrapStyle.position = "absolute";
    return <Button data-component-id={props.$id} style={wrapStyle}>
      {
        icon && renderRock({
          context,
          rockConfig: {
            $type: "antdIcon",
            name: icon,
          }
        })
      }
      {
        text
      }
    </Button>;
  },

  ...SfButtonMeta,
} as Rock;
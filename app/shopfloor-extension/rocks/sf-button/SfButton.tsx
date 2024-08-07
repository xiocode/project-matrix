import { CommonProps, type Rock } from "@ruiapp/move-style";
import SfButtonMeta from "./SfButtonMeta";
import type { SfButtonRockConfig } from "./sf-button-types";
import { pick } from "lodash";
import { Button } from "antd";
import { convertToEventHandlers, renderRock } from "@ruiapp/react-renderer";

export default {
  Renderer(context, props: SfButtonRockConfig) {
    const { text, icon, iconPosition } = props;
    const styleNames = [...CommonProps.PositionStylePropNames, ...CommonProps.SizeStylePropNames, ...CommonProps.BorderStylePropNames];
    const wrapStyle: React.CSSProperties = pick(props, styleNames);
    const iconStyle: React.CSSProperties = {};
    // const contentStyle: React.CSSProperties = {};
    wrapStyle.position = "absolute";
    wrapStyle.backgroundColor = props.backgroundColor;
    wrapStyle.color = props.color;
    wrapStyle.fontSize = props.fontSize;
    wrapStyle.width = props.width;
    wrapStyle.display = "flex";
    wrapStyle.justifyContent = "center";
    wrapStyle.alignItems = "center";
    switch (iconPosition) {
      case "top":
        wrapStyle.flexDirection = "column";
        break;
      case "right":
        wrapStyle.flexDirection = "row-reverse";
        iconStyle.marginLeft = "5px";
        break;
      default:
        iconStyle.marginRight = "5px";
        break;
    }
    const eventHandlers = convertToEventHandlers({ context, rockConfig: props });
    return (
      <Button data-component-id={props.$id} style={wrapStyle} {...eventHandlers}>
        <span style={iconStyle}>
          {icon &&
            renderRock({
              context,
              rockConfig: {
                $type: "antdIcon",
                name: icon,
              },
            })}
        </span>
        {text}
        {/* <div style={contentStyle}>
          
        </div> */}
      </Button>
    );
  },

  ...SfButtonMeta,
} as Rock;

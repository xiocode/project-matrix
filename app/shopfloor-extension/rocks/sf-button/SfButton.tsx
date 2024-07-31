import { CommonProps, type Rock } from "@ruiapp/move-style";
import SfButtonMeta from "./SfButtonMeta";
import type { SfButtonRockConfig } from "./sf-button-types";
import { pick } from "lodash";
import { Button, Space } from "antd";
import { convertToEventHandlers, renderRock } from "@ruiapp/react-renderer";

export default {
  Renderer(context, props: SfButtonRockConfig) {
    const { text, icon, iconPosition } = props;
    const styleNames = [...CommonProps.PositionStylePropNames, ...CommonProps.SizeStylePropNames, ...CommonProps.BorderStylePropNames];
    const wrapStyle: React.CSSProperties = pick(props, styleNames) as any;
    const iconStyle: React.CSSProperties = {} as any;
    const contentStyle: React.CSSProperties = {} as any;
    wrapStyle.position = "absolute";
    wrapStyle.backgroundColor = props.backgroundColor;
    wrapStyle.color = props.color;
    wrapStyle.fontSize = props.fontSize;
    contentStyle.display = "flex";
    contentStyle.justifyContent = "center";
    contentStyle.alignItems = "center";
    switch (iconPosition) {
      case "top":
        contentStyle.flexDirection = "column";
        break;
      case "right":
        contentStyle.flexDirection = "row-reverse";
        iconStyle.marginLeft = "5px";
        break;
      default:
        iconStyle.marginRight = "5px";
        break;
    }
    const eventHandlers = convertToEventHandlers({ context, rockConfig: props });
    return (
      <Button data-component-id={props.$id} style={wrapStyle} {...eventHandlers}>
        <div style={contentStyle}>
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
        </div>
      </Button>
    );
  },

  ...SfButtonMeta,
} as Rock;

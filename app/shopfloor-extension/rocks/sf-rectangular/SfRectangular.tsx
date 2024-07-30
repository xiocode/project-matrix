import { CommonProps, type Rock } from "@ruiapp/move-style";
import SfRectangularMeta from "./SfRectangularMeta";
import type { SfRectangularRockConfig } from "./sf-rectangular-types";
import { pick } from "lodash";
import { convertToEventHandlers } from "@ruiapp/react-renderer";
import React from "react";

export default {
  Renderer(context, props: SfRectangularRockConfig) {
    const { text } = props;
    const styleNames = [...CommonProps.PositionStylePropNames, ...CommonProps.SizeStylePropNames, ...CommonProps.BorderStylePropNames];
    const wrapStyle: React.CSSProperties = pick(props, styleNames) as any;
    wrapStyle.position = "absolute";
    wrapStyle.backgroundColor = props.backgroundColor;
    wrapStyle.color = props.color;
    const eventHandlers = convertToEventHandlers({ context, rockConfig: props });
    return (
      <div data-component-id={props.$id} style={wrapStyle} {...eventHandlers}>
        {text}
      </div>
    );
  },

  ...SfRectangularMeta,
} as Rock;

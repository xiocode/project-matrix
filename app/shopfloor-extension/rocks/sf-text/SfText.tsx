import { CommonProps, type Rock } from "@ruiapp/move-style";
import SfTextMeta from "./SfTextMeta";
import type { SfTextRockConfig } from "./sf-text-types";
import { pick } from "lodash";

export default {
  Renderer(context, props: SfTextRockConfig) {
    const {
      text,
      color,
      verticalAlignment,
      fontSize,
      letterSpacing,
      horizontalAlignment,
      fontWeightIsBold,
      fontStyleIsOblique,
      textDecorationLine,
      textDecorationStyle,
      textDecorationColor,
    } = props;

    const wrapStyle: React.CSSProperties = pick(props, [...CommonProps.PositionStylePropNames, ...CommonProps.SizeStylePropNames]) as any;
    wrapStyle.position = "absolute";
    wrapStyle.display = "flex";
    wrapStyle.flexDirection = "column"
    wrapStyle.color = color;
    wrapStyle.fontSize = fontSize;
    wrapStyle.letterSpacing = letterSpacing;
    wrapStyle.textAlign = horizontalAlignment;
    wrapStyle.justifyContent = verticalAlignment;
    wrapStyle.fontWeight = fontWeightIsBold === true ? "bold" : "normal";
    wrapStyle.fontStyle = fontStyleIsOblique === true ? "oblique" : "normal";
    wrapStyle.textDecorationLine = textDecorationLine;
    wrapStyle.textDecorationStyle = textDecorationStyle;
    wrapStyle.textDecorationColor = textDecorationColor;

    return (
      <div data-component-id={props.$id} style={wrapStyle}>
        <span>{text}</span>
      </div>
    );
  },

  ...SfTextMeta,
} as Rock;

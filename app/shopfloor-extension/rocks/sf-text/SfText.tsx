import { CommonProps, type Rock } from "@ruiapp/move-style";
import SfTextMeta from "./SfTextMeta";
import type { SfTextRockConfig } from "./sf-text-types";
import { pick } from "lodash";

export default {
  Renderer(context, props: SfTextRockConfig) {
    const {
      text,
      color,
      alignItems,
      fontSize,
      letterSpacing,
      justifyContent,
      fontWeightIsBold,
      fontStyleIsOblique,
      textDecorationLine,
      textDecorationStyle,
      textDecorationColor,
    } = props;
    console.log(props);

    const wrapStyle: React.CSSProperties = pick(props, [...CommonProps.PositionStylePropNames, ...CommonProps.SizeStylePropNames]) as any;
    wrapStyle.position = "absolute";
    wrapStyle.display = "flex";
    wrapStyle.flexDirection = "row";
    wrapStyle.color = color;
    wrapStyle.fontSize = fontSize;
    wrapStyle.letterSpacing = letterSpacing;
    wrapStyle.alignItems = alignItems;
    wrapStyle.justifyContent = justifyContent;
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

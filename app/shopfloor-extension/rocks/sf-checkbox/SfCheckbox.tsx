import { CommonProps, handleComponentEvent, type Rock } from "@ruiapp/move-style";
import SfTextMeta from "./SfCheckboxMeta";
import type { SfTextInputRockConfig } from "./sf-checkbox-types";
import { pick } from "lodash";
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

export default {
  Renderer(context, props: SfTextInputRockConfig) {
    const { framework, page, scope } = context;
    const {
      checked,
      label,
      value,
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
      onChange,
    } = props;

    const wrapStyle: React.CSSProperties = pick(props, [...CommonProps.PositionStylePropNames, ...CommonProps.SizeStylePropNames]) as any;
    wrapStyle.position = "absolute";
    wrapStyle.display = "flex";
    wrapStyle.flexDirection = "column";
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

    const onInputChange = (event: CheckboxChangeEvent) => {
      const checked = event.target?.checked;

      if (onChange) {
        handleComponentEvent("onChange", framework, page, scope, props, onChange, [checked]);
      }
    };

    return (
      <div data-component-id={props.$id} style={wrapStyle}>
        <Checkbox checked={checked} value={value} onChange={onInputChange}>
          {label}
        </Checkbox>
      </div>
    );
  },

  ...SfTextMeta,
} as Rock;

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
};

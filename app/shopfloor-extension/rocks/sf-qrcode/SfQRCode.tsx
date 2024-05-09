import { CommonProps, type Rock } from "@ruiapp/move-style";
import SfQRCodeMeta from "./SfQRCodeMeta";
import type { SfQRCodeRockConfig } from "./sf-qrcode-types";
import { pick } from "lodash";
import QRCode from "qrcode.react";

export default {
  Renderer(context, props: SfQRCodeRockConfig) {
    const { value, mode = "canvas", color, height, bgColor } = props;

    const wrapStyle: React.CSSProperties = pick(props, CommonProps.PositionStylePropNames) as any;
    wrapStyle.position = "absolute";

    return (
      <div data-component-id={props.$id} style={wrapStyle}>
        <QRCode size={height} value={value || ""} renderAs={mode} bgColor={"#f1f2f3"} fgColor={color} includeMargin />
      </div>
    );
  },

  ...SfQRCodeMeta,
} as Rock;

import { CommonProps, type Rock } from "@ruiapp/move-style";
import SfQRCodeScannerMeta from "./SfQRCodeScannerMeta";
import type { SfQRCodeScannerRockConfig } from "./sf-qrcode-scanner-types";
import { pick } from "lodash";
import { ScanOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { scan } from "~/shopfloor-extension/common-action";
import { convertToEventHandlers } from "@ruiapp/react-renderer";

export default {
  Renderer(context, props: SfQRCodeScannerRockConfig) {
    const { value, color, height, bgColor } = props;

    const [qrcode, setQRCode] = useState<string | undefined>(value);

    useEffect(() => {
      setQRCode(value);
    }, [value]);

    const styleNames = [...CommonProps.PositionStylePropNames, ...CommonProps.SizeStylePropNames];
    const wrapStyle: React.CSSProperties = pick(props, styleNames) as any;
    wrapStyle.position = "absolute";

    const eventHandlers = convertToEventHandlers({ context, rockConfig: props }) as any;

    return (
      <div
        data-component-id={props.$id}
        style={wrapStyle}
        className="lsb-qrcode-scanner"
        onClick={() => {
          scan(context, {
            componentId: props.$id,
            onOk(code) {
              eventHandlers?.onChange?.(code);

              setQRCode(code);
            },
          });
        }}
      >
        <div style={{ fontSize: Math.floor(Math.min(props.height, props.width) * 0.6), color: "#666", lineHeight: 1 }}>
          <ScanOutlined />
        </div>
        {qrcode ? <div>{qrcode}</div> : <div style={{ color: "#999" }}>请点击扫描二维码</div>}
      </div>
    );
  },

  ...SfQRCodeScannerMeta,
} as Rock;

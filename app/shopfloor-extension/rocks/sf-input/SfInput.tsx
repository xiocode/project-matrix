import { CommonProps, type Rock } from "@ruiapp/move-style";
import SfInputMeta from "./SfInputMeta";
import type { SfInputRockConfig } from "./sf-input-types";
import { pick } from "lodash";
import { Input } from "antd";
import { ScanOutlined } from "@ant-design/icons";
import { scan } from "~/shopfloor-extension/common-action";
import { convertToEventHandlers } from "@ruiapp/react-renderer";
import { useEffect, useState } from "react";

export default {
  Renderer(context, props: SfInputRockConfig) {
    const { value, height, showScanner = true } = props;

    const [text, setText] = useState<string | undefined>(value);

    useEffect(() => {
      setText(value);
    }, [value]);

    const styleNames = [...CommonProps.PositionStylePropNames, ...CommonProps.SizeStylePropNames];
    const wrapStyle: React.CSSProperties = pick(props, styleNames) as any;
    wrapStyle.position = "absolute";

    const eventHandlers = convertToEventHandlers({ context, rockConfig: props }) as any;

    let suffix = null;
    if (showScanner) {
      suffix = (
        <span
          style={{ lineHeight: 1, fontSize: Math.floor(height * 0.6) }}
          onClick={(e) => {
            e.stopPropagation();
            scan(context, {
              componentId: props.$id,
              onOk: (code) => {
                eventHandlers?.onChange?.(code);
                setText(code);
              },
            });
          }}
        >
          <ScanOutlined />
        </span>
      );
    }

    return <Input style={wrapStyle} value={text} suffix={suffix} />;
  },

  ...SfInputMeta,
} as Rock;

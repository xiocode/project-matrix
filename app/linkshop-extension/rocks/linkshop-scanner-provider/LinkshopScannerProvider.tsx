import type { Rock } from "@ruiapp/move-style";
import LinkshopScannerProviderMeta from "./LinkshopScannerProviderMeta";
import { renderRock, renderRockChildren } from "@ruiapp/react-renderer";
import { invokeMobileAction, useOnScanner } from "@rebirth/mobile-sdk";
import { useRef } from "react";

export interface IScanPayload {
  componentId?: string;
  onOk?(code: string): void;
}

export default {
  onResolveState(props, state) {
    const scanRef = useRef<IScanPayload>();

    useOnScanner((code) => {
      const { onOk } = scanRef.current || {};
      if (typeof onOk === "function") {
        onOk(code);
      }
    }, []);

    return {
      scan(payload: IScanPayload) {
        scanRef.current = payload;
        invokeMobileAction({
          type: "scan",
          method: "openScanner",
        });
      },
    };
  },

  onReceiveMessage(message, state, props) {
    if (message.name === "scan") {
      state.scan(message.payload);
    }
  },

  Renderer(context, props, state) {
    const { children } = props;

    return renderRockChildren({ context, rockChildrenConfig: children || [] });
  },

  ...LinkshopScannerProviderMeta,
} as Rock;

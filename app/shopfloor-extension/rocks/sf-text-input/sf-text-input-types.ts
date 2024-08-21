import { RockEventHandlerConfig } from "@ruiapp/move-style";
import type { LinkshopWidgetRockConfig } from "~/linkshop-extension/mod";

export interface SfTextInputRockConfig extends LinkshopWidgetRockConfig {
  value: string;
  disabled?: boolean;
  color: string;
  fontSize: string;
  direction: string;
  letterSpacing: string;
  horizontalAlignment: "start" | "end" | "left" | "right" | "center" | "justify" | "match-parent";
  verticalAlignment: string;
  fontWeightIsBold: boolean;
  fontStyleIsOblique: boolean;
  textDecorationLine: string;
  textDecorationStyle: "solid" | "double" | "dotted" | "dashed" | "wavy";
  textDecorationColor: string;
  onChange?: RockEventHandlerConfig;
}

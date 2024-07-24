import type { LinkshopWidgetRockConfig } from "~/linkshop-extension/mod";

export interface SfTextRockConfig extends LinkshopWidgetRockConfig {
  text: string;
  color: string;
  alignItems: string;
  fontSize: string;
  direction: string;
  letterSpacing: string;
  justifyContent: string;
  fontWeightIsBold: boolean;
  fontStyleIsOblique: boolean;
  textDecorationLine: string;
  textDecorationStyle: 'solid' | 'double' | 'dotted' | 'dashed' | 'wavy';
  textDecorationColor: string;
}

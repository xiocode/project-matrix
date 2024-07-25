import type { LinkshopWidgetRockConfig } from "~/linkshop-extension/mod";

export interface SfTextRockConfig extends LinkshopWidgetRockConfig {
  text: string;
  color: string;
  fontSize: string;
  direction: string;
  letterSpacing: string;
  horizontalAlignment: 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'match-parent';
  verticalAlignment: string;
  fontWeightIsBold: boolean;
  fontStyleIsOblique: boolean;
  textDecorationLine: string;
  textDecorationStyle: 'solid' | 'double' | 'dotted' | 'dashed' | 'wavy';
  textDecorationColor: string;
}

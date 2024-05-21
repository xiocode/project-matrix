import type { LinkshopWidgetRockConfig } from "~/linkshop-extension/mod";

export interface SfQRCodeScannerRockConfig extends LinkshopWidgetRockConfig {
  value?: string;
  color?: string;
  bgColor?: string;
  onChange?(value: string): void;
}

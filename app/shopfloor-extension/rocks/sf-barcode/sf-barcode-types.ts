import type { LinkshopWidgetRockConfig } from '~/linkshop-extension/mod';

export interface SfBarcodeRockConfig extends LinkshopWidgetRockConfig {
  value?: string;
  color?: string;
  displayValue?: boolean;
}

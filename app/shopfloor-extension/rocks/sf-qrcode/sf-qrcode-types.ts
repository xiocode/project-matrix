import type { LinkshopWidgetRockConfig } from '~/linkshop-extension/mod';

export interface SfQRCodeRockConfig extends LinkshopWidgetRockConfig {
  value?: string;
  mode?: 'canvas' | 'svg';
  color?: string;
  bgColor?: string;
}

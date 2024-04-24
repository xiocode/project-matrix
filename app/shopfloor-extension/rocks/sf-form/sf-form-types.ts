import type { LinkshopWidgetRockConfig } from '~/linkshop-extension/mod';

export interface SfFormRockConfig extends LinkshopWidgetRockConfig {
  title?: string;

  layout?: 'vertical' | 'horizontal' | 'inline'; // default: vertical

  items?: {
    label?: string;
    name: string;
    required?: boolean;
  }[];
}

import type { LinkshopWidgetRockConfig } from '~/linkshop-extension/mod';

export interface SfEntityDetailsRockConfig extends LinkshopWidgetRockConfig {
  title?: string;

  column?: number;

  layout?: 'horizontal' | 'vertical'; // default: vertical

  items: {
    label: string;
    dataIndex: any;
  }[];

  dataSource?: Record<string, any>;
}

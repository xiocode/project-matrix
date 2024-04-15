import type { LinkshopWidgetRockConfig } from '~/linkshop-extension/mod';

export interface SfEntityTableRockConfig extends LinkshopWidgetRockConfig {
  title?: string;

  entityCode?: string;

  columns: any[];
  dataSource?: any[];
}

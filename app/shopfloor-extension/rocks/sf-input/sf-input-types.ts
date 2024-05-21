import type { LinkshopWidgetRockConfig } from "~/linkshop-extension/mod";

export interface SfInputRockConfig extends LinkshopWidgetRockConfig {
  showScanner?: boolean;
  value?: string;
  onChange?(value: string): void;
}

import type { LinkshopWidgetRockConfig } from "~/linkshop-extension/mod";

export interface SfPDFViewerRockConfig extends LinkshopWidgetRockConfig {
  src?: string;
  fileObj?: any;
  borderWidth?: number;
  borderColor?: string;
  borderType?: "solid" | "dashed";
  borderRadius?: number;
  backgroundColor?: string;
  preview?: boolean; // 默认开启
}

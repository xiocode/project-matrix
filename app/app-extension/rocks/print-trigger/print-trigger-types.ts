import type { SimpleRockConfig } from "@ruiapp/move-style";

export interface PrintTriggerRockConfig extends SimpleRockConfig {
  dataSource: any[];
  printerCode?: string;
  printTemplateCode?: string;
}

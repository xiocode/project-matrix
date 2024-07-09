import type { SimpleRockConfig } from "@ruiapp/move-style";
import { RapidTableActionConfig } from "@ruiapp/rapid-extension";

export interface BatchPrintActionRockConfig extends SimpleRockConfig, RapidTableActionConfig {
  title?: string;
  printTemplateCode?: string;
  dataSourceAdapter?: string | ((...args: any[]) => any);
}

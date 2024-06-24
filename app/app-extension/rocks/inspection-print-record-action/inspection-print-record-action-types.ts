import type { SimpleRockConfig } from "@ruiapp/move-style";
import { RapidTableActionConfig } from "@ruiapp/rapid-extension";

export interface InspectionPrintRecordActionRockConfig extends SimpleRockConfig, RapidTableActionConfig {
  dataSourceAdapter?: string | ((...args: any[]) => any);
  printTemplateCode?: string;
}

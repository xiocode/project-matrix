import type { SimpleRockConfig } from "@ruiapp/move-style";
import { RapidTableActionConfig } from "@ruiapp/rapid-extension";

export interface SonicRecordActionPrintEntityRockConfig extends SimpleRockConfig, RapidTableActionConfig {
  dataSourceAdapter?: string | ((...args: any[]) => any);
}

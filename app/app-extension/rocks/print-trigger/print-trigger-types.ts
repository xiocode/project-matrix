import type { SimpleRockConfig } from "@ruiapp/move-style";

export interface PrintTriggerRockConfig extends SimpleRockConfig {
  dataSource: Record<string, any>[] | (() => Record<string, any>[]);
  printTemplateCode?: string;
}

import type { SimpleRockConfig } from "@ruiapp/move-style";

export interface BusinessTableRockConfig extends SimpleRockConfig {
  dataSource?: Record<string, any>[];
  columns: any[];
}

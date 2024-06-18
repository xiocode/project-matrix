import type { SimpleRockConfig } from "@ruiapp/move-style";

export interface BusinessTableRockConfig extends SimpleRockConfig {
  columns: any[];
  pageSize?: number;
  apiRequest?: {
    baseUrl?: string;
    url: string;
    method?: "post" | "get";
  };
}

import type { SimpleRockConfig } from "@ruiapp/move-style";

export interface TableSelectorColumn {
  code: string;
  title?: string;
  width?: number;
  fixed?: "left" | "right";
}

export interface TableSingleSelectorRockConfig extends SimpleRockConfig {
  pageSize?: number;
  labelFormat?: string;
  labelKey?: string; // 默认 name
  valueKey?: string; // 默认 id
  columns?: TableSelectorColumn[];
  requestConfig: {
    baseUrl?: string;
    url: string;
    method?: "post" | "get"; // 默认 post
  };
  value?: string;
  onChange?(value: string): void;
}

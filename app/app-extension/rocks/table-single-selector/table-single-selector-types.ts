import type { RockEventHandlerConfig, SimpleRockConfig } from "@ruiapp/move-style";
import { FindEntityOptions } from "@ruiapp/rapid-extension";
import { ReactNode } from "react";

export interface TableSelectorColumn {
  code: string;
  title?: string;
  width?: number;
  fixed?: "left" | "right";
  format?: string;
  render?: string | ((record: any) => ReactNode);
}

export interface TableSingleSelectorRockConfig extends SimpleRockConfig {
  placeholder?: string;
  allowClear?: boolean;
  pageSize?: number;
  searchFields?: string[]; // 默认 name、code
  labelFormat?: string;
  labelKey?: string; // 默认 name
  valueKey?: string; // 默认 id
  columns?: TableSelectorColumn[];
  requestConfig: {
    baseUrl?: string;
    url: string;
    method?: "post" | "get"; // 默认 post
    params?: {
      properties?: string[];
      fixedFilters?: FindEntityOptions["filters"];
      orderBy?: FindEntityOptions["orderBy"];
    };
  };
  value?: string;
  onChange?(value: string): void;
  onSelectedRecord?(record: Record<string, any>): void;
}

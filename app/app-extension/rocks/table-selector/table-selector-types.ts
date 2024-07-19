import type { RockEventHandlerConfig, SimpleRockConfig } from "@ruiapp/move-style";
import { FindEntityOptions } from "@ruiapp/rapid-core";
import { ReactNode } from "react";

export interface TableSelectorColumn {
  code: string;
  title?: string;
  width?: number;
  fixed?: "left" | "right";
  format?: string;
  render?: string | ((record: any) => ReactNode);
}

export interface TableSelectorRockConfig extends SimpleRockConfig {
  searchPlaceholder?: string;
  placeholder?: string;
  allowClear?: boolean;
  pageSize?: number;
  multiple?: boolean;
  searchFields?: string[]; // 默认 name、code
  labelFormat?: string;
  labelKey?: string; // 默认 name
  valueKey?: string; // 默认 id
  columns?: TableSelectorColumn[];
  dropdownMatchSelectWidth?: number;
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
  value?: string | string[];
  onChange?(value: string): void;
  onSelectedRecord?(record: Record<string, any>): void;
}

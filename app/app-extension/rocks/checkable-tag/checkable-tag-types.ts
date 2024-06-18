import type { SimpleRockConfig } from "@ruiapp/move-style";

export interface CheckableTagRockConfig extends SimpleRockConfig {
  labelKey?: string; // 默认 label
  valueKey?: string; // 默认 value
  options?: Record<string, any>[];
  value?: string[];
  onChange?(value: string[]): void;
}

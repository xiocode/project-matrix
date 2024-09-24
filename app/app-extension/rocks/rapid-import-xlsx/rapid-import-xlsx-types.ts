import type { SimpleRockConfig } from "@ruiapp/move-style";

export enum ERequestState {
  Pending,
  Processing,
  Canceled,
  Success,
  Fail,
}

export interface RapidImportXLSXRockConfig extends SimpleRockConfig {
  title?: string;
  importRuleCode: string;
}

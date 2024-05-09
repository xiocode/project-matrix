import { EntityStoreConfig, RapidFormConfig } from "@ruiapp/rapid-extension";

export interface SfEntityDetailsRockConfig extends RapidFormConfig {
  $id: string;
  $exps?: Record<string, any>;
  entityConfig?: EntityStoreConfig;
  entityId?: string;
}

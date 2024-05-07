import { EntityStoreConfig, RapidFormConfig } from '@ruiapp/rapid-extension';

export interface SfEntityFormRockConfig extends RapidFormConfig {
  $id: string;
  $exps?: Record<string, any>;
  entityConfig?: EntityStoreConfig;
  entityId?: string;
  mode?: 'new' | 'edit';
}

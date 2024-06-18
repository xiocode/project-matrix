import type { ContainerRockConfig, RockEventHandlerConfig } from "@ruiapp/move-style";
import { RapidFormConfig } from "@ruiapp/rapid-extension";

export interface BusinessFormConfig extends RapidFormConfig {
  mode?: "view" | "edit" | "new";

  onFormRefresh?: RockEventHandlerConfig;

  onValuesChange?: RockEventHandlerConfig;

  onSaveSuccess?: RockEventHandlerConfig;

  onSaveError?: RockEventHandlerConfig;
}

export interface BusinessFormRockConfig extends ContainerRockConfig, BusinessFormConfig {}

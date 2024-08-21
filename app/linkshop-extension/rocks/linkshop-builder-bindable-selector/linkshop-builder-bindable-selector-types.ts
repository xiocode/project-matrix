import type { ContainerRockConfig, RockEventHandlerConfig } from "@ruiapp/move-style";
import type { LinkshopAppRuntimeState } from "~/linkshop-extension/bindables/LinkshopAppRuntimeState";

export interface LinkshopBuilderBindableSelectorRockConfig extends ContainerRockConfig {
  runtimeState: LinkshopAppRuntimeState;
  selectedBindableKey?: string;
  onSelectedBindableKeyChange?: RockEventHandlerConfig;
  expandedBindableKeys?: string[];
  onExpandedBindableKeysChange?: RockEventHandlerConfig;
}

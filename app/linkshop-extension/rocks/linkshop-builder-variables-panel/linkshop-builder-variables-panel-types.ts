import type { SimpleRockConfig } from "@ruiapp/move-style";
import type { LinkshopAppRockConfig } from "../../linkshop-types";

export interface LinkshopBuilderVariablesPanelRockConfig extends SimpleRockConfig {
  shopfloorApp: LinkshopAppRockConfig;
}

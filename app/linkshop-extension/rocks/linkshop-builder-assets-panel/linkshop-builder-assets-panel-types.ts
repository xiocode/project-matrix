import type { SimpleRockConfig } from "@ruiapp/move-style";
import type { LinkshopAppRockConfig } from "../../linkshop-types";

export interface LinkshopBuilderAssetsPanelRockConfig extends SimpleRockConfig {
  shopfloorApp: LinkshopAppRockConfig;
}
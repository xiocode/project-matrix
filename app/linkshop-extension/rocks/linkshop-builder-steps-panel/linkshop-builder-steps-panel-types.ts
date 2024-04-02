import type { SimpleRockConfig } from "@ruiapp/move-style";
import type { LinkshopAppRockConfig } from "../../linkshop-types";

export interface LinkshopBuilderStepsPanelRockConfig extends SimpleRockConfig {
  designerStoreName?: string;
  shopfloorApp: LinkshopAppRockConfig;
}
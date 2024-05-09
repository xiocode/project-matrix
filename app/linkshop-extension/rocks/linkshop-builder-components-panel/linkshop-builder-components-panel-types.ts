import type { SimpleRockConfig } from "@ruiapp/move-style";
import type { LinkshopAppRockConfig } from "../../linkshop-types";

export interface LinkshopBuilderComponentsPanelRockConfig extends SimpleRockConfig {
  designerStoreName?: string;
  shopfloorApp: LinkshopAppRockConfig;
}

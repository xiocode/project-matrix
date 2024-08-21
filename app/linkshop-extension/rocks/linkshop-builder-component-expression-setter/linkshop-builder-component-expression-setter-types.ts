import type { ContainerRockConfig } from "@ruiapp/move-style";
import { LinkshopAppDesignerStore } from "~/linkshop-extension/stores/LinkshopAppDesignerStore";

export interface LinkshopBuilderComponentExpressionSetterRockConfig extends ContainerRockConfig {
  designerStore: LinkshopAppDesignerStore;
  propName: string;
}

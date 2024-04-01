import type { ContainerRockConfig, SimpleRockConfig } from "@ruiapp/move-style";

export type LinkshopWidgetCommonConfig = {
  left: number;

  top: number;

  width: number;

  height: number;
}

export type LinkshopAppRockConfig = SimpleRockConfig & LinkshopWidgetCommonConfig & {
  $type: "linkshopApp";

  /**
   * 应用步骤
   */
  steps: LinkshopAppStepRockConfig[];
}

export type LinkshopAppStepRockConfig = ContainerRockConfig & LinkshopWidgetCommonConfig & {
  $type: "linkshopAppStep";

  /**
   * 背景颜色
   */
  backgroundColor?: string;
}

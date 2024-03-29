import type { ContainerRockConfig } from "@ruiapp/move-style";

export interface LinkshopAppRockConfig extends ContainerRockConfig {
  $type: "linkshopApp";

  /**
   * 说明
   */
  note: string;

  /**
   * 应用步骤
   */
  steps: LinkshopAppStepRockConfig[];
}

export interface LinkshopAppStepRockConfig extends ContainerRockConfig {
  name: string;

  /**
   * 说明
   */
  note: string;

  /**
   * 背景颜色
   */
  backgroundColor?: string;
}
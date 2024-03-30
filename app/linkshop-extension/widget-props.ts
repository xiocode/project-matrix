import type { SimpleRockConfig } from "@ruiapp/move-style";

export interface LinkshopWidgetConfig extends SimpleRockConfig {
  /**
   * 组件名
   */
  name: string;

   /**
    * 说明
    */
  note: string; 

  left: number;

  top: number;

  width: number;

  height: number;
}

export interface LinkshopAppRockConfig extends LinkshopWidgetConfig {
  $type: "linkshopApp";

  /**
   * 应用步骤
   */
  steps: LinkshopAppStepRockConfig[];
}

export interface LinkshopAppStepRockConfig extends LinkshopWidgetConfig {

  /**
   * 背景颜色
   */
  backgroundColor?: string;
}

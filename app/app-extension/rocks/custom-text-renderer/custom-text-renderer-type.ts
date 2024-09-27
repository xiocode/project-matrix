import type { SimpleRockConfig } from "@ruiapp/move-style";

export interface CustomTextRendererRockConfig extends SimpleRockConfig {
  text?: string;
  render?: any;
}

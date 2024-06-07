import type { SimpleRockConfig } from "@ruiapp/move-style";

export interface BusinessFormRockConfig extends SimpleRockConfig {
  formData?: Record<string, any>;
  items: any[];
}

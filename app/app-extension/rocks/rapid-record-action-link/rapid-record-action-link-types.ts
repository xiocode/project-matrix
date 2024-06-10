import type { SimpleRockConfig } from "@ruiapp/move-style";

export interface LinkRockConfig extends SimpleRockConfig {
  className?: string;
  to: string;
  replace?: boolean;
  actionText?: string;
}

import type { SimpleRockConfig } from "@ruiapp/move-style";

export interface MultiplePrintTriggerRockConfig extends SimpleRockConfig {
  dataSource:
    | {
        templateCode: string;
        taskData: Record<string, any>;
      }[]
    | (() => {
        templateCode: string;
        taskData: Record<string, any>;
      }[]);
}

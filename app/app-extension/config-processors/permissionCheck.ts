import type { ConfigProcessor } from "@ruiapp/move-style";
import { get, isArray, isString, set } from "lodash";

export default {
  beforeRockRender(options) {
    const { rockConfig } = options;
    let policy = rockConfig.$permissionCheck;
    if (policy) {
      if (isString(policy)) {
        policy = { any: [policy] };
      } else if (isArray(policy)) {
        policy = { all: policy };
      }

      if (get(rockConfig, "$exps._hidden")) {
        set(
          rockConfig,
          "$exps._hidden",
          `(${get(rockConfig, "$exps._hidden")}) || !$functions.isAccessAllowed(${JSON.stringify(policy)}, me?.allowedActions || [])`,
        );
      } else {
        set(rockConfig, "$exps._hidden", `!$functions.isAccessAllowed(${JSON.stringify(policy)}, me?.allowedActions || [])`);
      }
    }
  },
} as ConfigProcessor;

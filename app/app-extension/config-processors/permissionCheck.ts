import type { ConfigProcessor } from "@ruiapp/move-style";
import { isArray, isString, set } from "lodash";

export default {
  beforeRockRender(config) {
    let policy = config.$permissionCheck;
    if (policy) {
      if (isString(policy)) {
        policy = { any: [policy] };
      } else if (isArray(policy)) {
        policy = { all: policy };
      }
      set(config, "$exps._hidden", `!$functions.isAccessAllowed(${JSON.stringify(policy)}, me?.allowedActions || [])`)
    }
  },
} as ConfigProcessor;
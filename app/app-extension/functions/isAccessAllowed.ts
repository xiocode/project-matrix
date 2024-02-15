import type { FunctionMeta } from "@ruiapp/move-style";
import { isAccessAllowed } from "~/utils/access-control-utility";

export default {
  name: "isAccessAllowed",
  func: isAccessAllowed,
} as FunctionMeta;
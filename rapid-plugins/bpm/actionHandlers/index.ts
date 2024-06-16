import type { IPluginActionHandler } from "@ruiapp/rapid-core";
import * as createProcessInstance from "./createProcessInstance";

export default [
  createProcessInstance as any,
] satisfies IPluginActionHandler[];
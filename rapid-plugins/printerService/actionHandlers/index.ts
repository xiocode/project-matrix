import type { IPluginActionHandler } from "@ruiapp/rapid-core";
import * as createPrintTasks from "./createPrintTasks";
import * as getNextPendingPrintTask from "./getNextPendingPrintTask";
import * as registerPrinter from "./registerPrinter";
import * as updatePrinterState from "./updatePrinterState";
import * as updatePrintTaskState from "./updatePrintTaskState";

export default [
  createPrintTasks as any,
  getNextPendingPrintTask as any,
  registerPrinter as any,
  updatePrinterState as any,
  updatePrintTaskState as any,
] satisfies IPluginActionHandler[];
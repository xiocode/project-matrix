import createPrintTasks from "./createPrintTasks";
import getNextPendingPrintTask from "./getNextPendingPrintTask";
import pingPrinter from "./pingPrinter";
import registerPrinter from "./registerPrinter";
import updatePrinterState from "./updatePrinterState";
import updatePrintTaskState from "./updatePrintTaskState";

export default [
  createPrintTasks,
  getNextPendingPrintTask,
  pingPrinter,
  registerPrinter,
  updatePrinterState,
  updatePrintTaskState,
]
import { IPluginActionHandler } from "@ruiapp/rapid-core";
import * as runServerOperation from "./runServerOperation";

export default [
  runServerOperation,
] satisfies IPluginActionHandler[];
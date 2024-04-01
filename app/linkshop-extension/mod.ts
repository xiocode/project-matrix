import type { RuiExtension } from "@ruiapp/move-style";
import rocks from "./rocks";
import functions from "./functions";
import configProcessors from "./config-processors";
import stores from "./stores";

export default {
  rocks,
  stores,
  functions,
  configProcessors,
} as RuiExtension;

export * from "./linkshop-types";
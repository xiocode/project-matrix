import type { EntityWatcher } from "@ruiapp/rapid-core";
import bpmTaskEntityWatchers from "./bpmTaskEntityWatchers";

export default [
  ...bpmTaskEntityWatchers,
] satisfies EntityWatcher<any>[];
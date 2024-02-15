import type { EntityWatcherType as TEntityWatcherType } from '@ruiapp/rapid-core';
import cbs$CbsOrderItemWatchers from '../models/entity-watchers/cbs/CbsOrderItemWatchers';

export default [
  ...cbs$CbsOrderItemWatchers,
] as TEntityWatcherType[];

import type { EntityWatcherType as TEntityWatcherType } from '@ruiapp/rapid-core';
import cbs$CbsOrderItemWatchers from '../models/entity-watchers/cbs/CbsOrderItemWatchers';
import cbs$CbsOrderWatchers from '../models/entity-watchers/cbs/CbsOrderWatchers';
import mom$MomInspection from '../models/entity-watchers/mom/MomInspection';
import mom$MomInventoryOperation from '../models/entity-watchers/mom/MomInventoryOperation';
import mom$MomWorkOrder from '../models/entity-watchers/mom/MomWorkOrder';
import mom$MomWorkReport from '../models/entity-watchers/mom/MomWorkReport';
import mom$MomWorkTask from '../models/entity-watchers/mom/MomWorkTask';

export default [
  ...cbs$CbsOrderItemWatchers,
  ...cbs$CbsOrderWatchers,
  ...mom$MomInspection,
  ...mom$MomInventoryOperation,
  ...mom$MomWorkOrder,
  ...mom$MomWorkReport,
  ...mom$MomWorkTask,
] as TEntityWatcherType[];

import type { EntityWatcherType as TEntityWatcherType } from "@ruiapp/rapid-core";
import cbs$CbsOrderItemWatchers from "../models/entity-watchers/cbs/CbsOrderItemWatchers";
import cbs$CbsOrderWatchers from "../models/entity-watchers/cbs/CbsOrderWatchers";
import mom$MomInventoryOperation from "../models/entity-watchers/mom/MomInventoryOperation";
import mom$MomWorkOrder from "../models/entity-watchers/mom/MomWorkOrder";

export default [...cbs$CbsOrderItemWatchers, ...cbs$CbsOrderWatchers, ...mom$MomInventoryOperation, ...mom$MomWorkOrder] as TEntityWatcherType[];

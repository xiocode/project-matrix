import type { ServerOperation as TServerOperation } from '@ruiapp/rapid-core';
import mom$calcMaterialRequirements from '../models/server-operations/mom/calcMaterialRequirements';
import mom$calcWorkOrderMaterialRequirements from '../models/server-operations/mom/calcWorkOrderMaterialRequirements';
import mom$createGoodTransfers from '../models/server-operations/mom/createGoodTransfers';
import mom$createInventoryApplicationItems from '../models/server-operations/mom/createInventoryApplicationItems';
import mom$createInventoryOperation from '../models/server-operations/mom/createInventoryOperation';
import mom$listGoodCheckTransfer from '../models/server-operations/mom/listGoodCheckTransfer';
import mom$listGoodInTransfer from '../models/server-operations/mom/listGoodInTransfer';
import mom$listGoodOutTransfer from '../models/server-operations/mom/listGoodOutTransfer';
import mom$mergeGoods from '../models/server-operations/mom/mergeGoods';
import mom$splitGoods from '../models/server-operations/mom/splitGoods';
import mom$submitGoodInTransfers from '../models/server-operations/mom/submitGoodInTransfers';
import mom$submitGoodOutTransfers from '../models/server-operations/mom/submitGoodOutTransfers';
import mom$submitMrpResult from '../models/server-operations/mom/submitMrpResult';
import mom$submitWorkOrderMrpResult from '../models/server-operations/mom/submitWorkOrderMrpResult';
import notification$readAllNotifications from '../models/server-operations/notification/readAllNotifications';
import sys$listMyAllowedSysActions from '../models/server-operations/sys/listMyAllowedSysActions';

export default [
  mom$calcMaterialRequirements,
  mom$calcWorkOrderMaterialRequirements,
  mom$createGoodTransfers,
  mom$createInventoryApplicationItems,
  mom$createInventoryOperation,
  mom$listGoodCheckTransfer,
  mom$listGoodInTransfer,
  mom$listGoodOutTransfer,
  mom$mergeGoods,
  mom$splitGoods,
  mom$submitGoodInTransfers,
  mom$submitGoodOutTransfers,
  mom$submitMrpResult,
  mom$submitWorkOrderMrpResult,
  notification$readAllNotifications,
  sys$listMyAllowedSysActions,
] as TServerOperation[];

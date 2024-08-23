import type { ServerOperation as TServerOperation } from '@ruiapp/rapid-core';
import mom$calcMaterialRequirements from '../models/server-operations/mom/calcMaterialRequirements';
import mom$calcWorkOrderMaterialRequirements from '../models/server-operations/mom/calcWorkOrderMaterialRequirements';
import mom$createGoodTransferIn from '../models/server-operations/mom/createGoodTransferIn';
import mom$createInventoryApplicationItems from '../models/server-operations/mom/createInventoryApplicationItems';
import mom$createInventoryOperation from '../models/server-operations/mom/createInventoryOperation';
import mom$exportExcel from '../models/server-operations/mom/exportExcel';
import mom$listGoodCheckTransfer from '../models/server-operations/mom/listGoodCheckTransfer';
import mom$listGoodInTransfer from '../models/server-operations/mom/listGoodInTransfer';
import mom$listGoodOutTransfer from '../models/server-operations/mom/listGoodOutTransfer';
import mom$listGoodsByInspectRule from '../models/server-operations/mom/listGoodsByInspectRule';
import mom$listInventoryCheckTransfer from '../models/server-operations/mom/listInventoryCheckTransfer';
import mom$listInventoryOperationCount from '../models/server-operations/mom/listInventoryOperationCount';
import mom$listMaterialInspections from '../models/server-operations/mom/listMaterialInspections';
import mom$listRawMaterialInspections from '../models/server-operations/mom/listRawMaterialInspections';
import mom$mergeGoods from '../models/server-operations/mom/mergeGoods';
import mom$splitGoods from '../models/server-operations/mom/splitGoods';
import mom$submitGoodCheckedTransfers from '../models/server-operations/mom/submitGoodCheckedTransfers';
import mom$submitGoodInTransfers from '../models/server-operations/mom/submitGoodInTransfers';
import mom$submitGoodOutTransfers from '../models/server-operations/mom/submitGoodOutTransfers';
import mom$submitMrpResult from '../models/server-operations/mom/submitMrpResult';
import mom$submitWorkOrderMrpResult from '../models/server-operations/mom/submitWorkOrderMrpResult';
import notification$readAllNotifications from '../models/server-operations/notification/readAllNotifications';
import sys$listMyAllowedSysActions from '../models/server-operations/sys/listMyAllowedSysActions';

export default [
  mom$calcMaterialRequirements,
  mom$calcWorkOrderMaterialRequirements,
  mom$createGoodTransferIn,
  mom$createInventoryApplicationItems,
  mom$createInventoryOperation,
  mom$exportExcel,
  mom$listGoodCheckTransfer,
  mom$listGoodInTransfer,
  mom$listGoodOutTransfer,
  mom$listGoodsByInspectRule,
  mom$listInventoryCheckTransfer,
  mom$listInventoryOperationCount,
  mom$listMaterialInspections,
  mom$listRawMaterialInspections,
  mom$mergeGoods,
  mom$splitGoods,
  mom$submitGoodCheckedTransfers,
  mom$submitGoodInTransfers,
  mom$submitGoodOutTransfers,
  mom$submitMrpResult,
  mom$submitWorkOrderMrpResult,
  notification$readAllNotifications,
  sys$listMyAllowedSysActions,
] as TServerOperation[];

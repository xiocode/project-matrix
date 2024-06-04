import type { ServerOperation as TServerOperation } from '@ruiapp/rapid-core';
import mom$calcMaterialRequirements from '../models/server-operations/mom/calcMaterialRequirements';
import mom$createGoodTransfers from '../models/server-operations/mom/createGoodTransfers';
import mom$createInventoryOperation from '../models/server-operations/mom/createInventoryOperation';
import mom$listGoodInTransfer from '../models/server-operations/mom/listGoodInTransfer';
import mom$listGoodOutTransfer from '../models/server-operations/mom/listGoodOutTransfer';
import mom$submitGoodInTransfers from '../models/server-operations/mom/submitGoodInTransfers';
import mom$submitGoodOutTransfers from '../models/server-operations/mom/submitGoodOutTransfers';
import mom$submitMrpResult from '../models/server-operations/mom/submitMrpResult';
import sys$listMyAllowedSysActions from '../models/server-operations/sys/listMyAllowedSysActions';

export default [
  mom$calcMaterialRequirements,
  mom$createGoodTransfers,
  mom$createInventoryOperation,
  mom$listGoodInTransfer,
  mom$listGoodOutTransfer,
  mom$submitGoodInTransfers,
  mom$submitGoodOutTransfers,
  mom$submitMrpResult,
  sys$listMyAllowedSysActions,
] as TServerOperation[];

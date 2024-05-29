import type { ServerOperation as TServerOperation } from '@ruiapp/rapid-core';
import mom$calcMaterialRequirements from '../models/server-operations/mom/calcMaterialRequirements';
import mom$createGoodTransfers from '../models/server-operations/mom/createGoodTransfers';
import mom$createInventoryOperation from '../models/server-operations/mom/createInventoryOperation';
import mom$listGoodTransfer from '../models/server-operations/mom/listGoodTransfer';
import mom$submitGoodTransfers from '../models/server-operations/mom/submitGoodTransfers';
import mom$submitMrpResult from '../models/server-operations/mom/submitMrpResult';
import sys$listMyAllowedSysActions from '../models/server-operations/sys/listMyAllowedSysActions';

export default [
  mom$calcMaterialRequirements,
  mom$createGoodTransfers,
  mom$createInventoryOperation,
  mom$listGoodTransfer,
  mom$submitGoodTransfers,
  mom$submitMrpResult,
  sys$listMyAllowedSysActions,
] as TServerOperation[];

import type { ServerOperation as TServerOperation } from '@ruiapp/rapid-core';
import mom$calcMaterialRequirements from '../models/server-operations/mom/calcMaterialRequirements';
import mom$createInventoryOperation from '../models/server-operations/mom/createInventoryOperation';
import mom$submitMrpResult from '../models/server-operations/mom/submitMrpResult';
import sys$listMyAllowedSysActions from '../models/server-operations/sys/listMyAllowedSysActions';

export default [
  mom$calcMaterialRequirements,
  mom$createInventoryOperation,
  mom$submitMrpResult,
  sys$listMyAllowedSysActions,
] as TServerOperation[];

import type { ServerOperation as TServerOperation } from '@ruiapp/rapid-core';
import mom$calcMaterialRequirements from '../models/server-operations/mom/calcMaterialRequirements';
import sys$listMyAllowedSysActions from '../models/server-operations/sys/listMyAllowedSysActions';

export default [
  mom$calcMaterialRequirements,
  sys$listMyAllowedSysActions,
] as TServerOperation[];

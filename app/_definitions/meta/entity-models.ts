import type { RapidEntity as TRapidEntity } from '@ruiapp/rapid-extension';
import { autoConfigureRapidEntity } from '@ruiapp/rapid-extension';
import AppClient from '../models/entities/AppClient';
import AppNavItem from '../models/entities/AppNavItem';
import BaseEmployee from '../models/entities/BaseEmployee';
import BaseFormField from '../models/entities/BaseFormField';
import BaseMaterial from '../models/entities/BaseMaterial';
import BaseMaterialBreakdown from '../models/entities/BaseMaterialBreakdown';
import BaseMaterialBreakdownPart from '../models/entities/BaseMaterialBreakdownPart';
import BaseMaterialCategory from '../models/entities/BaseMaterialCategory';
import BaseMaterialDocument from '../models/entities/BaseMaterialDocument';
import BaseMaterialFlow from '../models/entities/BaseMaterialFlow';
import BaseMaterialFlowProcess from '../models/entities/BaseMaterialFlowProcess';
import BaseMaterialFlowProcessInput from '../models/entities/BaseMaterialFlowProcessInput';
import BaseMaterialFlowProcessOutput from '../models/entities/BaseMaterialFlowProcessOutput';
import BasePartner from '../models/entities/BasePartner';
import BasePartnerCategory from '../models/entities/BasePartnerCategory';
import BaseProdFlow from '../models/entities/BaseProdFlow';
import BaseProdFlowProcess from '../models/entities/BaseProdFlowProcess';
import BaseProdFlowTemplate from '../models/entities/BaseProdFlowTemplate';
import BaseProdFlowTemplateProcess from '../models/entities/BaseProdFlowTemplateProcess';
import BaseProdProcess from '../models/entities/BaseProdProcess';
import BaseProdProcessCategory from '../models/entities/BaseProdProcessCategory';
import BaseUnit from '../models/entities/BaseUnit';
import BaseUnitCategory from '../models/entities/BaseUnitCategory';
import BaseWarehouse from '../models/entities/BaseWarehouse';
import BpmBusinessActivity from '../models/entities/BpmBusinessActivity';
import BpmBusinessApplication from '../models/entities/BpmBusinessApplication';
import BpmBusinessCategory from '../models/entities/BpmBusinessCategory';
import BpmBusinessProcess from '../models/entities/BpmBusinessProcess';
import BpmBusinessProcessRevision from '../models/entities/BpmBusinessProcessRevision';
import BpmBusinessTask from '../models/entities/BpmBusinessTask';
import CbsContract from '../models/entities/CbsContract';
import CbsContractFile from '../models/entities/CbsContractFile';
import CbsContractFundingBudget from '../models/entities/CbsContractFundingBudget';
import CbsContractRelation from '../models/entities/CbsContractRelation';
import CbsContractRelationKind from '../models/entities/CbsContractRelationKind';
import CbsOrder from '../models/entities/CbsOrder';
import CbsOrderItem from '../models/entities/CbsOrderItem';
import EcmDocument from '../models/entities/EcmDocument';
import EcmRevision from '../models/entities/EcmRevision';
import EcmStorageObject from '../models/entities/EcmStorageObject';
import FinAccount from '../models/entities/FinAccount';
import FinBussinessCategory from '../models/entities/FinBussinessCategory';
import FinExpenseCategory from '../models/entities/FinExpenseCategory';
import FinTransaction from '../models/entities/FinTransaction';
import MetaDataDictionary from '../models/entities/MetaDataDictionary';
import MetaDataDictionaryEntry from '../models/entities/MetaDataDictionaryEntry';
import MetaModel from '../models/entities/MetaModel';
import MetaProperty from '../models/entities/MetaProperty';
import MetaRoute from '../models/entities/MetaRoute';
import OcDepartment from '../models/entities/OcDepartment';
import OcRole from '../models/entities/OcRole';
import OcUser from '../models/entities/OcUser';
import PmMilestone from '../models/entities/PmMilestone';
import PmPhase from '../models/entities/PmPhase';
import PmProject from '../models/entities/PmProject';
import PmProjectBudget from '../models/entities/PmProjectBudget';
import PmProjectCategory from '../models/entities/PmProjectCategory';
import PmProjectCost from '../models/entities/PmProjectCost';
import PmProjectCostCategory from '../models/entities/PmProjectCostCategory';
import PmProjectLog from '../models/entities/PmProjectLog';
import SysWebhook from '../models/entities/SysWebhook';

export default [
  autoConfigureRapidEntity(AppClient),
  autoConfigureRapidEntity(AppNavItem),
  autoConfigureRapidEntity(BaseEmployee),
  autoConfigureRapidEntity(BaseFormField),
  autoConfigureRapidEntity(BaseMaterial),
  autoConfigureRapidEntity(BaseMaterialBreakdown),
  autoConfigureRapidEntity(BaseMaterialBreakdownPart),
  autoConfigureRapidEntity(BaseMaterialCategory),
  autoConfigureRapidEntity(BaseMaterialDocument),
  autoConfigureRapidEntity(BaseMaterialFlow),
  autoConfigureRapidEntity(BaseMaterialFlowProcess),
  autoConfigureRapidEntity(BaseMaterialFlowProcessInput),
  autoConfigureRapidEntity(BaseMaterialFlowProcessOutput),
  autoConfigureRapidEntity(BasePartner),
  autoConfigureRapidEntity(BasePartnerCategory),
  autoConfigureRapidEntity(BaseProdFlow),
  autoConfigureRapidEntity(BaseProdFlowProcess),
  autoConfigureRapidEntity(BaseProdFlowTemplate),
  autoConfigureRapidEntity(BaseProdFlowTemplateProcess),
  autoConfigureRapidEntity(BaseProdProcess),
  autoConfigureRapidEntity(BaseProdProcessCategory),
  autoConfigureRapidEntity(BaseUnit),
  autoConfigureRapidEntity(BaseUnitCategory),
  autoConfigureRapidEntity(BaseWarehouse),
  autoConfigureRapidEntity(BpmBusinessActivity),
  autoConfigureRapidEntity(BpmBusinessApplication),
  autoConfigureRapidEntity(BpmBusinessCategory),
  autoConfigureRapidEntity(BpmBusinessProcess),
  autoConfigureRapidEntity(BpmBusinessProcessRevision),
  autoConfigureRapidEntity(BpmBusinessTask),
  autoConfigureRapidEntity(CbsContract),
  autoConfigureRapidEntity(CbsContractFile),
  autoConfigureRapidEntity(CbsContractFundingBudget),
  autoConfigureRapidEntity(CbsContractRelation),
  autoConfigureRapidEntity(CbsContractRelationKind),
  autoConfigureRapidEntity(CbsOrder),
  autoConfigureRapidEntity(CbsOrderItem),
  autoConfigureRapidEntity(EcmDocument),
  autoConfigureRapidEntity(EcmRevision),
  autoConfigureRapidEntity(EcmStorageObject),
  autoConfigureRapidEntity(FinAccount),
  autoConfigureRapidEntity(FinBussinessCategory),
  autoConfigureRapidEntity(FinExpenseCategory),
  autoConfigureRapidEntity(FinTransaction),
  autoConfigureRapidEntity(MetaDataDictionary),
  autoConfigureRapidEntity(MetaDataDictionaryEntry),
  autoConfigureRapidEntity(MetaModel),
  autoConfigureRapidEntity(MetaProperty),
  autoConfigureRapidEntity(MetaRoute),
  autoConfigureRapidEntity(OcDepartment),
  autoConfigureRapidEntity(OcRole),
  autoConfigureRapidEntity(OcUser),
  autoConfigureRapidEntity(PmMilestone),
  autoConfigureRapidEntity(PmPhase),
  autoConfigureRapidEntity(PmProject),
  autoConfigureRapidEntity(PmProjectBudget),
  autoConfigureRapidEntity(PmProjectCategory),
  autoConfigureRapidEntity(PmProjectCost),
  autoConfigureRapidEntity(PmProjectCostCategory),
  autoConfigureRapidEntity(PmProjectLog),
  autoConfigureRapidEntity(SysWebhook),
] as TRapidEntity[];

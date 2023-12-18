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
import CmContract from '../models/entities/CmContract';
import EcmDocument from '../models/entities/EcmDocument';
import EcmRevision from '../models/entities/EcmRevision';
import EcmStorageObject from '../models/entities/EcmStorageObject';
import MetaDataDictionary from '../models/entities/MetaDataDictionary';
import MetaDataDictionaryEntry from '../models/entities/MetaDataDictionaryEntry';
import MetaModel from '../models/entities/MetaModel';
import MetaProperty from '../models/entities/MetaProperty';
import MetaRoute from '../models/entities/MetaRoute';
import OcDepartment from '../models/entities/OcDepartment';
import OcRole from '../models/entities/OcRole';
import OcUser from '../models/entities/OcUser';
import PmProject from '../models/entities/PmProject';
import PmProjectCategory from '../models/entities/PmProjectCategory';
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
  autoConfigureRapidEntity(CmContract),
  autoConfigureRapidEntity(EcmDocument),
  autoConfigureRapidEntity(EcmRevision),
  autoConfigureRapidEntity(EcmStorageObject),
  autoConfigureRapidEntity(MetaDataDictionary),
  autoConfigureRapidEntity(MetaDataDictionaryEntry),
  autoConfigureRapidEntity(MetaModel),
  autoConfigureRapidEntity(MetaProperty),
  autoConfigureRapidEntity(MetaRoute),
  autoConfigureRapidEntity(OcDepartment),
  autoConfigureRapidEntity(OcRole),
  autoConfigureRapidEntity(OcUser),
  autoConfigureRapidEntity(PmProject),
  autoConfigureRapidEntity(PmProjectCategory),
  autoConfigureRapidEntity(SysWebhook),
] as TRapidEntity[];

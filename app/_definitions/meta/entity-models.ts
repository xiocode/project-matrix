import type { RapidEntity as TRapidEntity } from '@ruiapp/rapid-extension';
import { autoConfigureRapidEntity } from '@ruiapp/rapid-extension';
import AppClient from '../models/entities/AppClient';
import AppNavItem from '../models/entities/AppNavItem';
import BaseBuilding from '../models/entities/BaseBuilding';
import BaseEmployee from '../models/entities/BaseEmployee';
import BaseFormField from '../models/entities/BaseFormField';
import BaseGate from '../models/entities/BaseGate';
import BaseLocation from '../models/entities/BaseLocation';
import BaseMaterial from '../models/entities/BaseMaterial';
import BaseMaterialCategory from '../models/entities/BaseMaterialCategory';
import BaseMaterialDocument from '../models/entities/BaseMaterialDocument';
import BaseMaterialType from '../models/entities/BaseMaterialType';
import BaseOffice from '../models/entities/BaseOffice';
import BasePartner from '../models/entities/BasePartner';
import BasePartnerCategory from '../models/entities/BasePartnerCategory';
import BaseUnit from '../models/entities/BaseUnit';
import BaseUnitCategory from '../models/entities/BaseUnitCategory';
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
import FinBusinessCategory from '../models/entities/FinBusinessCategory';
import FinExpenseCategory from '../models/entities/FinExpenseCategory';
import FinTransaction from '../models/entities/FinTransaction';
import MetaDataDictionary from '../models/entities/MetaDataDictionary';
import MetaDataDictionaryEntry from '../models/entities/MetaDataDictionaryEntry';
import MetaModel from '../models/entities/MetaModel';
import MetaProperty from '../models/entities/MetaProperty';
import MetaRoute from '../models/entities/MetaRoute';
import MomEquipment from '../models/entities/MomEquipment';
import MomEquipmentCategory from '../models/entities/MomEquipmentCategory';
import MomGood from '../models/entities/MomGood';
import MomGoodLabel from '../models/entities/MomGoodLabel';
import MomGoodLocation from '../models/entities/MomGoodLocation';
import MomGoodTransfer from '../models/entities/MomGoodTransfer';
import MomInspectionCategory from '../models/entities/MomInspectionCategory';
import MomInspectionCharacteristic from '../models/entities/MomInspectionCharacteristic';
import MomInspectionCharacteristicCategory from '../models/entities/MomInspectionCharacteristicCategory';
import MomInspectionInstrument from '../models/entities/MomInspectionInstrument';
import MomInspectionInstrumentCategory from '../models/entities/MomInspectionInstrumentCategory';
import MomInspectionMethod from '../models/entities/MomInspectionMethod';
import MomInspectionRecord from '../models/entities/MomInspectionRecord';
import MomInspectionRule from '../models/entities/MomInspectionRule';
import MomInspectionSheet from '../models/entities/MomInspectionSheet';
import MomInventory from '../models/entities/MomInventory';
import MomInventoryBusinessType from '../models/entities/MomInventoryBusinessType';
import MomInventoryLabel from '../models/entities/MomInventoryLabel';
import MomInventoryOperation from '../models/entities/MomInventoryOperation';
import MomLab from '../models/entities/MomLab';
import MomLine from '../models/entities/MomLine';
import MomManufacturingResourcePlan from '../models/entities/MomManufacturingResourcePlan';
import MomMasterProductionSchedule from '../models/entities/MomMasterProductionSchedule';
import MomMasterProductionScheduleItem from '../models/entities/MomMasterProductionScheduleItem';
import MomMaterialBreakdown from '../models/entities/MomMaterialBreakdown';
import MomMaterialBreakdownPart from '../models/entities/MomMaterialBreakdownPart';
import MomPackage from '../models/entities/MomPackage';
import MomPackageGood from '../models/entities/MomPackageGood';
import MomProcess from '../models/entities/MomProcess';
import MomProcessCategory from '../models/entities/MomProcessCategory';
import MomRoute from '../models/entities/MomRoute';
import MomRouteProcess from '../models/entities/MomRouteProcess';
import MomRouteProcessInput from '../models/entities/MomRouteProcessInput';
import MomRouteProcessOutput from '../models/entities/MomRouteProcessOutput';
import MomRouteTemplate from '../models/entities/MomRouteTemplate';
import MomRouteTemplateProcess from '../models/entities/MomRouteTemplateProcess';
import MomShift from '../models/entities/MomShift';
import MomShop from '../models/entities/MomShop';
import MomStation from '../models/entities/MomStation';
import MomWarehouse from '../models/entities/MomWarehouse';
import MomWorkOrder from '../models/entities/MomWorkOrder';
import MomWorkReport from '../models/entities/MomWorkReport';
import MomWorkTask from '../models/entities/MomWorkTask';
import MomWorkTeam from '../models/entities/MomWorkTeam';
import MomWorkTrack from '../models/entities/MomWorkTrack';
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
import PmProjectEvent from '../models/entities/PmProjectEvent';
import ShopFloorApp from '../models/entities/ShopFloorApp';
import ShopFloorAppLayout from '../models/entities/ShopFloorAppLayout';
import ShopFloorAppStep from '../models/entities/ShopFloorAppStep';
import ShopFloorAppVersion from '../models/entities/ShopFloorAppVersion';
import ShopFloorDisplayDevice from '../models/entities/ShopFloorDisplayDevice';
import ShopFloorStation from '../models/entities/ShopFloorStation';
import SysAction from '../models/entities/SysAction';
import SysActionGroup from '../models/entities/SysActionGroup';
import SysWebhook from '../models/entities/SysWebhook';

export default [
  autoConfigureRapidEntity(AppClient),
  autoConfigureRapidEntity(AppNavItem),
  autoConfigureRapidEntity(BaseBuilding),
  autoConfigureRapidEntity(BaseEmployee),
  autoConfigureRapidEntity(BaseFormField),
  autoConfigureRapidEntity(BaseGate),
  autoConfigureRapidEntity(BaseLocation),
  autoConfigureRapidEntity(BaseMaterial),
  autoConfigureRapidEntity(BaseMaterialCategory),
  autoConfigureRapidEntity(BaseMaterialDocument),
  autoConfigureRapidEntity(BaseMaterialType),
  autoConfigureRapidEntity(BaseOffice),
  autoConfigureRapidEntity(BasePartner),
  autoConfigureRapidEntity(BasePartnerCategory),
  autoConfigureRapidEntity(BaseUnit),
  autoConfigureRapidEntity(BaseUnitCategory),
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
  autoConfigureRapidEntity(FinBusinessCategory),
  autoConfigureRapidEntity(FinExpenseCategory),
  autoConfigureRapidEntity(FinTransaction),
  autoConfigureRapidEntity(MetaDataDictionary),
  autoConfigureRapidEntity(MetaDataDictionaryEntry),
  autoConfigureRapidEntity(MetaModel),
  autoConfigureRapidEntity(MetaProperty),
  autoConfigureRapidEntity(MetaRoute),
  autoConfigureRapidEntity(MomEquipment),
  autoConfigureRapidEntity(MomEquipmentCategory),
  autoConfigureRapidEntity(MomGood),
  autoConfigureRapidEntity(MomGoodLabel),
  autoConfigureRapidEntity(MomGoodLocation),
  autoConfigureRapidEntity(MomGoodTransfer),
  autoConfigureRapidEntity(MomInspectionCategory),
  autoConfigureRapidEntity(MomInspectionCharacteristic),
  autoConfigureRapidEntity(MomInspectionCharacteristicCategory),
  autoConfigureRapidEntity(MomInspectionInstrument),
  autoConfigureRapidEntity(MomInspectionInstrumentCategory),
  autoConfigureRapidEntity(MomInspectionMethod),
  autoConfigureRapidEntity(MomInspectionRecord),
  autoConfigureRapidEntity(MomInspectionRule),
  autoConfigureRapidEntity(MomInspectionSheet),
  autoConfigureRapidEntity(MomInventory),
  autoConfigureRapidEntity(MomInventoryBusinessType),
  autoConfigureRapidEntity(MomInventoryLabel),
  autoConfigureRapidEntity(MomInventoryOperation),
  autoConfigureRapidEntity(MomLab),
  autoConfigureRapidEntity(MomLine),
  autoConfigureRapidEntity(MomManufacturingResourcePlan),
  autoConfigureRapidEntity(MomMasterProductionSchedule),
  autoConfigureRapidEntity(MomMasterProductionScheduleItem),
  autoConfigureRapidEntity(MomMaterialBreakdown),
  autoConfigureRapidEntity(MomMaterialBreakdownPart),
  autoConfigureRapidEntity(MomPackage),
  autoConfigureRapidEntity(MomPackageGood),
  autoConfigureRapidEntity(MomProcess),
  autoConfigureRapidEntity(MomProcessCategory),
  autoConfigureRapidEntity(MomRoute),
  autoConfigureRapidEntity(MomRouteProcess),
  autoConfigureRapidEntity(MomRouteProcessInput),
  autoConfigureRapidEntity(MomRouteProcessOutput),
  autoConfigureRapidEntity(MomRouteTemplate),
  autoConfigureRapidEntity(MomRouteTemplateProcess),
  autoConfigureRapidEntity(MomShift),
  autoConfigureRapidEntity(MomShop),
  autoConfigureRapidEntity(MomStation),
  autoConfigureRapidEntity(MomWarehouse),
  autoConfigureRapidEntity(MomWorkOrder),
  autoConfigureRapidEntity(MomWorkReport),
  autoConfigureRapidEntity(MomWorkTask),
  autoConfigureRapidEntity(MomWorkTeam),
  autoConfigureRapidEntity(MomWorkTrack),
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
  autoConfigureRapidEntity(PmProjectEvent),
  autoConfigureRapidEntity(ShopFloorApp),
  autoConfigureRapidEntity(ShopFloorAppLayout),
  autoConfigureRapidEntity(ShopFloorAppStep),
  autoConfigureRapidEntity(ShopFloorAppVersion),
  autoConfigureRapidEntity(ShopFloorDisplayDevice),
  autoConfigureRapidEntity(ShopFloorStation),
  autoConfigureRapidEntity(SysAction),
  autoConfigureRapidEntity(SysActionGroup),
  autoConfigureRapidEntity(SysWebhook),
] as TRapidEntity[];

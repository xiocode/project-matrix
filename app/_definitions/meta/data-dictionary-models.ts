import type { RapidDataDictionary as TRapidDataDictionary } from '@ruiapp/rapid-extension';
import ActiveInactiveState from '../models/data-dictionaries/ActiveInactiveState';
import ApprovalState from '../models/data-dictionaries/ApprovalState';
import BusinessActivityKind from '../models/data-dictionaries/BusinessActivityKind';
import BusinessActivityState from '../models/data-dictionaries/BusinessActivityState';
import BusinessApplicationState from '../models/data-dictionaries/BusinessApplicationState';
import BusinessTaskState from '../models/data-dictionaries/BusinessTaskState';
import CmContractState from '../models/data-dictionaries/CmContractState';
import DataDictionaryValueType from '../models/data-dictionaries/DataDictionaryValueType';
import DocumentType from '../models/data-dictionaries/DocumentType';
import EmployeeState from '../models/data-dictionaries/EmployeeState';
import EnabledDisabledState from '../models/data-dictionaries/EnabledDisabledState';
import FormFieldType from '../models/data-dictionaries/FormFieldType';
import MetaDataDictionaryLevel from '../models/data-dictionaries/MetaDataDictionaryLevel';
import MetaPropertyType from '../models/data-dictionaries/MetaPropertyType';
import MetaRouteHttpMethod from '../models/data-dictionaries/MetaRouteHttpMethod';
import MetaRouteType from '../models/data-dictionaries/MetaRouteType';
import PmProjectStage from '../models/data-dictionaries/PmProjectStage';
import PmProjectState from '../models/data-dictionaries/PmProjectState';
import PublishState from '../models/data-dictionaries/PublishState';
import QuantityType from '../models/data-dictionaries/QuantityType';
import UndeletedDeletedState from '../models/data-dictionaries/UndeletedDeletedState';
import UnitType from '../models/data-dictionaries/UnitType';
import UserSecretLevel from '../models/data-dictionaries/UserSecretLevel';

export default [
  ActiveInactiveState,
  ApprovalState,
  BusinessActivityKind,
  BusinessActivityState,
  BusinessApplicationState,
  BusinessTaskState,
  CmContractState,
  DataDictionaryValueType,
  DocumentType,
  EmployeeState,
  EnabledDisabledState,
  FormFieldType,
  MetaDataDictionaryLevel,
  MetaPropertyType,
  MetaRouteHttpMethod,
  MetaRouteType,
  PmProjectStage,
  PmProjectState,
  PublishState,
  QuantityType,
  UndeletedDeletedState,
  UnitType,
  UserSecretLevel,
] as TRapidDataDictionary[];

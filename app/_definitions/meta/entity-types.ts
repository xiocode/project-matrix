import type {
  BaseLocationType,
  BusinessActivityKind,
  BusinessActivityState,
  BusinessApplicationState,
  BusinessTaskState,
  CbsContractKind,
  CbsContractState,
  CbsOrderKind,
  CbsOrderState,
  ConfirmationState,
  DataDictionaryLevel,
  DataDictionaryValueType,
  EmployeeState,
  EnabledDisabledState,
  FinTransactionType,
  FormFieldType,
  MomEquipmentPowerState,
  MomEquipmentProductionState,
  MomGoodState,
  MomInventoryOperationState,
  MomInventoryOperationType,
  MomMpsExecutionState,
  MomMpsScheduleState,
  MomMrpExecutionState,
  MomMrpPlanningState,
  MomPackageGoodState,
  MomWorkOrderAssignmentState,
  MomWorkOrderExecutionState,
  MomWorkTaskAssignmentState,
  MomWorkTaskExecutionState,
  MomWorkTrackAssignmentState,
  MomWorkTrackExecutionState,
  PmBudgetType,
  PmMilestoneState,
  PmPhaseState,
  PmProjectStage,
  PmProjectState,
  PropertyType,
  PublishState,
  RouteHttpMethod,
  RouteType,
  UndeletedDeletedState,
  UnitType,
} from "./data-dictionary-types";
/**
 * 客户端
 */
export interface AppClient {
  /**
   * id
   */
  id: number;
  /**
   * Code
   */
  code: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 配置
   */
  config?: object;
  /**
   * 状态
   */
  state: UndeletedDeletedState;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 客户端
 */
export type SaveAppClientInput = Omit<AppClient, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 导航菜单
 */
export interface AppNavItem {
  /**
   * id
   */
  id: number;
  /**
   * Code
   */
  code: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 客户端
   */
  client?: Partial<AppClient>;
  /**
   * 上级菜单
   */
  parent?: Partial<AppNavItem>;
  /**
   * 排序号
   */
  orderNum: number;
  /**
   * 图标
   */
  icon?: string;
  /**
   * 页面代码
   */
  pageCode?: string;
  /**
   * 配置
   */
  config?: object;
  /**
   * 状态
   */
  state: EnabledDisabledState;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 导航菜单
 */
export type SaveAppNavItemInput = Omit<AppNavItem, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 建筑物
 */
export interface BaseBuilding {
  /**
   * id
   */
  id: number;
  /**
   * 位置
   */
  location?: Partial<BaseLocation>;
  /**
   * Code
   */
  code?: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 排序号
   */
  orderNum: number;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 建筑物
 */
export type SaveBaseBuildingInput = Omit<BaseBuilding, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 员工
 */
export interface BaseEmployee {
  /**
   * id
   */
  id: number;
  /**
   * 工号
   */
  code?: string;
  /**
   * 姓名
   */
  name?: string;
  /**
   * 部门
   */
  department?: Partial<OcDepartment>;
  /**
   * 状态
   */
  state?: EmployeeState;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 员工
 */
export type SaveBaseEmployeeInput = Omit<BaseEmployee, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 表单字段
 */
export interface BaseFormField {
  /**
   * id
   */
  id: number;
  /**
   * 编码
   */
  code: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 来源
   */
  source?: string;
  /**
   * 外部id
   */
  externalId?: string;
  /**
   * 外部数据
   */
  externalData?: object;
  /**
   * 字段类型
   */
  fieldType: FormFieldType;
  /**
   * 状态
   */
  state?: EnabledDisabledState;
  /**
   * 备注
   */
  description?: string;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 表单字段
 */
export type SaveBaseFormFieldInput = Omit<BaseFormField, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 大门
 */
export interface BaseGate {
  /**
   * id
   */
  id: number;
  /**
   * 位置
   */
  location?: Partial<BaseLocation>;
  /**
   * Code
   */
  code?: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 排序号
   */
  orderNum: number;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 大门
 */
export type SaveBaseGateInput = Omit<BaseGate, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 位置
 */
export interface BaseLocation {
  /**
   * id
   */
  id: number;
  /**
   * 上级位置
   */
  parent?: Partial<BaseLocation>;
  /**
   * 类型
   */
  type: BaseLocationType;
  /**
   * Code
   */
  code?: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * 排序
   */
  orderNum: number;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 位置
 */
export type SaveBaseLocationInput = Omit<BaseLocation, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 物料
 */
export interface BaseMaterial {
  /**
   * id
   */
  id: number;
  /**
   * 物料号
   */
  code: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 品牌
   */
  brand?: string;
  /**
   * 规格
   */
  specification?: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * 分类
   */
  category: Partial<BaseMaterialCategory>;
  /**
   * 默认单位
   */
  defaultUnit?: Partial<BaseUnit>;
  /**
   * 类型
   */
  types?: any;
  /**
   * 可生产
   */
  canProduce?: boolean;
  /**
   * 可采购
   */
  canPurchase?: boolean;
  /**
   * 可外协
   */
  canOutsource?: boolean;
  /**
   * 可销售
   */
  canSale?: boolean;
  /**
   * 状态
   */
  state: EnabledDisabledState;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 物料
 */
export type SaveBaseMaterialInput = Omit<BaseMaterial, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 物料分类
 */
export interface BaseMaterialCategory {
  /**
   * id
   */
  id: number;
  /**
   * 编号
   */
  code?: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 默认单位
   */
  defaultUnit?: Partial<BaseUnit>;
  /**
   * 排序号
   */
  orderNum: number;
  /**
   * 上级分类
   */
  parent?: Partial<BaseMaterialCategory>;
  /**
   * 物料
   */
  materials?: any;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 物料分类
 */
export type SaveBaseMaterialCategoryInput = Omit<BaseMaterialCategory, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 物料文档
 */
export interface BaseMaterialDocument {
  /**
   * id
   */
  id: number;
  /**
   * 物料
   */
  material: Partial<BaseMaterial>;
  /**
   * 文档
   */
  document: Partial<EcmDocument>;
  /**
   * 状态
   */
  state: EnabledDisabledState;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 物料文档
 */
export type SaveBaseMaterialDocumentInput = Omit<BaseMaterialDocument, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 物料类型
 */
export interface BaseMaterialType {
  /**
   * id
   */
  id: number;
  /**
   * 物料
   */
  materials?: any;
  /**
   * 编号
   */
  code?: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 配置
   */
  config?: object;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 物料类型
 */
export type SaveBaseMaterialTypeInput = Omit<BaseMaterialType, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 办公室
 */
export interface BaseOffice {
  /**
   * id
   */
  id: number;
  /**
   * 建筑
   */
  building?: Partial<BaseBuilding>;
  /**
   * 位置
   */
  location?: Partial<BaseLocation>;
  /**
   * Code
   */
  code?: string;
  /**
   * 名称
   */
  name?: string;
  /**
   * 排序号
   */
  orderNum: number;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 办公室
 */
export type SaveBaseOfficeInput = Omit<BaseOffice, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 合作伙伴
 */
export interface BasePartner {
  /**
   * id
   */
  id: number;
  /**
   * Code
   */
  code?: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 分类
   */
  categories?: any;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 合作伙伴
 */
export type SaveBasePartnerInput = Omit<BasePartner, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 合作伙伴分类
 */
export interface BasePartnerCategory {
  /**
   * id
   */
  id: number;
  /**
   * Code
   */
  code?: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 排序号
   */
  orderNum: number;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 合作伙伴分类
 */
export type SaveBasePartnerCategoryInput = Omit<BasePartnerCategory, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 单位
 */
export interface BaseUnit {
  /**
   * id
   */
  id: number;
  /**
   * Code
   */
  code: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 英文名称
   */
  nameEn?: string;
  /**
   * 打印符号
   */
  printSymbol?: string;
  /**
   * 类型
   */
  type: UnitType;
  /**
   * 排序号
   */
  orderNum: number;
  /**
   * 单位分组
   */
  category: Partial<BaseUnitCategory>;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 单位
 */
export type SaveBaseUnitInput = Omit<BaseUnit, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 单位分组
 */
export interface BaseUnitCategory {
  /**
   * id
   */
  id: number;
  /**
   * 名称
   */
  name: string;
  /**
   * 排序号
   */
  orderNum: number;
  /**
   * 单位
   */
  units?: any;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 单位分组
 */
export type SaveBaseUnitCategoryInput = Omit<BaseUnitCategory, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 审批步骤
 */
export interface BpmBusinessActivity {
  /**
   * id
   */
  id: number;
  /**
   * 申请单
   */
  application: Partial<BpmBusinessApplication>;
  /**
   * 步骤名
   */
  name: string;
  /**
   * 步骤类型
   */
  kind: BusinessActivityKind;
  /**
   * 审批任务
   */
  tasks?: any;
  /**
   * 步骤状态
   */
  state: BusinessActivityState;
  /**
   * 步骤决议
   */
  resolution?: string;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 审批步骤
 */
export type SaveBpmBusinessActivityInput = Omit<BpmBusinessActivity, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 业务申请单
 */
export interface BpmBusinessApplication {
  /**
   * id
   */
  id: number;
  /**
   * 业务流程
   */
  process: Partial<BpmBusinessProcess>;
  /**
   * 申请单号
   */
  code: string;
  /**
   * 标题
   */
  title: string;
  /**
   * 表单数据
   */
  formData?: object;
  /**
   * 发起人
   */
  initiator?: Partial<OcUser>;
  /**
   * 发起时间
   */
  initiatedAt?: string;
  /**
   * 批准时间
   */
  approvedAt?: string;
  /**
   * 流程状态
   */
  state: BusinessApplicationState;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 业务申请单
 */
export type SaveBpmBusinessApplicationInput = Omit<BpmBusinessApplication, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 流程分组
 */
export interface BpmBusinessCategory {
  /**
   * id
   */
  id: number;
  /**
   * 名称
   */
  name: string;
  /**
   * 排序号
   */
  orderNum: number;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 流程分组
 */
export type SaveBpmBusinessCategoryInput = Omit<BpmBusinessCategory, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 业务流程
 */
export interface BpmBusinessProcess {
  /**
   * id
   */
  id: number;
  /**
   * 分组
   */
  category?: Partial<BpmBusinessCategory>;
  /**
   * 名称
   */
  name: string;
  /**
   * 描述
   */
  description: string;
  /**
   * 表单配置
   */
  formConfig?: object;
  /**
   * 流程配置
   */
  flowConfig?: object;
  /**
   * 列表配置
   */
  listConfig?: object;
  /**
   * 高级设置
   */
  advancedConfig?: object;
  /**
   * 状态
   */
  state: EnabledDisabledState;
  /**
   * 状态
   */
  publishState: PublishState;
  /**
   * 当前版本
   */
  activeRevision?: Partial<BpmBusinessProcessRevision>;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 业务流程
 */
export type SaveBpmBusinessProcessInput = Omit<BpmBusinessProcess, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 业务流程版本
 */
export interface BpmBusinessProcessRevision {
  /**
   * id
   */
  id: number;
  /**
   * 业务流程
   */
  process: Partial<BpmBusinessProcess>;
  /**
   * 名称
   */
  name: string;
  /**
   * 描述
   */
  description: string;
  /**
   * 表单配置
   */
  formConfig?: object;
  /**
   * 流程配置
   */
  flowConfig?: object;
  /**
   * 高级设置
   */
  advancedConfig?: object;
  /**
   * 状态
   */
  publishState: PublishState;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 业务流程版本
 */
export type SaveBpmBusinessProcessRevisionInput = Omit<BpmBusinessProcessRevision, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 审批任务
 */
export interface BpmBusinessTask {
  /**
   * id
   */
  id: number;
  /**
   * 审批步骤
   */
  activity: Partial<BpmBusinessActivity>;
  /**
   * 负责人
   */
  assignee: Partial<OcUser>;
  /**
   * 任务状态
   */
  state: BusinessTaskState;
  /**
   * 任务决议
   */
  resolution?: string;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 审批任务
 */
export type SaveBpmBusinessTaskInput = Omit<BpmBusinessTask, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 合同
 */
export interface CbsContract {
  /**
   * id
   */
  id: number;
  /**
   * 类型
   */
  kind?: CbsContractKind;
  /**
   * 编号
   */
  code?: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * 所属项目
   */
  project?: Partial<PmProject>;
  /**
   * 销售
   */
  salesman?: Partial<OcUser>;
  /**
   * 相关订单
   */
  orders?: any;
  /**
   * 合同金额
   */
  totalAmount: number;
  /**
   * 签订日期
   */
  signingDate?: string;
  /**
   * 状态
   */
  state: CbsContractState;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 合同
 */
export type SaveCbsContractInput = Omit<CbsContract, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 合同文件
 */
export interface CbsContractFile {
  /**
   * id
   */
  id: number;
  /**
   * 文件编号
   */
  code?: string;
  /**
   * 文件名
   */
  name: string;
  /**
   * 文件大小
   */
  size: string;
  /**
   * 备注
   */
  description?: string;
  /**
   * 合同
   */
  contract?: Partial<CbsContract>;
  /**
   * 存储对象
   */
  storageObject?: Partial<EcmStorageObject>;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 合同文件
 */
export type SaveCbsContractFileInput = Omit<CbsContractFile, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 资金预算
 */
export interface CbsContractFundingBudget {
  /**
   * id
   */
  id: number;
  /**
   * 编号
   */
  code?: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * 所属项目
   */
  project?: Partial<PmProject>;
  /**
   * 销售
   */
  salesman?: Partial<OcUser>;
  /**
   * 相关订单
   */
  orders?: any;
  /**
   * 合同金额
   */
  totalAmount: number;
  /**
   * 状态
   */
  state: CbsContractState;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 资金预算
 */
export type SaveCbsContractFundingBudgetInput = Omit<CbsContractFundingBudget, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 合同关联
 */
export interface CbsContractRelation {
  /**
   * id
   */
  id: number;
  /**
   * 主体合同
   */
  main?: Partial<CbsContract>;
  /**
   * 被关联合同
   */
  target?: Partial<CbsContract>;
  /**
   * 关系
   */
  kind?: Partial<CbsContractRelationKind>;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 合同关联
 */
export type SaveCbsContractRelationInput = Omit<CbsContractRelation, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 合同关联关系
 */
export interface CbsContractRelationKind {
  /**
   * id
   */
  id: number;
  /**
   * Code
   */
  code?: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 排序号
   */
  orderNum: number;
  /**
   * 反向关系
   */
  opposite?: Partial<CbsContractRelationKind>;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 合同关联关系
 */
export type SaveCbsContractRelationKindInput = Omit<CbsContractRelationKind, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 订单
 */
export interface CbsOrder {
  /**
   * id
   */
  id: number;
  /**
   * 类型
   */
  kind: CbsOrderKind;
  /**
   * 编号
   */
  code?: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * 相关项目
   */
  projects?: any;
  /**
   * 相关合同
   */
  contracts?: any;
  /**
   * 物料需求计划
   */
  mrp?: Partial<MomManufacturingResourcePlan>;
  /**
   * 订单项
   */
  items?: any;
  /**
   * 订单金额
   */
  totalAmount: number;
  /**
   * 税费
   */
  taxFee: number;
  /**
   * 转账记录
   */
  transactions?: any;
  /**
   * 状态
   */
  state: CbsOrderState;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 订单
 */
export type SaveCbsOrderInput = Omit<CbsOrder, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 订单项
 */
export interface CbsOrderItem {
  /**
   * id
   */
  id: number;
  /**
   * 订单
   */
  order: Partial<CbsOrder>;
  /**
   * 物料需求计划
   */
  mrp?: Partial<MomManufacturingResourcePlan>;
  /**
   * 排序号
   */
  orderNum: number;
  /**
   * 产品/服务
   */
  subject?: Partial<BaseMaterial>;
  /**
   * 名称
   */
  name: string;
  /**
   * 标签
   */
  tags?: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * 单价
   */
  price: number;
  /**
   * 数量
   */
  quantity: number;
  /**
   * 单位
   */
  unit?: Partial<BaseUnit>;
  /**
   * 税率
   */
  taxRate: number;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 订单项
 */
export type SaveCbsOrderItemInput = Omit<CbsOrderItem, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 文档
 */
export interface EcmDocument {
  /**
   * id
   */
  id: number;
  /**
   * Code
   */
  code: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 扩展名
   */
  extName?: string;
  /**
   * 标题
   */
  title?: string;
  /**
   * 大小
   */
  size: number;
  /**
   * 最新版本
   */
  lastRevision?: Partial<EcmRevision>;
  /**
   * 存储对象
   */
  storageObject?: Partial<EcmStorageObject>;
  /**
   * 链接
   */
  ref?: Partial<EcmDocument>;
  /**
   * 父文档
   */
  parent?: Partial<EcmDocument>;
  /**
   * 状态
   */
  publishState: PublishState;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 文档
 */
export type SaveEcmDocumentInput = Omit<EcmDocument, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 文档版本
 */
export interface EcmRevision {
  /**
   * id
   */
  id: number;
  /**
   * 文档
   */
  document: Partial<EcmDocument>;
  /**
   * 大小
   */
  size: number;
  /**
   * 存储对象
   */
  storageObject?: Partial<EcmStorageObject>;
  /**
   * 状态
   */
  publishState: PublishState;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 文档版本
 */
export type SaveEcmRevisionInput = Omit<EcmRevision, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 存储对象
 */
export interface EcmStorageObject {
  /**
   * id
   */
  id: number;
  /**
   * 大小
   */
  size: number;
  /**
   * 对象唯一键
   */
  key: string;
  /**
   * 哈希值
   */
  hash?: string;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 存储对象
 */
export type SaveEcmStorageObjectInput = Omit<EcmStorageObject, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 账户
 */
export interface FinAccount {
  /**
   * id
   */
  id: number;
  /**
   * 编号
   */
  code?: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * 初始金额
   */
  initialAmount: number;
  /**
   * 账户余额
   */
  balance: number;
  /**
   * 状态
   */
  state: EnabledDisabledState;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 账户
 */
export type SaveFinAccountInput = Omit<FinAccount, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 业务类型
 */
export interface FinBusinessCategory {
  /**
   * id
   */
  id: number;
  /**
   * 编号
   */
  code?: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 排序号
   */
  orderNum: number;
  /**
   * 上级分类
   */
  parent?: Partial<FinBusinessCategory>;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 业务类型
 */
export type SaveFinBusinessCategoryInput = Omit<FinBusinessCategory, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 费用类型
 */
export interface FinExpenseCategory {
  /**
   * id
   */
  id: number;
  /**
   * 编号
   */
  code?: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 排序号
   */
  orderNum: number;
  /**
   * 上级分类
   */
  parent?: Partial<FinExpenseCategory>;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 费用类型
 */
export type SaveFinExpenseCategoryInput = Omit<FinExpenseCategory, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 转账
 */
export interface FinTransaction {
  /**
   * id
   */
  id: number;
  /**
   * 编号
   */
  code?: string;
  /**
   * 账户
   */
  account: Partial<FinAccount>;
  /**
   * 类型
   */
  type: FinTransactionType;
  /**
   * 描述
   */
  description?: string;
  /**
   * 金额
   */
  amount: number;
  /**
   * 账户余额
   */
  balance?: number;
  /**
   * 转账时间
   */
  transferedAt?: string;
  /**
   * 状态
   */
  state: ConfirmationState;
  /**
   * 合同
   */
  contract?: Partial<CbsContract>;
  /**
   * 订单
   */
  order?: Partial<CbsOrder>;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 转账
 */
export type SaveFinTransactionInput = Omit<FinTransaction, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 数据字典
 */
export interface DataDictionary {
  /**
   * id
   */
  id: number;
  /**
   * Code
   */
  code: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 值类型
   */
  valueType: DataDictionaryValueType;
  /**
   * 级别
   */
  level: DataDictionaryLevel;
  /**
   * 描述
   */
  description?: string;
  /**
   * 来源
   */
  source?: string;
  /**
   * 外部id
   */
  externalId?: string;
  /**
   * 外部数据
   */
  externalData?: object;
  /**
   * 状态
   */
  state: UndeletedDeletedState;
  /**
   * 条目
   */
  entries?: any;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 数据字典
 */
export type SaveDataDictionaryInput = Omit<DataDictionary, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 数据字典条目
 */
export interface DataDictionaryEntry {
  /**
   * id
   */
  id: number;
  /**
   * 数据字典
   */
  dictionary?: Partial<DataDictionary>;
  /**
   * 值
   */
  value: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 颜色
   */
  color?: string;
  /**
   * 图标
   */
  icon?: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * 是否禁用
   */
  disabled: boolean;
  /**
   * 排序号
   */
  orderNum: number;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 数据字典条目
 */
export type SaveDataDictionaryEntryInput = Omit<DataDictionaryEntry, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 实体模型
 */
export interface Model {
  /**
   * id
   */
  id: number;
  /**
   * namespace
   */
  namespace: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * singular code
   */
  singularCode: string;
  /**
   * plural code
   */
  pluralCode: string;
  /**
   * 属性
   */
  properties?: any;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 实体模型
 */
export type SaveModelInput = Omit<Model, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 实体属性
 */
export interface Property {
  /**
   * id
   */
  id: number;
  /**
   * 模型
   */
  model?: Partial<Model>;
  /**
   * 属性类型
   */
  type: PropertyType;
  /**
   * 名称
   */
  name: string;
  /**
   * code
   */
  code: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * 数据库列名
   */
  columnName: string;
  /**
   * 必填
   */
  required: boolean;
  /**
   * 默认值
   */
  defaultValue?: string;
  /**
   * 配置
   */
  config?: object;
  /**
   * 自增
   */
  autoIncrement: boolean;
  /**
   * 最小长度
   */
  minLength?: number;
  /**
   * 最大长度
   */
  maxLength?: number;
  /**
   * 关系类型
   */
  relation?: string;
  /**
   * 关联实体
   */
  targetSingularCode?: string;
  /**
   * 关联实体的Id列名
   */
  targetIdColumnName?: string;
  /**
   * 自身实体Id列名
   */
  selfIdColumnName?: string;
  /**
   * 关系表所属schema
   */
  linkSchema?: string;
  /**
   * 关系表表名
   */
  linkTableName?: string;
  /**
   * 数据字典
   */
  dataDictionary?: string;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 实体属性
 */
export type SavePropertyInput = Omit<Property, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * HTTP路由
 */
export interface Route {
  /**
   * id
   */
  id: number;
  /**
   * namespace
   */
  namespace: string;
  /**
   * Code
   */
  code: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * 路由类型
   */
  type: RouteType;
  /**
   * HTTP Method
   */
  method: RouteHttpMethod;
  /**
   * Endpoint
   */
  endpoint: string;
  /**
   * Actions
   */
  actions?: object;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * HTTP路由
 */
export type SaveRouteInput = Omit<Route, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 设备
 */
export interface MomEquipment {
  /**
   * id
   */
  id: number;
  /**
   * 设备号
   */
  code: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 分类
   */
  category: Partial<MomEquipmentCategory>;
  /**
   * 状态
   */
  state: EnabledDisabledState;
  /**
   * 电源状态
   */
  powerState?: MomEquipmentPowerState;
  /**
   * 生产状态
   */
  productionState?: MomEquipmentProductionState;
  /**
   * 计划每日工作时间
   */
  planedDailyWorkingTime?: number;
  /**
   * 所在工位
   */
  station?: Partial<MomStation>;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 设备
 */
export type SaveMomEquipmentInput = Omit<MomEquipment, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 设备分类
 */
export interface MomEquipmentCategory {
  /**
   * id
   */
  id: number;
  /**
   * 名称
   */
  name?: string;
  /**
   * 排序号
   */
  orderNum?: number;
  /**
   * 上级分类
   */
  parent?: Partial<MomEquipmentCategory>;
  /**
   * 设备
   */
  equipments?: any;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 设备分类
 */
export type SaveMomEquipmentCategoryInput = Omit<MomEquipmentCategory, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 物品
 */
export interface MomGood {
  /**
   * id
   */
  id: number;
  /**
   * 物料
   */
  material?: Partial<BaseMaterial>;
  /**
   * 物料号
   */
  materialCode?: string;
  /**
   * 批号
   */
  lotNum?: string;
  /**
   * 箱号
   */
  binNum?: string;
  /**
   * 序列号
   */
  serialNum?: string;
  /**
   * 数量
   */
  quantity?: number;
  /**
   * 单位
   */
  unit?: Partial<BaseUnit>;
  /**
   * 位置
   */
  location?: Partial<BaseLocation>;
  /**
   * 放入时间
   */
  putInTime?: string;
  /**
   * 来源
   */
  source?: Partial<MomGood>;
  /**
   * 标签
   */
  tags?: string;
  /**
   * 标签
   */
  labels?: any;
  /**
   * 状态
   */
  state: MomGoodState;
  /**
   * 扩展信息
   */
  extra?: object;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 物品
 */
export type SaveMomGoodInput = Omit<MomGood, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 物品标签
 */
export interface MomGoodLabel {
  /**
   * id
   */
  id: number;
  /**
   * 物品
   */
  good?: Partial<MomGood>;
  /**
   * 标签名
   */
  name: string;
  /**
   * 值
   */
  textValue?: string;
  /**
   * 值
   */
  numberValue?: number;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 物品标签
 */
export type SaveMomGoodLabelInput = Omit<MomGoodLabel, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 物品位置
 */
export interface MomGoodLocation {
  /**
   * id
   */
  id: number;
  /**
   * 物品
   */
  good?: Partial<MomGood>;
  /**
   * 位置
   */
  location?: Partial<BaseLocation>;
  /**
   * 放入时间
   */
  putInTime?: string;
  /**
   * 取出时间
   */
  takeOutTime?: string;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 物品位置
 */
export type SaveMomGoodLocationInput = Omit<MomGoodLocation, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 物品转移记录
 */
export interface MomGoodTransfer {
  /**
   * id
   */
  id: number;
  /**
   * 操作记录
   */
  operation?: Partial<MomInventoryOperation>;
  /**
   * 排序号
   */
  orderNum: number;
  /**
   * 物品
   */
  good?: Partial<MomGood>;
  /**
   * 物品
   */
  material?: Partial<BaseMaterial>;
  /**
   * 批号
   */
  lotNum?: string;
  /**
   * 箱号
   */
  binNum?: string;
  /**
   * 序列号
   */
  serialNum?: string;
  /**
   * 标签
   */
  tags?: string;
  /**
   * 数量
   */
  quantity?: number;
  /**
   * 单位
   */
  unit?: Partial<BaseUnit>;
  /**
   * 转出位置
   */
  from?: Partial<BaseLocation>;
  /**
   * 转入位置
   */
  to?: Partial<BaseLocation>;
  /**
   * 转移时间
   */
  transferTime?: string;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 物品转移记录
 */
export type SaveMomGoodTransferInput = Omit<MomGoodTransfer, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 检验类型
 */
export interface MomInspectionCategory {
  /**
   * id
   */
  id: number;
  /**
   * Code
   */
  code?: string;
  /**
   * 名称
   */
  name?: string;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 检验类型
 */
export type SaveMomInspectionCategoryInput = Omit<MomInspectionCategory, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 检验特征
 */
export interface MomInspectionCharacteristic {
  /**
   * id
   */
  id: number;
  /**
   * 检验规则
   */
  rule?: Partial<MomInspectionRule>;
  /**
   * 名称
   */
  name?: string;
  /**
   * 特征类型
   */
  category?: Partial<MomInspectionCharacteristicCategory>;
  /**
   * 检验方法
   */
  method?: Partial<MomInspectionMethod>;
  /**
   * 检验仪器类型
   */
  instrumentCategory?: Partial<MomInspectionInstrumentCategory>;
  /**
   * 检验仪器
   */
  instrument?: Partial<MomInspectionInstrument>;
  /**
   * 配置
   */
  config?: object;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 检验特征
 */
export type SaveMomInspectionCharacteristicInput = Omit<MomInspectionCharacteristic, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 检验特征类型
 */
export interface MomInspectionCharacteristicCategory {
  /**
   * id
   */
  id: number;
  /**
   * 名称
   */
  name?: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 检验特征类型
 */
export type SaveMomInspectionCharacteristicCategoryInput = Omit<MomInspectionCharacteristicCategory, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 检验仪器
 */
export interface MomInspectionInstrument {
  /**
   * id
   */
  id: number;
  /**
   * 仪器编号
   */
  code?: string;
  /**
   * 仪器类型
   */
  category?: Partial<MomInspectionInstrumentCategory>;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 检验仪器
 */
export type SaveMomInspectionInstrumentInput = Omit<MomInspectionInstrument, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 检验仪器类型
 */
export interface MomInspectionInstrumentCategory {
  /**
   * id
   */
  id: number;
  /**
   * 名称
   */
  name?: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 检验仪器类型
 */
export type SaveMomInspectionInstrumentCategoryInput = Omit<MomInspectionInstrumentCategory, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 检验方法
 */
export interface MomInspectionMethod {
  /**
   * id
   */
  id: number;
  /**
   * 名称
   */
  name?: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 检验方法
 */
export type SaveMomInspectionMethodInput = Omit<MomInspectionMethod, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 检验记录
 */
export interface MomInspectionRecord {
  /**
   * id
   */
  id: number;
  /**
   * 检验单
   */
  sheet?: Partial<MomInspectionSheet>;
  /**
   * 样本号
   */
  sampleCode?: string;
  /**
   * 检验特征
   */
  characteristic?: Partial<MomInspectionCharacteristic>;
  /**
   * 检验仪器类型
   */
  instrumentCategory?: Partial<MomInspectionInstrumentCategory>;
  /**
   * 检验仪器
   */
  instrument?: Partial<MomInspectionInstrument>;
  /**
   * 检验员
   */
  inspector?: Partial<BaseEmployee>;
  /**
   * 检验时间
   */
  inspectedAt?: string;
  /**
   * 定性检验值
   */
  qualitativeValue?: string;
  /**
   * 定量检验值
   */
  quantitativeValue?: number;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 检验记录
 */
export type SaveMomInspectionRecordInput = Omit<MomInspectionRecord, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 检验规则
 */
export interface MomInspectionRule {
  /**
   * id
   */
  id: number;
  /**
   * 检验类型
   */
  category?: Partial<MomInspectionCategory>;
  /**
   * 物品
   */
  material?: Partial<BaseMaterial>;
  /**
   * 生产工序
   */
  routeProcess?: Partial<MomRouteProcess>;
  /**
   * 配置
   */
  config?: object;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 检验规则
 */
export type SaveMomInspectionRuleInput = Omit<MomInspectionRule, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 检验单
 */
export interface MomInspectionSheet {
  /**
   * id
   */
  id: number;
  /**
   * 检验单号
   */
  code?: string;
  /**
   * 发布状态
   */
  state?: PublishState;
  /**
   * 物品
   */
  material?: Partial<BaseMaterial>;
  /**
   * 物料号
   */
  materialCode?: string;
  /**
   * 批号
   */
  lotNum?: string;
  /**
   * 序列号
   */
  serialNum?: string;
  /**
   * 生产工单
   */
  workOrder?: Partial<MomWorkOrder>;
  /**
   * 生产流转单
   */
  workTrack?: Partial<MomWorkTrack>;
  /**
   * 生产任务
   */
  workTask?: Partial<MomWorkTask>;
  /**
   * 检验规则
   */
  rule?: Partial<MomInspectionRule>;
  /**
   * 生产工序
   */
  routeProcess?: Partial<MomRouteProcess>;
  /**
   * 检验员
   */
  inspector?: Partial<BaseEmployee>;
  /**
   * 检验记录
   */
  records?: any;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 检验单
 */
export type SaveMomInspectionSheetInput = Omit<MomInspectionSheet, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 物品库存
 */
export interface MomInventory {
  /**
   * id
   */
  id: number;
  /**
   * 物品
   */
  material?: Partial<BaseMaterial>;
  /**
   * 仓库
   */
  warehouse?: Partial<MomWarehouse>;
  /**
   * 可分配数量
   */
  allocableQuantity?: number;
  /**
   * 可用数量
   */
  availableQuantity?: number;
  /**
   * 已采购数量
   */
  purchasedQuantity?: number;
  /**
   * 在途数量
   */
  intransitQuantity?: number;
  /**
   * 在库数量
   */
  instockQuantity?: number;
  /**
   * 加工中数量
   */
  processingQuantity?: number;
  /**
   * 已加工数量
   */
  processedQuantity?: number;
  /**
   * 已产出数量
   */
  yieldQuantity?: number;
  /**
   * 已预定数量
   */
  reservedQuantity?: number;
  /**
   * 已分配数量
   */
  allocatedQuantity?: number;
  /**
   * 已发货数量
   */
  shippingQuantity?: number;
  /**
   * 已交付数量
   */
  deliveredQuantity?: number;
  /**
   * 单位
   */
  unit?: Partial<BaseUnit>;
  /**
   * 批号
   */
  lotNum?: string;
  /**
   * 箱号
   */
  binNum?: string;
  /**
   * 序列号
   */
  serialNum?: string;
  /**
   * 标签
   */
  tags?: string;
  /**
   * 标签
   */
  labels?: any;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 物品库存
 */
export type SaveMomInventoryInput = Omit<MomInventory, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 库存业务类型
 */
export interface MomInventoryBusinessType {
  /**
   * id
   */
  id: number;
  /**
   * 库存操作类型
   */
  operationType: MomInventoryOperationType;
  /**
   * 名称
   */
  name: string;
  /**
   * 配置
   */
  config?: object;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 库存业务类型
 */
export type SaveMomInventoryBusinessTypeInput = Omit<MomInventoryBusinessType, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 库存标签
 */
export interface MomInventoryLabel {
  /**
   * id
   */
  id: number;
  /**
   * 库存记录
   */
  inventory?: Partial<MomInventory>;
  /**
   * 标签名
   */
  name: string;
  /**
   * 值
   */
  textValue?: string;
  /**
   * 值
   */
  numberValue?: number;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 库存标签
 */
export type SaveMomInventoryLabelInput = Omit<MomInventoryLabel, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 库存操作记录
 */
export interface MomInventoryOperation {
  /**
   * id
   */
  id: number;
  /**
   * 编号
   */
  code?: string;
  /**
   * 操作类型
   */
  operationType: MomInventoryOperationType;
  /**
   * 业务类型
   */
  businessType?: Partial<MomInventoryBusinessType>;
  /**
   * 业务详情
   */
  businessDetails?: object;
  /**
   * 状态
   */
  state?: MomInventoryOperationState;
  /**
   * 变更明细
   */
  transfers?: any;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 库存操作记录
 */
export type SaveMomInventoryOperationInput = Omit<MomInventoryOperation, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 实验室
 */
export interface MomLab {
  /**
   * id
   */
  id: number;
  /**
   * 建筑
   */
  building?: Partial<BaseBuilding>;
  /**
   * 位置
   */
  location?: Partial<BaseLocation>;
  /**
   * Code
   */
  code?: string;
  /**
   * 名称
   */
  name?: string;
  /**
   * 排序号
   */
  orderNum: number;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 实验室
 */
export type SaveMomLabInput = Omit<MomLab, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 生产线
 */
export interface MomLine {
  /**
   * id
   */
  id: number;
  /**
   * 车间
   */
  shop?: Partial<MomShop>;
  /**
   * Code
   */
  code?: string;
  /**
   * 名称
   */
  name?: string;
  /**
   * 排序号
   */
  orderNum: number;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 生产线
 */
export type SaveMomLineInput = Omit<MomLine, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 物料需求计划
 */
export interface MomManufacturingResourcePlan {
  /**
   * id
   */
  id: number;
  /**
   * 名称
   */
  name: string;
  /**
   * 结果
   */
  result?: object;
  /**
   * 计划状态
   */
  planningState?: MomMrpPlanningState;
  /**
   * 执行状态
   */
  executionState?: MomMrpExecutionState;
  /**
   * 主生产计划
   */
  productionSchedules?: any;
  /**
   * 生产工单
   */
  workOrders?: any;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 物料需求计划
 */
export type SaveMomManufacturingResourcePlanInput = Omit<MomManufacturingResourcePlan, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 主生产计划
 */
export interface MomMasterProductionSchedule {
  /**
   * id
   */
  id: number;
  /**
   * 生产计划号
   */
  code?: string;
  /**
   * 物品
   */
  material?: Partial<BaseMaterial>;
  /**
   * 标签
   */
  tags?: string;
  /**
   * 数量
   */
  quantity?: number;
  /**
   * 单位
   */
  unit?: Partial<BaseUnit>;
  /**
   * 计划开始日期
   */
  scheduledStartDate?: string;
  /**
   * 计划完成日期
   */
  scheduledFinishDate?: string;
  /**
   * 实际开始日期
   */
  actualStartDate?: string;
  /**
   * 实际完成日期
   */
  actualFinishDate?: string;
  /**
   * 计划状态
   */
  scheduleState?: MomMpsScheduleState;
  /**
   * 执行状态
   */
  executionState?: MomMpsExecutionState;
  /**
   * 物料需求计划
   */
  mrp?: Partial<MomManufacturingResourcePlan>;
  /**
   * 生产工单
   */
  productionOrders?: any;
  /**
   * 采购订单
   */
  purchaseOrders?: any;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 主生产计划
 */
export type SaveMomMasterProductionScheduleInput = Omit<MomMasterProductionSchedule, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 生产计划项
 */
export interface MomMasterProductionScheduleItem {
  /**
   * id
   */
  id: number;
  /**
   * 生产计划
   */
  productionPlan?: Partial<MomMasterProductionSchedule>;
  /**
   * 物品
   */
  material?: Partial<BaseMaterial>;
  /**
   * 数量
   */
  quantity?: number;
  /**
   * 单位
   */
  unit?: Partial<BaseUnit>;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 生产计划项
 */
export type SaveMomMasterProductionScheduleItemInput = Omit<MomMasterProductionScheduleItem, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * BOM
 */
export interface MomMaterialBreakdown {
  /**
   * id
   */
  id: number;
  /**
   * 物料
   */
  material?: Partial<BaseMaterial>;
  /**
   * 版本
   */
  version?: string;
  /**
   * 数量
   */
  quantity?: number;
  /**
   * 单位
   */
  unit?: Partial<BaseUnit>;
  /**
   * 状态
   */
  state: EnabledDisabledState;
  /**
   * 下级物料
   */
  parts?: any;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * BOM
 */
export type SaveMomMaterialBreakdownInput = Omit<MomMaterialBreakdown, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 下级物料
 */
export interface MomMaterialBreakdownPart {
  /**
   * id
   */
  id: number;
  /**
   * BOM
   */
  materialBreakdown?: Partial<MomMaterialBreakdown>;
  /**
   * 排序号
   */
  orderNum: number;
  /**
   * 下级物料
   */
  subMaterial?: Partial<BaseMaterial>;
  /**
   * 匹配参数
   */
  matchTags?: string;
  /**
   * 数量
   */
  quantity?: number;
  /**
   * 单位
   */
  unit?: Partial<BaseUnit>;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 下级物料
 */
export type SaveMomMaterialBreakdownPartInput = Omit<MomMaterialBreakdownPart, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 物品包
 */
export interface MomPackage {
  /**
   * id
   */
  id: number;
  /**
   * 数量
   */
  code?: string;
  /**
   * 物品
   */
  goods?: any;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 物品包
 */
export type SaveMomPackageInput = Omit<MomPackage, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 物品包内物品
 */
export interface MomPackageGood {
  /**
   * id
   */
  id: number;
  /**
   * 包
   */
  package_id?: Partial<MomPackage>;
  /**
   * 物品
   */
  good?: Partial<MomGood>;
  /**
   * 状态
   */
  state?: MomPackageGoodState;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 物品包内物品
 */
export type SaveMomPackageGoodInput = Omit<MomPackageGood, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 工序
 */
export interface MomProcess {
  /**
   * id
   */
  id: number;
  /**
   * Code
   */
  code?: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 工序类型
   */
  category: Partial<MomProcessCategory>;
  /**
   * 排序号
   */
  orderNum: number;
  /**
   * 标准周期时间
   */
  standardCycleTime?: number;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 工序
 */
export type SaveMomProcessInput = Omit<MomProcess, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 工序分类
 */
export interface MomProcessCategory {
  /**
   * id
   */
  id: number;
  /**
   * Code
   */
  code: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 排序号
   */
  orderNum: number;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 工序分类
 */
export type SaveMomProcessCategoryInput = Omit<MomProcessCategory, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 工艺流程
 */
export interface MomRoute {
  /**
   * id
   */
  id: number;
  /**
   * 物料
   */
  material?: Partial<BaseMaterial>;
  /**
   * 版本
   */
  version: string;
  /**
   * 状态
   */
  state: EnabledDisabledState;
  /**
   * 发布状态
   */
  publishState: PublishState;
  /**
   * 工序
   */
  processes?: any;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 工艺流程
 */
export type SaveMomRouteInput = Omit<MomRoute, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 工序
 */
export interface MomRouteProcess {
  /**
   * id
   */
  id: number;
  /**
   * 工艺流程
   */
  route: Partial<MomRoute>;
  /**
   * 排序号
   */
  orderNum: number;
  /**
   * 生产工序
   */
  process: Partial<MomProcess>;
  /**
   * 工序别名
   */
  aliasName?: string;
  /**
   * 输入物料
   */
  inputs?: any;
  /**
   * 输出物料
   */
  outputs?: any;
  /**
   * 标准周期时间
   */
  standardCycleTime?: number;
  /**
   * 配置
   */
  config?: object;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 工序
 */
export type SaveMomRouteProcessInput = Omit<MomRouteProcess, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 生产工序输入物料
 */
export interface MomRouteProcessInput {
  /**
   * id
   */
  id: number;
  /**
   * 生产工序
   */
  routeProcess: Partial<MomRouteProcess>;
  /**
   * 物料
   */
  material: Partial<BaseMaterial>;
  /**
   * 数量
   */
  quantity: number;
  /**
   * 单位
   */
  unit: Partial<BaseUnit>;
  /**
   * 配置
   */
  config?: object;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 生产工序输入物料
 */
export type SaveMomRouteProcessInputInput = Omit<MomRouteProcessInput, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 生产工序输出物料
 */
export interface MomRouteProcessOutput {
  /**
   * id
   */
  id: number;
  /**
   * 生产工序
   */
  routeProcess?: Partial<MomRouteProcess>;
  /**
   * 物料
   */
  material?: Partial<BaseMaterial>;
  /**
   * 数量
   */
  quantity?: number;
  /**
   * 单位
   */
  unit?: Partial<BaseUnit>;
  /**
   * 配置
   */
  config?: object;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 生产工序输出物料
 */
export type SaveMomRouteProcessOutputInput = Omit<MomRouteProcessOutput, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 工艺流程模板
 */
export interface MomRouteTemplate {
  /**
   * id
   */
  id: number;
  /**
   * 名称
   */
  name: string;
  /**
   * 工序
   */
  processes?: any;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 工艺流程模板
 */
export type SaveMomRouteTemplateInput = Omit<MomRouteTemplate, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 工艺流程模板工序
 */
export interface MomRouteTemplateProcess {
  /**
   * id
   */
  id: number;
  /**
   * 工艺流程模板
   */
  routeTemplate: Partial<MomRouteTemplate>;
  /**
   * 工序
   */
  process: Partial<MomProcess>;
  /**
   * 标准周期时间
   */
  standardCycleTime?: number;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 工艺流程模板工序
 */
export type SaveMomRouteTemplateProcessInput = Omit<MomRouteTemplateProcess, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 班次
 */
export interface MomShift {
  /**
   * id
   */
  id: number;
  /**
   * Code
   */
  code?: string;
  /**
   * 名称
   */
  name?: string;
  /**
   * 排序号
   */
  orderNum: number;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 班次
 */
export type SaveMomShiftInput = Omit<MomShift, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 车间
 */
export interface MomShop {
  /**
   * id
   */
  id: number;
  /**
   * 建筑
   */
  building?: Partial<BaseBuilding>;
  /**
   * 位置
   */
  location?: Partial<BaseLocation>;
  /**
   * Code
   */
  code?: string;
  /**
   * 名称
   */
  name?: string;
  /**
   * 排序号
   */
  orderNum: number;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 车间
 */
export type SaveMomShopInput = Omit<MomShop, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 工站
 */
export interface MomStation {
  /**
   * id
   */
  id: number;
  /**
   * 建筑
   */
  building?: Partial<BaseBuilding>;
  /**
   * 位置
   */
  location?: Partial<BaseLocation>;
  /**
   * 车间
   */
  shop?: Partial<MomShop>;
  /**
   * 产线
   */
  line?: Partial<MomLine>;
  /**
   * Code
   */
  code?: string;
  /**
   * 名称
   */
  name?: string;
  /**
   * 排序号
   */
  orderNum: number;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 工站
 */
export type SaveMomStationInput = Omit<MomStation, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 仓库
 */
export interface MomWarehouse {
  /**
   * id
   */
  id: number;
  /**
   * 建筑
   */
  building?: Partial<BaseBuilding>;
  /**
   * 位置
   */
  location?: Partial<BaseLocation>;
  /**
   * Code
   */
  code?: string;
  /**
   * 名称
   */
  name?: string;
  /**
   * 排序号
   */
  orderNum: number;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 仓库
 */
export type SaveMomWarehouseInput = Omit<MomWarehouse, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 生产工单
 */
export interface MomWorkOrder {
  /**
   * id
   */
  id: number;
  /**
   * 工单号
   */
  code?: string;
  /**
   * 物料需求计划
   */
  mrp?: Partial<MomManufacturingResourcePlan>;
  /**
   * 物品
   */
  material?: Partial<BaseMaterial>;
  /**
   * 标签
   */
  tags?: string;
  /**
   * 工艺路线
   */
  route?: Partial<MomRoute>;
  /**
   * 数量
   */
  quantity?: number;
  /**
   * 单位
   */
  unit?: Partial<BaseUnit>;
  /**
   * 分配状态
   */
  assignmentState?: MomWorkOrderAssignmentState;
  /**
   * 执行状态
   */
  executionState?: MomWorkOrderExecutionState;
  /**
   * 计划开始日期
   */
  scheduledStartDate?: string;
  /**
   * 计划完成日期
   */
  scheduledFinishDate?: string;
  /**
   * 实际开始日期
   */
  actualStartDate?: string;
  /**
   * 实际完成日期
   */
  actualFinishDate?: string;
  /**
   * 生产任务
   */
  productionTasks?: any;
  /**
   * 生产报工单
   */
  workReports?: any;
  /**
   * 检验单
   */
  inspectionSheets?: any;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 生产工单
 */
export type SaveMomWorkOrderInput = Omit<MomWorkOrder, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 生产报工
 */
export interface MomWorkReport {
  /**
   * id
   */
  id: number;
  /**
   * 生产报工号
   */
  code?: string;
  /**
   * 生产工单
   */
  workOrder?: Partial<MomWorkOrder>;
  /**
   * 生产流转单
   */
  workTrack?: Partial<MomWorkTrack>;
  /**
   * 生产任务
   */
  workTask?: Partial<MomWorkTask>;
  /**
   * 工艺路线
   */
  route?: Partial<MomRoute>;
  /**
   * 生产工序
   */
  routeProcess?: Partial<MomRouteProcess>;
  /**
   * 数量
   */
  quantity?: number;
  /**
   * 合格数量
   */
  qualifiedQuantity?: number;
  /**
   * 不合格数量
   */
  unqualifiedQuantity?: number;
  /**
   * 不合格数量
   */
  scrapQuantity?: number;
  /**
   * 单位
   */
  unit?: Partial<BaseUnit>;
  /**
   * 设备
   */
  equipment?: Partial<MomEquipment>;
  /**
   * 操作工
   */
  operators?: any;
  /**
   * 其它信息
   */
  extra?: object;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 生产报工
 */
export type SaveMomWorkReportInput = Omit<MomWorkReport, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 工序任务
 */
export interface MomWorkTask {
  /**
   * id
   */
  id: number;
  /**
   * 任务号
   */
  code?: string;
  /**
   * 生产工单
   */
  workOrder?: Partial<MomWorkOrder>;
  /**
   * 生产流转单
   */
  workTrack?: Partial<MomWorkTrack>;
  /**
   * 物品
   */
  material?: Partial<BaseMaterial>;
  /**
   * 工艺路线
   */
  route?: Partial<MomRoute>;
  /**
   * 生产工序
   */
  routeProcess?: Partial<MomRouteProcess>;
  /**
   * 计划开始日期
   */
  scheduledStartDate?: string;
  /**
   * 计划完成日期
   */
  scheduledFinishDate?: string;
  /**
   * 实际开始日期
   */
  actualStartDate?: string;
  /**
   * 实际完成日期
   */
  actualFinishDate?: string;
  /**
   * 数量
   */
  quantity?: number;
  /**
   * 单位
   */
  unit?: Partial<BaseUnit>;
  /**
   * 设备
   */
  equipment?: Partial<MomEquipment>;
  /**
   * 操作工
   */
  assignees?: any;
  /**
   * 最晚完成日期
   */
  deadline?: string;
  /**
   * 派工人员
   */
  assigner?: Partial<BaseEmployee>;
  /**
   * 派工时间
   */
  assignedAt?: string;
  /**
   * 领工时间
   */
  acceptedAt?: string;
  /**
   * 分配状态
   */
  assignmentState?: MomWorkTaskAssignmentState;
  /**
   * 执行状态
   */
  executionState?: MomWorkTaskExecutionState;
  /**
   * 生产报工单
   */
  workReports?: any;
  /**
   * 检验单
   */
  inspectionSheets?: any;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 工序任务
 */
export type SaveMomWorkTaskInput = Omit<MomWorkTask, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 班组
 */
export interface MomWorkTeam {
  /**
   * id
   */
  id: number;
  /**
   * 车间
   */
  shop?: Partial<MomShop>;
  /**
   * Code
   */
  code?: string;
  /**
   * 名称
   */
  name?: string;
  /**
   * 排序号
   */
  orderNum: number;
  /**
   * 组长
   */
  leader?: Partial<BaseEmployee>;
  /**
   * 组员
   */
  members?: Partial<BaseEmployee>;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 班组
 */
export type SaveMomWorkTeamInput = Omit<MomWorkTeam, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 生产流转单
 */
export interface MomWorkTrack {
  /**
   * id
   */
  id: number;
  /**
   * 流转单号
   */
  code?: string;
  /**
   * 生产工单
   */
  workOrder?: Partial<MomWorkOrder>;
  /**
   * 分配状态
   */
  assignmentState?: MomWorkTrackAssignmentState;
  /**
   * 执行状态
   */
  executionState?: MomWorkTrackExecutionState;
  /**
   * 物品
   */
  material?: Partial<BaseMaterial>;
  /**
   * 工艺路线
   */
  route?: Partial<MomRoute>;
  /**
   * 数量
   */
  quantity?: number;
  /**
   * 单位
   */
  unit?: Partial<BaseUnit>;
  /**
   * 计划开始日期
   */
  scheduledStartDate?: string;
  /**
   * 计划完成日期
   */
  scheduledFinishDate?: string;
  /**
   * 实际开始日期
   */
  actualStartDate?: string;
  /**
   * 实际完成日期
   */
  actualFinishDate?: string;
  /**
   * 生产任务
   */
  productionTasks?: any;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 生产流转单
 */
export type SaveMomWorkTrackInput = Omit<MomWorkTrack, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 部门
 */
export interface OcDepartment {
  /**
   * id
   */
  id: number;
  /**
   * 上级部门
   */
  parent?: Partial<OcDepartment>;
  /**
   * Code
   */
  code?: string;
  /**
   * 名称
   */
  name?: string;
  /**
   * 排序
   */
  orderNum: number;
  /**
   * 用户
   */
  users?: any;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 部门
 */
export type SaveOcDepartmentInput = Omit<OcDepartment, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 角色
 */
export interface OcRole {
  /**
   * id
   */
  id: number;
  /**
   * 名称
   */
  name: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * 排序
   */
  orderNum: number;
  /**
   * 状态
   */
  state: EnabledDisabledState;
  /**
   * 用户
   */
  users?: any;
  /**
   * 操作
   */
  actions?: any;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 角色
 */
export type SaveOcRoleInput = Omit<OcRole, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 用户
 */
export interface OcUser {
  /**
   * id
   */
  id: number;
  /**
   * 姓名
   */
  name: string;
  /**
   * 登录账号
   */
  login: string;
  /**
   * 密码
   */
  password?: string;
  /**
   * 是否隐藏
   */
  hidden: boolean;
  /**
   * 状态
   */
  state: EnabledDisabledState;
  /**
   * Email
   */
  email?: string;
  /**
   * 部门
   */
  department?: Partial<OcDepartment>;
  /**
   * 角色
   */
  roles?: any;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 用户
 */
export type SaveOcUserInput = Omit<OcUser, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 里程碑
 */
export interface PmMilestone {
  /**
   * id
   */
  id: number;
  /**
   * 项目
   */
  project?: Partial<PmProject>;
  /**
   * 阶段
   */
  phase?: Partial<PmPhase>;
  /**
   * 名称
   */
  name: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * 截止日期
   */
  deadline?: string;
  /**
   * 状态
   */
  state?: PmMilestoneState;
  /**
   * 完成日期
   */
  completedAt?: string;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 里程碑
 */
export type SavePmMilestoneInput = Omit<PmMilestone, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 阶段
 */
export interface PmPhase {
  /**
   * id
   */
  id: number;
  /**
   * 项目
   */
  project?: Partial<PmProject>;
  /**
   * 名称
   */
  name: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * 计划开始日期
   */
  startDate?: string;
  /**
   * 计划结束日期
   */
  endDate?: string;
  /**
   * 状态
   */
  state?: PmPhaseState;
  /**
   * 实际开始日期
   */
  actualStartedAt?: string;
  /**
   * 实际完成日期
   */
  actualCompletedAt?: string;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 阶段
 */
export type SavePmPhaseInput = Omit<PmPhase, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 项目
 */
export interface PmProject {
  /**
   * id
   */
  id: number;
  /**
   * 编号
   */
  code: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * 项目类型
   */
  category?: Partial<PmProjectCategory>;
  /**
   * 客户
   */
  customer?: Partial<BasePartner>;
  /**
   * 当前阶段
   */
  stage: PmProjectStage;
  /**
   * 状态
   */
  state: PmProjectState;
  /**
   * 负责人
   */
  owner?: Partial<OcUser>;
  /**
   * 销售
   */
  salesman?: Partial<OcUser>;
  /**
   * 项目经理
   */
  projectManager?: Partial<OcUser>;
  /**
   * 经销商
   */
  distributor?: Partial<BasePartner>;
  /**
   * 阶段
   */
  phases?: any;
  /**
   * 里程碑
   */
  milestones?: any;
  /**
   * 相关订单
   */
  orders?: any;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 项目
 */
export type SavePmProjectInput = Omit<PmProject, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 项目预算
 */
export interface PmProjectBudget {
  /**
   * id
   */
  id: number;
  /**
   * 项目
   */
  project?: Partial<PmProject>;
  /**
   * 排序号
   */
  orderNum: number;
  /**
   * 类型
   */
  type: PmBudgetType;
  /**
   * 标题
   */
  title: string;
  /**
   * 产品/服务
   */
  subject?: Partial<BaseMaterial>;
  /**
   * 成本单价
   */
  cost: number;
  /**
   * 单价
   */
  price: number;
  /**
   * 数量
   */
  quantity: number;
  /**
   * 单位
   */
  unit?: Partial<BaseUnit>;
  /**
   * 税率
   */
  taxRate: number;
  /**
   * 业务类型
   */
  businessCategory?: Partial<FinBusinessCategory>;
  /**
   * 费用类型
   */
  expenseCategory?: Partial<FinExpenseCategory>;
  /**
   * 计划付款日期
   */
  scheduledPaymentDate?: string;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 项目预算
 */
export type SavePmProjectBudgetInput = Omit<PmProjectBudget, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 项目类型
 */
export interface PmProjectCategory {
  /**
   * id
   */
  id: number;
  /**
   * Code
   */
  code?: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 排序号
   */
  orderNum: number;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 项目类型
 */
export type SavePmProjectCategoryInput = Omit<PmProjectCategory, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 项目成本
 */
export interface PmProjectCostBudget {
  /**
   * id
   */
  id: number;
  /**
   * 项目
   */
  project?: Partial<PmProject>;
  /**
   * 标题
   */
  title: string;
  /**
   * 金额
   */
  amount: number;
  /**
   * 成本类型
   */
  costCategory?: Partial<PmProjectCostCategory>;
  /**
   * 付款时间
   */
  paymentTime?: string;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 项目成本
 */
export type SavePmProjectCostBudgetInput = Omit<PmProjectCostBudget, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 项目成本类型
 */
export interface PmProjectCostCategory {
  /**
   * id
   */
  id: number;
  /**
   * Code
   */
  code?: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * 排序号
   */
  orderNum: number;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 项目成本类型
 */
export type SavePmProjectCostCategoryInput = Omit<PmProjectCostCategory, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 项目事件
 */
export interface PmProjectEvent {
  /**
   * id
   */
  id: number;
  /**
   * 项目
   */
  project?: Partial<PmProject>;
  /**
   * 标题
   */
  title: string;
  /**
   * 描述
   */
  content?: string;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 项目事件
 */
export type SavePmProjectEventInput = Omit<PmProjectEvent, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 车间配置系统-应用
 */
export interface ShopfloorApp {
  /**
   * id
   */
  id: number;
  /**
   * Code
   */
  code?: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * 图标地址
   */
  icon?: string;
  /**
   * 当前生效版本
   */
  version?: string;
  /**
   * 权限
   */
  permissions?: object;
  /**
   * 内容
   */
  content?: object;
  /**
   * 发布时间
   */
  publishedAt?: string;
  /**
   * 发布人
   */
  publishedBy?: Partial<OcUser>;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 车间配置系统-应用
 */
export type SaveShopfloorAppInput = Omit<ShopfloorApp, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 车间配置系统-应用-步骤
 */
export interface ShopfloorAppStep {
  /**
   * id
   */
  id: number;
  /**
   * 应用
   */
  app: Partial<ShopfloorApp>;
  /**
   * 编码
   */
  code?: string;
  /**
   * 类型
   */
  kind?: string;
  /**
   * 排序号
   */
  orderNum: number;
  /**
   * 触发器
   */
  triggers?: object;
  /**
   * 结构
   */
  schema?: object;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 车间配置系统-应用-步骤
 */
export type SaveShopfloorAppStepInput = Omit<ShopfloorAppStep, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 车间配置系统-应用
 */
export interface ShopfloorAppVersion {
  /**
   * id
   */
  id: number;
  /**
   * 应用
   */
  app: Partial<ShopfloorApp>;
  /**
   * 版本
   */
  version?: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * 内容
   */
  content?: object;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 车间配置系统-应用
 */
export type SaveShopfloorAppVersionInput = Omit<ShopfloorAppVersion, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 车间配置系统-显示设备
 */
export interface ShopfloorDisplayDevice {
  /**
   * id
   */
  id: number;
  /**
   * Code
   */
  code?: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * 关联工位(多个)
   */
  stations?: any;
  /**
   * 是否删除
   */
  deleted?: boolean;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 车间配置系统-显示设备
 */
export type SaveShopfloorDisplayDeviceInput = Omit<ShopfloorDisplayDevice, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 车间配置系统-工位
 */
export interface ShopfloorStation {
  /**
   * id
   */
  id: number;
  /**
   * Code
   */
  code?: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * 关联应用(多个)
   */
  apps?: any;
  /**
   * 是否删除
   */
  deleted?: boolean;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 车间配置系统-工位
 */
export type SaveShopfloorStationInput = Omit<ShopfloorStation, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 系统操作
 */
export interface SysAction {
  /**
   * id
   */
  id: number;
  /**
   * 分组
   */
  group: Partial<SysActionGroup>;
  /**
   * Code
   */
  code: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * 排序号
   */
  orderNum: number;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 系统操作
 */
export type SaveSysActionInput = Omit<SysAction, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 系统操作分组
 */
export interface SysActionGroup {
  /**
   * id
   */
  id: number;
  /**
   * Code
   */
  code?: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 排序号
   */
  orderNum: number;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * 系统操作分组
 */
export type SaveSysActionGroupInput = Omit<SysActionGroup, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * Webhook
 */
export interface Webhook {
  /**
   * id
   */
  id: number;
  /**
   * 名称
   */
  name: string;
  /**
   * URL
   */
  url: string;
  /**
   * 密钥
   */
  secret?: string;
  /**
   * namespace
   */
  namespace: string;
  /**
   * 模型Code
   */
  modelSingularCode: string;
  /**
   * 事件
   */
  events?: object;
  /**
   * 是否启用
   */
  enabled: boolean;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
}

/**
 * Webhook
 */
export type SaveWebhookInput = Omit<Webhook, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

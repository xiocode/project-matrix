import type { RockConfig, RockEventHandlerConfig, SimpleRockConfig } from '@ruiapp/move-style';
import { EntityFilterOptions, FindEntityOrderByOptions } from '@ruiapp/rapid-core';
import { EntityStoreConfig, RapidRecordAction, RapidTableColumnConfig } from '@ruiapp/rapid-extension';

export interface SfEntityTableConfig {
  /**
   * 实体类型
   */
  entityConfig: EntityStoreConfig;

  /**
   * 视图模式
   */
  viewMode: 'table';

  /**
   * 数据源编号
   */
  dataSourceCode?: string;

  /**
   * 固定过滤器
   */
  fixedFilters?: EntityFilterOptions[];

  /**
   * 排序规则
   */
  orderBy?: FindEntityOrderByOptions[];

  /**
   * 分页大小。小于或者等于0时表示不分页。
   */
  pageSize?: number;

  pageNum?: number;

  selectionMode?: 'none' | 'single' | 'multiple';

  /**
   * 针对列表的操作
   */
  listActions?: RockConfig[];

  extraActions?: RockConfig[];

  columns: RapidTableColumnConfig[];

  /**
   * 针对记录的操作
   */
  actions?: RapidRecordAction<any>[];

  /**
   * 操作列的宽度
   */
  actionsColumnWidth?: string;

  /**
   * 是否显示表头。默认为`true`。
   */
  showHeader?: boolean;

  /**
   * 是否隐藏操作列。默认为`false`。
   */
  hideActionsColumn?: boolean;

  /**
   * 表格的属性
   */
  tableProps?: Record<string, any>;

  onSelectedIdsChange?: RockEventHandlerConfig;
}

export interface SfEntityTableRockConfig extends SimpleRockConfig, SfEntityTableConfig {}

export interface SfEntityTableState {
  selectedIds?: any[];
}

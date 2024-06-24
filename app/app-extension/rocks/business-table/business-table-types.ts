import type { RockConfig, RockEventHandlerConfig, SimpleRockConfig } from "@ruiapp/move-style";
import { RapidRecordAction, RapidTableColumnConfig } from "@ruiapp/rapid-extension";

export interface BusinessTableConfig {
  /**
   * 视图模式
   */
  viewMode: "table";

  requestConfig: {
    url: string;
  };

  // 请求数据适配器
  requestParamsAdapter?: string;

  // 响应数据适配器
  responseDataAdapter?: string;

  /**
   * 数据源编号
   */
  dataSourceCode?: string;

  /**
   * 分页大小。小于或者等于0时表示不分页。
   */
  pageSize?: number;

  pageNum?: number;

  selectionMode?: "none" | "single" | "multiple";

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

  /**
   * 是否在点击行时选中
   */
  selectOnClickRow?: boolean;

  onSelectedIdsChange?: RockEventHandlerConfig;
}

export interface BusinessTableRockConfig extends SimpleRockConfig, BusinessTableConfig {}

export interface BusinessTableState {
  selectedIds?: any[];
}

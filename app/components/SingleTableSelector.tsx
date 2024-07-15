import { Table, Select, Input, TableProps } from "antd";
import { get, isFunction } from "lodash";
import { memo, ReactNode, useEffect, useMemo } from "react";
const Search = Input.Search;

import { FindEntityOptions } from "@ruiapp/rapid-core";
import { useDebounce, useSetState } from "ahooks";
import rapidApi from "~/rapidApi";

export interface TableSelectorColumn {
  code: string;
  title?: string;
  width?: number;
  fixed?: "left" | "right";
  format?: string;
  render?: string | ((record: any) => ReactNode);
}

interface ICurrentState {
  offset: number;
  keyword?: string;
  selectedRecord?: any;
  visible?: boolean;
}

interface IProps {
  searchPlaceholder?: string;
  placeholder?: string;
  allowClear?: boolean;
  pageSize?: number;
  searchFields?: string[]; // 默认 name、code
  labelFormat?: string;
  labelKey?: string; // 默认 name
  valueKey?: string; // 默认 id
  columns?: TableSelectorColumn[];
  dropdownMatchSelectWidth?: number;
  requestConfig: {
    baseUrl?: string;
    url: string;
    method?: "post" | "get"; // 默认 post
    params?: {
      properties?: string[];
      fixedFilters?: FindEntityOptions["filters"];
      orderBy?: FindEntityOptions["orderBy"];
    };
  };
  value?: string;
  onChange?(value?: string, record?: Record<string, any>): void;
}

const SingleTableSelector = memo<IProps>((props) => {
  const {
    valueKey = "id",
    labelKey = "name",
    dropdownMatchSelectWidth = 360,
    labelFormat,
    value,
    pageSize = 20,
    columns,
    searchFields,
    allowClear,
    placeholder,
  } = props;

  const [currentState, setCurrentState] = useSetState<ICurrentState>({ offset: 0 });

  const apiIns = useRequest(props.requestConfig);

  const loadData = () => {
    const params: any = {
      filters: [],
      pagination: {
        limit: pageSize,
        offset: currentState.offset,
      },
    };

    if (currentState.keyword && searchFields?.length) {
      params.filters = [
        {
          operator: "or",
          filters: searchFields.map((field) => ({ field, operator: "contains", value: currentState.keyword })),
        },
      ];
    }

    apiIns.request(params);
  };

  const keyword = useDebounce(currentState.keyword, { wait: 600 });
  useEffect(() => {
    loadData();
  }, [props.requestConfig?.url, keyword, currentState.offset]);

  let tableColumns: TableProps<any>["columns"] = [];
  let tableWidth = 0;
  (columns || []).forEach((col) => {
    tableWidth += col.width || 100;
    tableColumns.push({
      title: col.title,
      dataIndex: col.code,
      width: col.width,
      render: (text: any, record: any) => {
        if (isFunction(col.render)) {
          return col.render(record);
        }

        return col.format ? replaceLabel(col.format, record) : get(record, col.code);
      },
    });
  });

  const getLabel = (record: Record<string, any>) => {
    if (!labelFormat) {
      return get(record, labelKey);
    }

    return replaceLabel(labelFormat, record);
  };

  const options = useMemo(() => {
    if (currentState.selectedRecord) {
      return [{ label: getLabel(currentState.selectedRecord), value: get(currentState.selectedRecord, valueKey) }];
    }

    const record = apiIns.records?.find((r) => get(r, valueKey) === props.value);
    if (record) {
      return [{ label: getLabel(record), value: get(record, valueKey) }];
    }

    return [];
  }, [currentState.selectedRecord, apiIns.records, props.value]);

  return (
    <Select
      allowClear={allowClear}
      placeholder={placeholder}
      value={value}
      open={currentState.visible}
      onChange={() => {
        props.onChange?.(undefined, undefined);
      }}
      onDropdownVisibleChange={(v) => {
        setCurrentState({ visible: v });
      }}
      options={options}
      dropdownMatchSelectWidth={dropdownMatchSelectWidth}
      dropdownRender={(menu) => {
        return (
          <div className="pm-table-single-selector">
            {searchFields?.length ? (
              <div className="pm-table-single-selector--toolbar">
                <Search
                  enterButton
                  allowClear
                  placeholder={props.searchPlaceholder}
                  loading={apiIns.loading}
                  value={currentState.keyword}
                  onChange={(e) => {
                    const v = e.target.value;
                    setCurrentState({ keyword: v, offset: 0 });
                  }}
                  onSearch={() => {
                    loadData();
                  }}
                />
              </div>
            ) : null}
            <Table
              size="small"
              rowKey="id"
              loading={apiIns.loading}
              scroll={{ x: tableWidth, y: 200 }}
              columns={tableColumns}
              dataSource={apiIns.records || []}
              rowClassName={(record) => (get(record, valueKey) === value ? "pm-table-row-pointer--selected" : `pm-table-row-pointer`)}
              onRow={(record) => {
                return {
                  onClick: () => {
                    setCurrentState({ selectedRecord: record, visible: false });
                    props.onChange?.(get(record, valueKey), record);
                  },
                };
              }}
              pagination={{
                size: "small",
                current: currentState.offset / pageSize + 1,
                pageSize,
                total: apiIns.total || 0,
                hideOnSinglePage: true,
                showSizeChanger: false,
                onChange(page) {
                  setCurrentState({ offset: (page - 1) * pageSize });
                },
              }}
            />
          </div>
        );
      }}
    />
  );
});

export default SingleTableSelector;

interface IRequestState {
  loading?: boolean;
  records?: any[];
  page?: number;
  total?: number;
}

function useRequest(config: IProps["requestConfig"]) {
  const [state, setState] = useSetState<IRequestState>({});

  const request = async (params: any) => {
    if (!config?.url) {
      return;
    }

    if (state.loading) {
      return;
    }

    setState({ loading: true });
    rapidApi[config.method || "post"](`${config.baseUrl || ""}${config.url || ""}`, {
      ...(config.params || {}),
      ...params,
      filters: [...(config.params?.fixedFilters || []), ...params.filters],
    })
      .then((res) => {
        let records = res.data?.list || [];
        let total = res.data?.total || 0;
        if (res.status < 200 || res.status >= 400) {
          setState({ loading: false });
        } else {
          setState({ loading: false, records, total });
        }
      })
      .catch((e) => {
        setState({ loading: false });
      });
  };

  return { request, ...state };
}

function replaceLabel(formatTpl: string, record: Record<string, any>) {
  return formatTpl.replace(/\{\{(\S+?)\}\}/g, (match, key) => {
    return get(record, key) || "";
  });
}

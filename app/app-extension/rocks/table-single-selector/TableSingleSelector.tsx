import type { Rock } from "@ruiapp/move-style";
import TableSingleSelectorMeta from "./TableSingleSelectorMeta";
import type { TableSingleSelectorRockConfig } from "./table-single-selector-types";
import { convertToEventHandlers } from "@ruiapp/react-renderer";
import { Table, Select, Input, TableProps } from "antd";
import { get } from "lodash";
import { useSetState } from "ahooks";
import rapidApi from "~/rapidApi";
import { useEffect } from "react";
const Search = Input.Search;

interface ICurrentState {
  offset: number;
  keyword?: string;
  selectedRecord?: any;
  visible?: boolean;
}

export default {
  Renderer(context, props: TableSingleSelectorRockConfig) {
    const { valueKey = "id", labelKey = "name", labelFormat, value, pageSize = 20, columns } = props;

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

      if (currentState.keyword) {
        params.filters = [
          {
            operator: "or",
            filters: [
              {
                field: "name",
                operator: "contains",
                value: currentState.keyword,
              },
              {
                field: "code",
                operator: "contains",
                value: currentState.keyword,
              },
            ],
          },
        ];
      }

      apiIns.request(params);
    };

    useEffect(() => {
      loadData();
    }, [props.requestConfig?.url]);

    const eventHandlers = convertToEventHandlers({ context, rockConfig: props }) as any;

    let tableColumns: TableProps<any>["columns"] = [];
    let tableWidth = 0;
    (columns || []).forEach((col) => {
      tableWidth += col.width || 100;
      tableColumns.push({
        title: col.title,
        dataIndex: col.code,
        width: col.width,
        render: (text: any, record: any) => {
          return get(record, col.code);
        },
      });
    });

    const getLabel = (record: Record<string, any>) => {
      if (!labelFormat) {
        return get(record, labelKey);
      }

      return replaceLabel(labelFormat, record);
    };

    return (
      <Select
        {...eventHandlers}
        value={value}
        open={currentState.visible}
        onDropdownVisibleChange={(v) => {
          setCurrentState({ visible: v });
        }}
        options={currentState.selectedRecord ? [{ label: getLabel(currentState.selectedRecord), value: get(currentState.selectedRecord, valueKey) }] : []}
        dropdownMatchSelectWidth={360}
        dropdownRender={(menu) => {
          return (
            <div className="pm-table-single-selector">
              <div className="pm-table-single-selector--toolbar">
                <Search
                  enterButton
                  allowClear
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
              <Table
                size="small"
                rowKey="id"
                loading={apiIns.loading}
                scroll={{ x: tableWidth, y: 200 }}
                columns={tableColumns}
                dataSource={apiIns.records || []}
                rowClassName={(record) => (record[valueKey] === value ? "pm-table-row-pointer--selected" : `pm-table-row-pointer`)}
                onRow={(record) => {
                  return {
                    onClick: () => {
                      setCurrentState({ selectedRecord: record, visible: false });
                      eventHandlers.onChange?.(record[valueKey], record);
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
  },

  ...TableSingleSelectorMeta,
} as Rock;

interface IRequestState {
  loading?: boolean;
  records?: any[];
  page?: number;
  total?: number;
}

function useRequest(config: TableSingleSelectorRockConfig["requestConfig"]) {
  const [state, setState] = useSetState<IRequestState>({});

  const request = async (params: any) => {
    if (!config?.url) {
      return;
    }

    if (state.loading) {
      return;
    }

    setState({ loading: true });
    rapidApi[config.method || "post"](`${config.baseUrl || ""}${config.url || ""}`, params)
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
    return get(record, key);
  });
}

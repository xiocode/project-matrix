import { Button, Checkbox, message, Space, Table, Tabs, Tag, Tooltip } from "antd";
import { find, get, reduce, some } from "lodash";
import { memo, useEffect, useMemo, useState } from "react";
import rapidApi from "~/rapidApi";

const PAGE_LIMIT = 20;

interface IProps {
  sheetData: any;
  onNextStep?(): void;
  onPrevStep?(): void;
}

const PreviewTable = memo<IProps>((props) => {
  const { sheetData } = props;

  const [onlyShowErrorRecords, setOnlyShowErrorRecords] = useState<boolean>(false);

  const { importXLSXData, importing } = useConfirmImport({
    recordId: sheetData?.id,
    onSuccess: () => {
      props.onNextStep?.();
    },
  });

  const tabItems = (sheetData?.sheetConfig || []).map((sheet: any) => {
    return {
      key: sheet.ruleSheet,
      label: sheet.name,
      children: <RecordTable key={sheet.ruleSheet} sheetItem={sheet} recordId={sheetData?.id} onlyShowErrorRecords={onlyShowErrorRecords} />,
    };
  });

  return (
    <div className="rapid-import-xlsx--previewTable">
      <Tabs
        items={tabItems}
        tabBarExtraContent={
          <Space>
            <Checkbox
              checked={onlyShowErrorRecords}
              onChange={(e) => {
                const checked = e.target.checked;
                setOnlyShowErrorRecords(checked);
              }}
            >
              显示错误记录
            </Checkbox>
            <Button
              onClick={() => {
                props.onPrevStep?.();
              }}
            >
              重新上传
            </Button>
            {!sheetData?.isValid ? (
              <Tooltip title="导入数据存在问题，请修正后再次导入">
                <Button type="primary" disabled>
                  确认导入
                </Button>
              </Tooltip>
            ) : (
              <Button
                type="primary"
                loading={importing}
                onClick={() => {
                  importXLSXData();
                }}
              >
                确认导入
              </Button>
            )}
          </Space>
        }
      />
    </div>
  );
});

export default PreviewTable;

const RecordTable = memo<{ sheetItem: any; recordId: string; onlyShowErrorRecords: boolean }>((props) => {
  const { sheetItem, recordId, onlyShowErrorRecords } = props;

  const { loadImportRecordItems, loading, recordItemData, currentOffset } = useImportRecordItems({
    recordId,
    sheetId: sheetItem?.ruleSheet,
    onlyShowErrorRecords,
  });

  useEffect(() => {
    loadImportRecordItems(0);
  }, [recordId, sheetItem, onlyShowErrorRecords]);

  const { tableColumns, tableWidth } = useMemo(() => {
    const columns = (sheetItem?.columns || []).map((col: any) => {
      const columnCode = parseColumnCode(col);
      return {
        title: col.name,
        dataIndex: columnCode,
        width: 120,
        render: (_: any, r: any) => {
          const errInfo = find(r.checkError, (e) => e.index === col.index);
          const hasErr = errInfo != null;
          return {
            props: {
              className: hasErr ? "rapid-import-xlsx--error" : "",
            },
            children: hasErr ? (
              <Tooltip title={errInfo.errorMsg}>
                <div style={{ height: 22 }}>{get(r.data, columnCode)}</div>
              </Tooltip>
            ) : (
              get(r.data, columnCode)
            ),
          };
        },
      };
    });

    return {
      tableColumns: [
        {
          title: "行号",
          dataIndex: "rowNumber",
          width: 80,
        },
        ...columns,
        {
          title: "错误信息",
          dataIndex: "checkError",
          width: 120,
          render: (_: any, r: any) => {
            return (
              <Space size={[4, 4]}>
                {(r.checkError || []).map(({ errorMsg }: any) => (
                  <Tag key={errorMsg} color="error">
                    {errorMsg}
                  </Tag>
                ))}
              </Space>
            );
          },
        },
      ],
      tableWidth: reduce(columns, (s, col) => s + col.width, 200),
    };
  }, [sheetItem]);

  return (
    <Table
      size="small"
      loading={loading}
      columns={tableColumns}
      dataSource={get(recordItemData, "list") || []}
      scroll={{ x: tableWidth }}
      pagination={{
        hideOnSinglePage: true,
        showQuickJumper: true,
        showSizeChanger: false,
        current: currentOffset / PAGE_LIMIT + 1,
        pageSize: PAGE_LIMIT,
        total: get(recordItemData, "total") || 0,
        size: "small",
        onChange: (page) => {
          loadImportRecordItems((page - 1) * PAGE_LIMIT);
        },
      }}
    />
  );
});

function useConfirmImport(options: { recordId: string; onSuccess: () => void }) {
  const [importing, setImporting] = useState<boolean>(false);

  const importXLSXData = async () => {
    if (importing) {
      return;
    }

    setImporting(true);
    await rapidApi
      .post(`/app/import-confirm`, {
        id: options.recordId,
      })
      .then((res) => {
        const data = res.data;
        if (res.status >= 200 && res.status < 300) {
          options.onSuccess();
        } else {
          const msg = data?.message || res.statusText || "确认导入失败";
          message.error(msg);
        }
      })
      .catch((err) => {
        const res = err.response;
        const msg = res?.data?.message || res?.statusText || "确认导入失败";
        message.error(msg);
      })
      .finally(() => {
        setImporting(false);
      });
  };

  return { importXLSXData, importing };
}

function useImportRecordItems(options: { recordId: string; sheetId: string; onlyShowErrorRecords: boolean }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [currentOffset, setCurrentOffset] = useState<number>(0);
  const [recordItemData, setRecordItemData] = useState<any>(null);

  const loadImportRecordItems = async (offset: number = 0) => {
    if (loading) {
      return;
    }

    setLoading(true);

    let errorMsgFilters: any[] = [];
    if (options.onlyShowErrorRecords) {
      errorMsgFilters = [
        {
          field: "isValid",
          operator: "eq",
          value: false,
        },
      ];
    }

    await rapidApi
      .post("/app/import_record_items/operations/find", {
        filters: [
          {
            field: "record_id",
            operator: "eq",
            value: options.recordId,
          },
          {
            field: "rule_sheet_id",
            operator: "eq",
            value: options.sheetId,
          },
          ...errorMsgFilters,
        ],
        pagination: {
          limit: PAGE_LIMIT,
          offset,
        },
        orderBy: [
          {
            field: "rowNumber",
          },
        ],
      })
      .then((res) => {
        const data = res.data;
        if (res.status >= 200 && res.status < 300) {
          setRecordItemData(data);
          setCurrentOffset(offset);
        } else {
          const msg = data?.message || res.statusText || "数据预览失败";
          message.error(msg);
        }
      })
      .catch((err) => {
        const res = err.response;
        const msg = res?.data?.message || res?.statusText || "数据预览失败";
        message.error(msg);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { loadImportRecordItems, loading, recordItemData, currentOffset };
}

function parseColumnCode(col: any, code?: string): string {
  if (col.parent) {
    return code ? `${parseColumnCode(col.parent, col.code)}.${code}` : parseColumnCode(col.parent, col.code);
  }

  return col.code;
}

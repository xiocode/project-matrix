import type { Rock } from "@ruiapp/move-style";
import PagePrint from "./PagePrintMeta";
import { lazy, useEffect, useState, Suspense, useMemo } from "react";
import rapidApi from "~/rapidApi";
import { Divider, Space, Table, Tag } from "antd";
import { forEach, isEmpty, trim } from "lodash";
import { parseRockExpressionFunc } from "@ruiapp/rapid-extension";
import { decimalSum } from "~/utils/decimal";

const PrintTemplate = lazy(() => import("./PrintOrderTemplate"));
export default {
  Renderer(context, props) {
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const detail = context.page.getStore("detail").data?.list?.[0];
    const cols = props?.columns;
    const { getDataSource, dataSource } = useLodaData();

    useEffect(() => {
      setIsMounted(true);
      if (detail) {
        getDataSource(props);
      }
    }, [detail]);

    const dataSourceGroupBy = useMemo(() => {
      const groupMap = new Map();
      forEach(dataSource, (item) => {
        const uniqeKey = `${item.material.id}_${item.lotNum}`;
        const group = groupMap.get(uniqeKey);
        if (!group) {
          groupMap.set(uniqeKey, { ...item, binNumItems: [item] });
        } else {
          const binNumItems = group.binNumItems;
          groupMap.set(uniqeKey, { ...item, quantity: decimalSum(group.quantity || 0, item.quantity || 0), binNumItems: [...binNumItems, item] });
        }
      });

      return [...groupMap.values()];
    }, [dataSource]);

    if (!isMounted) {
      return <></>;
    }

    const formateCol = () => {
      const res = cols.map((item: any) => {
        return {
          title: item.name,
          dataIndex: item.code,
          align: "center",
          render: (_: any, record: any) => {
            if (typeof item.columnRenderAdapter === "string" && trim(item.columnRenderAdapter)) {
              const adapter = parseRockExpressionFunc(item.columnRenderAdapter, { record }, context);
              const labels = adapter();
              return (
                <Space wrap direction="vertical">
                  {labels?.map((label: any, i: number) => (
                    <Tag key={i}>{label}</Tag>
                  ))}
                </Space>
              );
            }

            return item.isObject
              ? item.jointValue
                ? `${record[item.code]?.[item.value]}-${record[item.code]?.[item.jointValue]}(${record[item.code]?.[item?.joinAnOtherValue]})` || "-"
                : record[item.code]?.[item.value] || "-"
              : _ || "-";
          },
        };
      });
      return res;
    };

    const printContent = (
      <div>
        <div className="print-content-title">
          {detail?.businessType?.name}单:{detail?.code}
        </div>
        <Table className="antd-style" bordered columns={formateCol() || []} dataSource={dataSourceGroupBy} pagination={false} />
      </div>
    );

    return (
      <Suspense fallback={<div>Loading</div>}>
        <PrintTemplate printContent={printContent} />
      </Suspense>
    );
  },

  ...PagePrint,
} as Rock<any>;

const useLodaData = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<any>([]);

  const getDataSource = (props: any) => {
    if (loading) {
      return;
    }
    try {
      const apiUrl = props?.apiUrl;
      rapidApi
        .post(`${apiUrl}`, {
          orderBy: props?.orderBy,
          filters: props?.filters,
          properties: props?.properties,
          relations: props.relations,
        })
        .then((res) => {
          setDataSource(res.data.list);
        });
    } finally {
      setLoading(false);
    }
  };

  return { loading, getDataSource, dataSource };
};

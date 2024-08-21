import type { Rock } from "@ruiapp/move-style";
import PagePrint from "./PagePrintMeta";
import { lazy, useEffect, useState, Suspense } from "react";
import rapidApi from "~/rapidApi";
import { Table } from "antd";

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
            console.log(record, "record999");
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
        <div className="print-content-title">{detail?.businessType?.name}单号</div>
        <Table className="antd-style" bordered columns={formateCol() || []} dataSource={dataSource} pagination={false} />
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

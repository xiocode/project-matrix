import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import { get } from "lodash";
import { memo, useEffect, useState } from "react";
import { rapidApiRequest } from "~/rapidApi";

interface IProps {
  record: any;
  show?: boolean;
}

const BinNumDetailTable = memo<IProps>((props) => {
  const { loadDetail, loading, detailItems } = useBinNumDetail();

  useEffect(() => {
    if (props.show && props.record?.material?.id) {
      loadDetail(props.record?.material?.id);
    }
  }, [props.record, props.show]);

  const tableColumns: TableProps<any>["columns"] = [
    {
      title: "托编码",
      dataIndex: "binNum",
      width: 120,
    },
    {
      title: "库位",
      dataIndex: "location",
      width: 120,
      render: (location) => get(location, "name"),
    },
    {
      title: "数量",
      dataIndex: "quantity",
      width: 120,
    },
    {
      title: "入库日期",
      dataIndex: "putInTime",
      width: 120,
      render: (_, r) => r.lot?.createdAt && dayjs(r.lot?.createdAt).format("YYYY-MM-DD"),
    },
    {
      title: "失效日期",
      dataIndex: "validityDate",
      width: 120,
      render: (validityDate) => validityDate && dayjs(validityDate).format("YYYY-MM-DD"),
    },
  ];

  return <Table rowKey="id" loading={loading} columns={tableColumns} dataSource={detailItems} size="middle" scroll={{ x: 720 }} pagination={false} />;
});

export default BinNumDetailTable;

function useBinNumDetail() {
  const [loading, setLoading] = useState<boolean>(false);
  const [detailItems, setDetailItems] = useState<any[]>([]);

  const loadDetail = async (materialId: string) => {
    if (loading) {
      return;
    }

    setLoading(true);
    const { result, error } = await rapidApiRequest({
      url: "/mom/mom_goods/operations/find",
      method: "post",
      data: {
        filters: [
          {
            field: "material",
            operator: "exists",
            filters: [
              {
                field: "id",
                operator: "eq",
                value: materialId,
              },
            ],
          },
        ],
        pagination: { limit: 1000, offset: 0 },
        properties: ["id", "material", "binNum", "lot", "quantity", "location", "putInTime", "validityDate"],
      },
    });

    if (!error) {
      setDetailItems(result?.list || []);
    }
    setLoading(false);
  };

  return { loadDetail, loading, detailItems };
}

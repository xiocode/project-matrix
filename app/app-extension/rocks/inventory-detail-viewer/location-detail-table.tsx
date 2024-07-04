import { Table, TableProps } from "antd";
import { memo, useEffect, useState } from "react";
import { rapidApiRequest } from "~/rapidApi";
import { decimalSum } from "~/utils/decimal";

interface IProps {
  record: any;
  show?: boolean;
}

const LocationDetailTable = memo<IProps>((props) => {
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  const { loadDetail, loading, detailItems } = useLocationDetail();

  useEffect(() => {
    setExpandedKeys(detailItems?.map((item) => item.key) || []);
  }, [detailItems]);

  useEffect(() => {
    if (props.show && props.record?.material?.id) {
      loadDetail(props.record?.material?.id);
    }
  }, [props.record, props.show]);

  const tableColumns: TableProps<any>["columns"] = [
    {
      title: "库位",
      dataIndex: "location",
      width: 120,
      render: (location) => location?.name,
    },
    {
      title: "数量",
      dataIndex: "onHandQuantity",
      width: 120,
    },
  ];

  return (
    <Table
      expandable={{
        expandedRowKeys: expandedKeys,
        onExpandedRowsChange(keys) {
          setExpandedKeys(keys as string[]);
        },
      }}
      rowKey="key"
      loading={loading}
      columns={tableColumns}
      dataSource={detailItems}
      size="middle"
      scroll={{ x: 240 }}
      pagination={false}
    />
  );
});

export default LocationDetailTable;

function useLocationDetail() {
  const [loading, setLoading] = useState<boolean>(false);
  const [detailItems, setDetailItems] = useState<any[]>([]);

  const loadDetail = async (materialId: string) => {
    if (loading) {
      return;
    }

    setLoading(true);
    const { result, error } = await rapidApiRequest({
      url: "/mom/mom_material_warehouse_location_inventory_balances/operations/find",
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
        properties: ["id", "material", "warehouse", "location", "onHandQuantity", "unit"],
      },
    });

    if (!error) {
      setDetailItems(parseLocationTree(result?.list || []));
    }
    setLoading(false);
  };

  return { loadDetail, loading, detailItems };
}

interface ITreeNode {
  key?: string;
  location?: any;
  onHandQuantity?: number;
  children?: ITreeNode[];
}

function parseLocationTree(items: any[]) {
  const warehouseByIdMap = new Map<string, ITreeNode>();
  items?.forEach((item) => {
    const warehouseInfo = warehouseByIdMap.get(item.warehouse?.id) || {};
    const locations = warehouseInfo.children || [];
    warehouseByIdMap.set(item.warehouse?.id, {
      key: item.warehouse?.id,
      location: item.warehouse,
      onHandQuantity: decimalSum(warehouseInfo?.onHandQuantity || 0, item.onHandQuantity || 0),
      children: [
        ...locations,
        {
          key: `${item.warehouse?.id}_${item.location?.id}`,
          location: item.location,
          onHandQuantity: item.onHandQuantity || 0,
        },
      ],
    });
  });

  return [...warehouseByIdMap.values()];
}

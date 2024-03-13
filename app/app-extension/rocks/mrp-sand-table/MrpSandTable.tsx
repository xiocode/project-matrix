import type { Rock } from "@ruiapp/move-style";
import MrpSandTableMeta from "./MrpSandTableMeta";
import type { MrpSandTableRockConfig } from "./mrp-sand-table-types";
import rapidApi from "~/rapidApi";
import { useRequest } from "ahooks";
import { Button, InputNumber, Space, Spin, Table, Tooltip } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useMemo, useState } from "react";
import { FulfillmentDecision, FulfillmentDecisionQualities, MRPInput, MRPOutput, MaterialRequirementQuantities } from "@linkfactory/algorithm-mrp";
import { cloneDeep, find, forEach, reduce } from "lodash";
import { BaseMaterial } from "~/_definitions/meta/entity-types";
import { renderMaterial } from "../material-label-renderer/MaterialLabelRenderer";

type PerformMrpResult = {
  materials: BaseMaterial[];
  input: MRPInput;
  output: MRPOutput;
}

type MrpTableItem = {
  code: string;
  quantities: MaterialRequirementQuantities;
  decisionQuantities?: FulfillmentDecisionQualities;
  unit: string;
}

type UpdateDecisionQuantityOptions = {
  code: string;
  quantityField: keyof FulfillmentDecisionQualities;
  quantity: number;
}

export default {
  Renderer(context, props: MrpSandTableRockConfig) {
    const { mrpId } = props;
    const [decisions, setDecisions] = useState<FulfillmentDecision[]>([]);

    const performMrp = async () => {
      const res = await rapidApi.post('app/calcMaterialRequirements?mrpId=' + mrpId, {
        decisions,
      });
      // await waitSeconds(1);
      return res.data;
    }
    const { data, loading, error, refresh } = useRequest<PerformMrpResult, []>(performMrp);

    const materials = data?.materials;
    const mrpInput = data?.input;
    const mrpOutput = data?.output;
    const dataSource = useMemo(() => {
      if (!mrpOutput || !mrpInput || !materials) {
        return [];
      }

      const mrpItems: MrpTableItem[] = [];
      forEach(mrpOutput.requirements, (item) => {
        let decision = find(decisions, { code: item.code });
        if (!decision) {
          decision = {
            code: item.code,
            unit: item.unit,
            quantities: {
              produce: 0,
              purchase: 0,
              outsource: 0,
            }
          }
        }

        mrpItems.push({
          code: item.code,
          unit: item.unit,
          quantities: item.quantities,
          decisionQuantities: decision?.quantities,
        })
      })

      return mrpItems;
    }, [materials, mrpInput, mrpOutput, decisions]);

    const autoPlan = () => {
      const decisions: FulfillmentDecision[] = [];
      forEach(mrpOutput?.requirements, (item) => {
        const netDemand = item.quantities.netDemand;
        if (netDemand) {
          const material = find(materials, { code: item.code })!;
          let produceQuantity = 0;
          let purchaseQuantity = 0;
          if (material.canProduce) {
            produceQuantity = netDemand;
          } else if (material.canPurchase) {
            purchaseQuantity = netDemand;
          }

          decisions.push({
            code: item.code,
            unit: item.unit,
            quantities: {
              produce: produceQuantity,
              purchase: purchaseQuantity,
            }
          })
        }
      });

      setDecisions(decisions);
    }

    // 
    const canSubmit = useMemo(() => {
      let result = false;
      if (!mrpOutput || !mrpInput) {
        return result;
      }

      result = true;
      forEach(mrpOutput.requirements, (item) => {
        if (item.quantities.shortage) {
          result = false;
        }
      });
      return result;
    }, [mrpInput, mrpOutput]);

    const updateDecisionQuantity = (options: UpdateDecisionQuantityOptions) => {
      const mrpItem = find(data?.output.requirements, { code: options.code })!;
      let decision = find(decisions, { code: options.code });
      if (decision) {
        decision.quantities[options.quantityField] = options.quantity;
      } else {
        decisions.push({
          code: options.code,
          unit: mrpItem.unit,
          quantities: {
            produce: 0,
            purchase: 0,
            outsource: 0,
            [options.quantityField]: options.quantity,
          },
        })
      }

      setDecisions(cloneDeep(decisions));
    }

    const submitMrp = () => {
      const mrpResult = {
        mrpId: mrpId,
        demands: mrpInput?.demands,
        breakdowns: mrpInput?.breakdowns,
        inventories: mrpInput?.inventories,
        materials: materials,
        decisions: mrpInput?.decisions,
        requirements: mrpOutput?.requirements,
        actions: mrpOutput?.actions,
      };

      rapidApi.post("app/submitMrpResult", mrpResult);
    }

    const columns: ColumnsType<MrpTableItem> = [
      {
        title: "物品",
        dataIndex: 'code',
        key: 'code',
        render: (value, record, index) => {
          const material = find(materials, { code: record.code })!;
          return renderMaterial(material);
        }
      },
      {
        title: '单位',
        dataIndex: 'unit',
        key: 'unit',
        width: '50px',
      },
      {
        title: <Tooltip title="主计划中的数量">计划数</Tooltip>,
        dataIndex: 'quantities.scheduled'.split('.'),
        key: 'quantities.scheduled',
        width: '100px',
        align: 'right',
        render: (value) => {
          if (value) {
            return value.toString();
          }

          return null;
        }
      },
      {
        title: <Tooltip title="满足主计划所需的数量">需求量</Tooltip>,
        dataIndex: 'quantities.demand'.split('.'),
        key: 'quantities.demand',
        width: '100px',
        align: 'right',
      },
      {
        title: <Tooltip title="当前可用数量（包括已采购在途以及在库的数量）">可用量</Tooltip>,
        dataIndex: 'quantities.available'.split('.'),
        key: 'quantities.available',
        width: '100px',
        align: 'right',
      },
      {
        title: <Tooltip title="需求量 - 可用量">净需求</Tooltip>,
        dataIndex: 'quantities.netDemand'.split('.'),
        key: 'quantities.netDemand',
        width: '100px',
        align: 'right',
      },
      {
        title: '生产数',
        dataIndex: 'decisionQuantities.produce'.split('.'),
        key: 'decisionQuantities.produce',
        width: '100px',
        render: (value, record, index) => {
          const material = find(materials, { code: record.code })!;
          if (!material.canProduce) {
            return null;
          }

          return <InputNumber size="small" min={0} value={value || 0} onChange={(value) => updateDecisionQuantity({
            quantityField: "produce",
            code: record.code,
            quantity: value,
          })} />;
        }
      },
      {
        title: '采购数',
        dataIndex: 'decisionQuantities.purchase'.split('.'),
        key: 'decisionQuantities.purchase',
        width: '100px',
        render: (value, record, index) => {
          const material = find(materials, { code: record.code })!;
          if (!material.canPurchase) {
            return null;
          }

          return <InputNumber size="small" min={0} value={value || 0} onChange={(value) => updateDecisionQuantity({
            quantityField: "purchase",
            code: record.code,
            quantity: value,
          })} />;
        }
      },
      {
        title: <Tooltip title="净需求 - (生产数 + 采购数)">短缺数量</Tooltip>,
        dataIndex: 'quantities.shortage'.split('.'),
        key: 'quantities.shortage',
        width: '100px',
        align: 'right',
      },
    ];


    const columnsTotalWidth = reduce(columns, (accumulatedWidth, column) => {
      return accumulatedWidth + (parseInt(column.width + "", 10) || 200)
    }, 0);

    return <div>
      {
        (loading && !data) && <Spin></Spin>
      }
      {
        error && <code>{ error.message.toString() }</code>
      }
      {
        data && <div>
          <Table
            loading={loading}
            size="small"
            pagination={false}
            columns={columns}
            scroll={{
              x: columnsTotalWidth,
            }}
            dataSource={dataSource} />
          <div style={{padding: "10px 0", textAlign: "right"}}>
            <Space>
              <Button onClick={autoPlan}>自动规划</Button>
              <Button onClick={refresh}>重新计算</Button>
              <Button type="primary" disabled={!canSubmit} onClick={submitMrp}>提交确认</Button>
            </Space>
          </div>
        </div>
      }
    </div>;
  },

  ...MrpSandTableMeta,
} as Rock;
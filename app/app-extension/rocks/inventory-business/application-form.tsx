import { useNavigate } from "@remix-run/react";
import { RockEvent, type Rock } from "@ruiapp/move-style";
import { useDebounceFn, useSetState } from "ahooks";
import { Button, Form, Input, InputNumber, Select, Space, Table } from "antd";
import { memo, useEffect, useMemo, useState } from "react";
import rapidApi, { rapidApiRequest } from "~/rapidApi";
import { PlusOutlined } from "@ant-design/icons";
import { renderRock } from "@ruiapp/react-renderer";
import { last, omit, split } from "lodash";
import dayjs from "dayjs";

export default {
  $type: "inventoryApplicationForm",

  slots: {},

  propertyPanels: [],

  Renderer(context, props) {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const [refreshKey, setRefreshKey] = useState<string | number>();
    const [isSalesOut, setIsSalesOut] = useState<boolean>(false);
    const [operationType, setOperationType] = useState<string>();
    const [materialItems, setMaterialItems] = useState<any[]>([]);

    const { saveApplication, saving } = useSaveApplication(() => {
      navigate("/pages/mom_inventory_application_list");
    });

    return (
      <div style={{ padding: "24px 0 0" }}>
        <Form
          form={form}
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 5 }}
          onFinish={(values) => {
            saveApplication({
              operationState: "pending",
              operationType: "in",
              state: "approved",
              ...values,
              items: materialItems?.map((item) => ({
                material: item.material?.id,
                unit: item.unit?.id,
                lotNum: item.lotNum,
                quantity: item.quantity,
                remark: item.remark,
              })),
            });
          }}
          onValuesChange={() => {
            setRefreshKey(dayjs().unix());
          }}
        >
          <Form.Item required label="业务类型" name="businessType" rules={[{ required: true, message: "业务类型必填" }]}>
            {renderRock({
              context,
              rockConfig: {
                $type: "rapidTableSelect",
                $id: `${props.$id}_businessType`,
                placeholder: "请选择",
                columns: [{ title: "名称", code: "name" }],
                requestConfig: { url: "/mom/mom_inventory_business_types/operations/find", method: "post" },
                onSelectedRecord: [
                  {
                    $action: "script",
                    script: (e: RockEvent) => {
                      const record: any = e.args[0];

                      const isSalesOut = record?.operationType === "out" && record?.config?.defaultSourceType === "sales";

                      setOperationType(record?.operationType);
                      setIsSalesOut(isSalesOut);
                      if (!isSalesOut) {
                        form.setFieldValue("customer", null);
                      }
                      form.setFieldValue("operationType", record?.operationType);
                    },
                  },
                ],
              },
            })}
          </Form.Item>
          <Form.Item hidden name="operationType" />
          <Form.Item label="申请人" name="applicant" rules={[{ required: true, message: "申请人必填" }]}>
            {renderRock({
              context,
              rockConfig: {
                $type: "rapidTableSelect",
                $id: `${props.$id}_applicant`,
                placeholder: "请选择",
                listFilterFields: ["name"],
                searchPlaceholder: "名称搜索",
                columns: [{ title: "名称", code: "name" }],
                requestConfig: { url: "/app/oc_users/operations/find", method: "post", params: { orderBy: [{ field: "name" }] } },
              },
            })}
          </Form.Item>
          <Form.Item label="客户" name="customer" hidden={!isSalesOut}>
            {renderRock({
              context,
              rockConfig: {
                $type: "rapidTableSelect",
                $id: `${props.$id}_customer`,
                placeholder: "请选择",
                listFilterFields: ["name"],
                searchPlaceholder: "名称搜索",
                columns: [{ title: "名称", code: "name" }],
                requestConfig: {
                  url: "/app/base_partners/operations/find",
                  method: "post",
                  params: {
                    orderBy: [{ field: "name" }],
                    fixedFilters: [{ field: "categories", operator: "exists", filters: [{ field: "code", operator: "eq", value: "customer" }] }],
                    properties: ["id", "name", "categories"],
                  },
                },
              },
            })}
          </Form.Item>
          <Form.Item
            label="物品明细"
            name="items"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 22 }}
            rules={[
              {
                validator: (r, val: any, cb) => {
                  const hasError = materialItems.some((v) => !v.material);
                  if (hasError) {
                    cb("物品不可为空");
                    return;
                  }

                  cb();
                },
              },
            ]}
          >
            <Table
              size="middle"
              dataSource={materialItems}
              scroll={{ x: 740 }}
              columns={[
                {
                  title: "物品",
                  dataIndex: "material",
                  width: 180,
                  render: (_, r, i) => {
                    return renderRock({
                      context,
                      rockConfig: {
                        $type: "rapidTableSelect",
                        $id: `${i}_material`,
                        placeholder: "请选择",
                        dropdownMatchSelectWidth: 500,
                        listFilterFields: ["name", "code", "specification"],
                        searchPlaceholder: "物品信息搜索",
                        columns: [
                          { title: "名称", code: "name", width: 100 },
                          { title: "编号", code: "code", width: 100 },
                          { title: "规格", code: "specification", width: 100 },
                          { title: "单位", code: "defaultUnit.name", width: 80 },
                        ],
                        requestConfig: {
                          url: "/app/base_materials/operations/find",
                          method: "post",
                          params: {
                            properties: ["id", "code", "name", "specification", "defaultUnit", "category"],
                            orderBy: [{ field: "code" }],
                          },
                        },
                        value: r.material?.id,
                        onSelectedRecord: [
                          {
                            $action: "script",
                            script: (e: RockEvent) => {
                              const record: any = e.args[0];
                              setMaterialItems((draft) => {
                                return draft.map((item, index) =>
                                  i === index ? { ...item, material: record, unit: record?.defaultUnit, lotNum: undefined } : item,
                                );
                              });
                            },
                          },
                        ],
                      },
                    });
                  },
                },
                {
                  title: "批次号",
                  dataIndex: "lotNum",
                  width: 120,
                  render: (_, r, i) => {
                    if (isSalesOut && form.getFieldValue("customer")) {
                      return (
                        <CustomerLotSelect
                          materialId={r.material?.id}
                          customerId={form.getFieldValue("customer")}
                          value={r.lotNum}
                          onChange={(val: string) => {
                            setMaterialItems((draft) => {
                              return draft.map((item, index) => (i === index ? { ...item, lotNum: val } : item));
                            });
                          }}
                        />
                      );
                    }

                    if (operationType === "out" || operationType === "transfer") {
                      return renderRock({
                        context,
                        rockConfig: {
                          $id: i + "_lotnum",
                          $type: "materialLotNumSelector",
                          materialId: r.material?.id,
                          customerId: form.getFieldValue("customer"),
                          materialCategoryId: r.material?.category?.id,
                          businessTypeId: form.getFieldValue("businessType"),
                          value: r.lotNum,
                          onChange: [
                            {
                              $action: "script",
                              script: (e: RockEvent) => {
                                const val = e.args?.[0];
                                setMaterialItems((draft) => {
                                  return draft.map((item, index) => (i === index ? { ...item, lotNum: val } : item));
                                });
                              },
                            },
                          ],
                        },
                      });
                    }

                    return (
                      <Input
                        placeholder="请输入"
                        value={r.lotNum}
                        onChange={(e) => {
                          const val = e.target.value;
                          setMaterialItems((draft) => {
                            return draft.map((item, index) => (i === index ? { ...item, lotNum: val } : item));
                          });
                        }}
                      />
                    );
                  },
                },
                {
                  title: "数量",
                  dataIndex: "quantity",
                  width: 120,
                  render: (_, r, i) => {
                    return (
                      <InputNumber
                        placeholder="请输入"
                        style={{ width: "100%" }}
                        value={r.quantity}
                        onChange={(val) => {
                          setMaterialItems((draft) => {
                            return draft.map((item, index) => (i === index ? { ...item, quantity: val } : item));
                          });
                        }}
                      />
                    );
                  },
                },
                {
                  title: "单位",
                  dataIndex: "unit",
                  width: 120,
                  render: (_, r, i) => {
                    return renderRock({
                      context,
                      rockConfig: {
                        $type: "rapidTableSelect",
                        $id: `${i}_unit`,
                        placeholder: "请选择",
                        pageSize: 1000,
                        listFilterFields: [],
                        columns: [{ title: "名称", code: "name" }],
                        requestConfig: { url: "/app/base_units/operations/find", method: "post" },
                        value: r.unit?.id,
                        onSelectedRecord: [
                          {
                            $action: "script",
                            script: (e: RockEvent) => {
                              const record: any = e.args[0];
                              setMaterialItems((draft) => {
                                return draft.map((item, index) => (i === index ? { ...item, unit: record } : item));
                              });
                            },
                          },
                        ],
                      },
                    });
                  },
                },
                {
                  title: "备注",
                  dataIndex: "remark",
                  width: 200,
                  render: (_, r, i) => {
                    return (
                      <Input
                        placeholder="请输入"
                        value={r.remark}
                        onChange={(e) => {
                          const val = e.target.value;
                          setMaterialItems((draft) => {
                            return draft.map((item, index) => (i === index ? { ...item, remark: val } : item));
                          });
                        }}
                      />
                    );
                  },
                },
                {
                  width: 60,
                  render: (_, r, index) => {
                    return (
                      <span
                        style={{ cursor: "pointer", color: "red" }}
                        onClick={() => {
                          setMaterialItems(materialItems.filter((m, i) => i !== index));
                        }}
                      >
                        移除
                      </span>
                    );
                  },
                },
              ]}
              pagination={false}
            />
            <Button
              block
              type="dashed"
              onClick={() => {
                const newRecord = omit(last(materialItems) || {}, ["lotNum", "quantity"]);
                setMaterialItems([...materialItems, { ...newRecord }]);
              }}
            >
              <PlusOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
              添加
            </Button>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 22, offset: 2 }} style={{ marginTop: 36 }}>
            <Space size={24}>
              <Button
                disabled={saving}
                onClick={() => {
                  navigate("/pages/mom_inventory_application_list");
                }}
              >
                取消
              </Button>
              <Button
                type="primary"
                loading={saving}
                onClick={() => {
                  form.submit();
                }}
              >
                保存
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    );
  },
} as Rock<any>;

function useSaveApplication(onSuccess: () => void) {
  const [saving, setSaving] = useState<boolean>(false);

  const saveApplication = async (formData: Record<string, any>) => {
    if (saving) {
      return;
    }

    setSaving(true);
    await rapidApi
      .post("/mom/mom_inventory_applications", formData)
      .then((res) => {
        if (res.status >= 200 && res.status < 400) {
          onSuccess();
        }
      })
      .finally(() => {
        setSaving(false);
      });
  };

  const save = useDebounceFn(saveApplication, { wait: 300 });

  return { saveApplication: save.run, saving };
}

const CustomerLotSelect = memo((props: any) => {
  const { loadCustomLots, loading, lots } = useCustomLots();

  useEffect(() => {
    if (props.materialId && props.customerId) {
      loadCustomLots({ materialId: props.materialId, customerId: props.customerId });
    }
  }, [props.materialId, props.customerId]);

  const options = useMemo(() => (lots || []).map((lot) => ({ label: lot.lotNum, value: lot.lotNum })), [lots]);

  return <Select placeholder="请选择" style={{ width: "100%" }} options={options} loading={loading} value={props.value} onChange={props.onChange} />;
});

function useCustomLots() {
  const [state, setState] = useSetState<{ loading?: boolean; lots?: any[] }>({});

  const loadCustomLots = async (params: { materialId: string; customerId: string }) => {
    setState({ loading: true });

    const { error, result } = await rapidApiRequest({
      url: "/mom/mom_inspection_rules/operations/find",
      method: "POST",
      data: {
        filters: [
          {
            field: "material_id",
            operator: "eq",
            value: params.materialId,
          },
          {
            field: "customer_id",
            operator: "eq",
            value: params.customerId,
          },
        ],
      },
    });

    const rule = result?.list?.[0];
    if (!error && rule) {
      const { error: lotError, result: lotResult } = await rapidApiRequest({
        url: "/app/listLotsByInspectRule",
        method: "POST",
        data: {
          inspectRuleId: rule.id,
          materialId: params.materialId,
          customerId: params.customerId,
        },
      });

      if (!lotError) {
        setState({ lots: lotResult || [] });
      }
    }

    setState({ loading: false });
  };

  return { loadCustomLots, ...state };
}

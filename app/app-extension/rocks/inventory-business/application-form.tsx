import { useNavigate } from "@remix-run/react";
import { type Rock } from "@ruiapp/move-style";
import { useDebounceFn } from "ahooks";
import { Button, Form, Input, InputNumber, Modal, Space, Table } from "antd";
import { useState } from "react";
import SingleTableSelector from "~/components/SingleTableSelector";
import rapidApi from "~/rapidApi";

export default {
  $type: "inventoryApplicationForm",

  slots: {},

  propertyPanels: [],

  Renderer(context, props) {
    const navigate = useNavigate();
    const [form] = Form.useForm();

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
              })),
            });
          }}
        >
          <Form.Item required label="业务类型" name="businessType" rules={[{ required: true, message: "业务类型必填" }]}>
            <SingleTableSelector
              placeholder="请选择"
              columns={[{ title: "名称", code: "name" }]}
              requestConfig={{ url: "/mom/mom_inventory_business_types/operations/find", method: "post" }}
              onChange={(v, item) => {
                form.setFieldValue("operationType", item?.operationType);
              }}
            />
          </Form.Item>
          <Form.Item hidden name="operationType" />
          <Form.Item label="申请人" name="applicant" rules={[{ required: true, message: "申请人必填" }]}>
            <SingleTableSelector
              placeholder="请选择"
              columns={[{ title: "名称", code: "name" }]}
              requestConfig={{ url: "/app/oc_users/operations/find", method: "post" }}
            />
          </Form.Item>
          {/*<Form.Item label="转出仓库" name="from">*/}
          {/*  <SingleTableSelector*/}
          {/*    placeholder="请选择"*/}
          {/*    columns={[{ title: "名称", code: "name" }]}*/}
          {/*    requestConfig={{ url: "/app/base_locations/operations/find", method: "post" }}*/}
          {/*  />*/}
          {/*</Form.Item>*/}
          {/*<Form.Item label="转入仓库" name="to">*/}
          {/*  <SingleTableSelector*/}
          {/*    placeholder="请选择"*/}
          {/*    columns={[{ title: "名称", code: "name" }]}*/}
          {/*    requestConfig={{ url: "/app/base_locations/operations/find", method: "post" }}*/}
          {/*  />*/}
          {/*</Form.Item>*/}
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
              columns={[
                {
                  title: "物品",
                  dataIndex: "material",
                  width: 200,
                  render: (_, r, i) => {
                    return (
                      <SingleTableSelector
                        dropdownMatchSelectWidth={500}
                        placeholder="请选择"
                        value={r.material?.id}
                        columns={[
                          { title: "名称", code: "name", width: 100 },
                          { title: "编号", code: "code", width: 100 },
                          { title: "规格", code: "specification", width: 100 },
                          { title: "单位", code: "defaultUnit.name", width: 80 },
                        ]}
                        requestConfig={{
                          url: "/app/base_materials/operations/find",
                          method: "post",
                          params: {
                            properties: ["id", "code", "name", "specification", "defaultUnit", "category"],
                          },
                        }}
                        onChange={(v, record) => {
                          setMaterialItems((draft) => {
                            return draft.map((item, index) => (i === index ? { ...item, material: record, unit: record?.defaultUnit } : item));
                          });
                        }}
                      />
                    );
                  },
                },
                {
                  title: "批次号",
                  dataIndex: "lotNum",
                  width: 120,
                  render: (_, r, i) => {
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
                    return (
                      <SingleTableSelector
                        placeholder="请选择"
                        pageSize={1000}
                        value={r.unit?.id}
                        columns={[{ title: "名称", code: "name" }]}
                        requestConfig={{ url: "/app/base_units/operations/find", method: "post" }}
                        onChange={(v, record) => {
                          setMaterialItems((draft) => {
                            return draft.map((item, index) => (i === index ? { ...item, unit: record } : item));
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
                setMaterialItems([...materialItems, {}]);
              }}
            >
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
        <Modal>
          <Form>
            <Form.Item></Form.Item>
          </Form>
        </Modal>
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

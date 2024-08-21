/* eslint-disable react/display-name */
import { memo, useEffect } from "react";
import { Form, Input, Modal, Select } from "antd";
import type { RockInstanceContext } from "@ruiapp/move-style";
import type { LinkshopAppVariableConfig } from "~/linkshop-extension/linkshop-types";

interface VariableSettingsFormModalProps {
  context: RockInstanceContext;
  variableConfig?: LinkshopAppVariableConfig;
  variableConfigList: LinkshopAppVariableConfig[];
  visible: boolean;
  onVisibleChange(visble: boolean): void;
  onFormSubmit(config: any): void;
}

const VariableSettingsFormModal = memo<VariableSettingsFormModalProps>((props) => {
  const [form] = Form.useForm();
  const { visible, variableConfig } = props;

  useEffect(() => {
    form.setFieldsValue(
      variableConfig || {
        name: "",
        type: null,
        defaultValue: "",
      },
    );
  }, [form, variableConfig]);

  return (
    <>
      <Modal
        title={variableConfig ? "修改变量" : "添加变量"}
        open={visible}
        onCancel={() => {
          props.onVisibleChange(false);
        }}
        onOk={() => {
          form.submit();
        }}
      >
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={(formData) => {
            let variableConfig = {
              ...(props.variableConfig || {}),
              ...formData,
            };
            if (!props.variableConfig) {
              variableConfig = {
                ...formData,
              };
            }

            props.onFormSubmit(variableConfig);
            props.onVisibleChange(false);
          }}
          initialValues={variableConfig}
        >
          <Form.Item
            name="name"
            label="变量名称"
            required
            rules={[
              { required: true, message: "变量名称必填" },
              {
                validator(rule, value, callback) {
                  const isExist = props.variableConfigList?.some((c) => props.variableConfig?.name !== c.name && c.name === value);
                  callback(isExist ? "变量名称已存在" : undefined);
                },
              },
            ]}
          >
            <Input disabled={props.variableConfig != null} placeholder="请输入" />
          </Form.Item>
          <Form.Item name="type" label="变量类型" required rules={[{ required: true, message: "变量类型必选" }]}>
            <Select
              options={[
                {
                  label: "字符串",
                  value: "string",
                },
                {
                  label: "整数",
                  value: "integer",
                },
                {
                  label: "浮点数",
                  value: "float",
                },
                {
                  label: "布尔量",
                  value: "boolean",
                },
              ]}
            />
          </Form.Item>
          <Form.Item name="defaultValue" label="默认值">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});

export default VariableSettingsFormModal;

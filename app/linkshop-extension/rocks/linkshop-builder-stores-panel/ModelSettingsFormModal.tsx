import { memo, useEffect, useState } from 'react';
import { Checkbox, Col, Form, Input, Modal, Row } from 'antd';
import ModelSelector from './ModelSelector';
import rapidAppDefinition from '~/rapidAppDefinition';
import { RapidEntity } from '@ruiapp/rapid-extension';

interface ModelSettingsFormModalProps {
  entityStoreConfig?: any;
  visible: boolean;
  onVisibleChange(visble: boolean): void;
  onFormSubmit(config: any): void;
}

const ModelSettingsFormModal = memo<ModelSettingsFormModalProps>((props) => {
  const [form] = Form.useForm();
  const [selectEntity, setSelectedEntity] = useState<RapidEntity>();

  useEffect(() => {
    if (props.visible) {
      form.setFieldsValue(
        props.entityStoreConfig || {
          name: undefined,
          modelCode: undefined,
          modelProperties: [],
        },
      );

      const entiry = rapidAppDefinition.entities.find((e) => e.code === props.entityStoreConfig?.entityCode);
      setSelectedEntity(entiry);
    }
  }, [props.visible, props.entityStoreConfig]);

  return (
    <Modal
      title={props.entityStoreConfig ? '修改数据' : '添加数据'}
      open={props.visible}
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
          const storeConfig = {
            type: 'entityStore',
            name: formData.name,
            entityCode: formData.modelCode,
            properties: formData.modelProperties || [],
            filters: [],
            orderBy: [],
          };

          props.onFormSubmit(storeConfig);
          props.onVisibleChange(false);
        }}
        onValuesChange={(values) => {
          if ('modelCode' in values) {
            const entiry = rapidAppDefinition.entities.find((e) => e.code === values.modelCode);
            setSelectedEntity(entiry);
            form.setFieldValue(
              'modelProperties',
              (entiry?.fields || []).map((f) => f.code),
            );
          }
        }}
      >
        <Form.Item name="name" label="数据名称" required rules={[{ required: true, message: '数据名称必填' }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item name="modelCode" label="数据模型" required rules={[{ required: true, message: '数据模型必选' }]}>
          <ModelSelector />
        </Form.Item>
        <Form.Item name="modelProperties" label="模型属性" required rules={[{ required: true, message: '模型属性必选' }]}>
          <Checkbox.Group style={{ width: '100%' }}>
            {selectEntity ? (
              <Row gutter={24}>
                {selectEntity?.fields?.map((f) => (
                  <Col key={f.code} span={8}>
                    <Checkbox value={f.code}>{f.name}</Checkbox>
                  </Col>
                ))}
              </Row>
            ) : (
              <span className="ant-select-selection-placeholder">请选择数据模型</span>
            )}
          </Checkbox.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default ModelSettingsFormModal;

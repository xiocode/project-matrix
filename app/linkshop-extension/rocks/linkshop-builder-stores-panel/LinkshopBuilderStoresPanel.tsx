import type { Rock } from '@ruiapp/move-style';
import LinkshopBuilderStoresPanelMeta from './LinkshopBuilderStoresPanelMeta';
import type { LinkshopBuilderStoresPanelRockConfig } from './linkshop-builder-stores-panel-types';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, Modal, Select } from 'antd';
import { useState } from 'react';
import ModelSelector from './ModelSelector';

export default {
  onResolveState(props, state) {
    const [form] = Form.useForm();

    return {
      form,
    };
  },

  Renderer(context, props: LinkshopBuilderStoresPanelRockConfig, state) {
    const { page } = context;

    const [visible, setVisible] = useState<boolean>(false);

    const stores = (page.scope.config?.stores || []).filter((s) => s.type === 'entityStore');

    console.log('stores: ', stores, context);

    return (
      <>
        <div className="lsb-stores-panel">
          <div className="lsb-stores-panel--addBtn">
            <span
              onClick={() => {
                setVisible(true);
              }}
            >
              <PlusOutlined style={{ marginRight: 4 }} />
              添加
            </span>
          </div>
          {stores.map((s) => {
            return (
              <div key={s.name} style={{ padding: 16 }}>
                {s.name}
              </div>
            );
          })}
        </div>
        <Modal
          title="添加模型数据"
          open={visible}
          onCancel={() => {
            setVisible(false);
          }}
          onOk={() => {
            state.form?.submit();
          }}
        >
          <Form
            form={state.form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            onFinish={(formData) => {
              console.log('form data: ', formData);
            }}
          >
            <Form.Item name="name" label="数据名称" required rules={[{ required: true, message: '数据名称必填' }]}>
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item name="modelCode" label="数据模型" required rules={[{ required: true, message: '数据模型必选' }]}>
              <ModelSelector />
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  },

  ...LinkshopBuilderStoresPanelMeta,
} as Rock;

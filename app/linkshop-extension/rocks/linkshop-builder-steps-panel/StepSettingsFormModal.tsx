import { memo, useEffect } from 'react';
import { Form, Input, Modal } from 'antd';
import { LinkshopAppStepRockConfig } from '~/linkshop-extension/linkshop-types';
import { genRandomComponentId } from '~/linkshop-extension/utilities/DesignerUtility';

interface StepSettingsFormModalProps {
  steps: LinkshopAppStepRockConfig[];
  stepConfig?: LinkshopAppStepRockConfig;
  visible: boolean;
  onVisibleChange(visble: boolean): void;
  onFormSubmit(config: any): void;
}

const StepSettingsFormModal = memo<StepSettingsFormModalProps>((props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (props.visible) {
      form.setFieldsValue(
        props.stepConfig || {
          $name: undefined,
        },
      );
    }
  }, [props.visible, props.stepConfig]);

  return (
    <Modal
      title={props.stepConfig ? '修改步骤' : '添加步骤'}
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
          let stepConfig: Partial<LinkshopAppStepRockConfig> = {
            ...(props.stepConfig || {}),
            ...formData,
          };

          if (!stepConfig.$id) {
            stepConfig = {
              $id: genRandomComponentId(),
              $type: 'linkshopAppStep',
              $name: formData.$name,
              children: [],
            };
          }

          props.onFormSubmit(stepConfig);
          props.onVisibleChange(false);
        }}
      >
        <Form.Item
          name="$name"
          label="步骤名称"
          required
          rules={[
            { required: true, message: '步骤名称必填' },
            {
              validator: (rule, value, cb) => {
                const isExist = props.steps?.some((step) => step.$name === value);
                if (isExist) {
                  cb('步骤名称已存在');
                }

                cb();
              },
            },
          ]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default StepSettingsFormModal;

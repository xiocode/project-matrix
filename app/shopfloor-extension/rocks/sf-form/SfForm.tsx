import { CommonProps, type Rock } from '@ruiapp/move-style';
import SfFormMeta from './SfFormMeta';
import type { SfFormRockConfig } from './sf-form-types';
import { pick } from 'lodash';
import { convertToEventHandlers, renderRock } from '@ruiapp/react-renderer';
import { Form } from 'antd';

export default {
  Renderer(context, props: SfFormRockConfig) {
    const { items, layout = 'vertical' } = props;

    const [form] = Form.useForm();

    const styleNames = [...CommonProps.PositionStylePropNames, ...CommonProps.SizeStylePropNames];
    const wrapStyle: React.CSSProperties = pick(props, styleNames) as any;
    wrapStyle.position = 'absolute';

    const eventHandlers = convertToEventHandlers({ context, rockConfig: props });

    return (
      <Form form={form} style={wrapStyle} layout={layout}>
        {items?.map((item) => {
          return (
            <Form.Item key={item.name} name={item.name} label={item.label} required={item.required}>
              {renderRock({
                context,
                rockConfig: {
                  $type: 'antdInput',
                },
              })}
            </Form.Item>
          );
        })}
      </Form>
    );
  },

  ...SfFormMeta,
} as Rock;

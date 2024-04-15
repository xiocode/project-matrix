import { CommonProps, type Rock } from '@ruiapp/move-style';
import SfEntityDetailsMeta from './SfEntityDetailsMeta';
import type { SfEntityDetailsRockConfig } from './sf-entity-details-types';
import { get, pick } from 'lodash';
import { Descriptions } from 'antd';
import { convertToEventHandlers, renderRock } from '@ruiapp/react-renderer';

export default {
  Renderer(context, props: SfEntityDetailsRockConfig) {
    const { column = 3, items = [], title, layout = 'vertical', dataSource } = props;

    const styleNames = [...CommonProps.PositionStylePropNames, ...CommonProps.SizeStylePropNames];
    const wrapStyle: React.CSSProperties = pick(props, styleNames) as any;
    wrapStyle.position = 'absolute';

    const eventHandlers = convertToEventHandlers({ context, rockConfig: props });

    return (
      <Descriptions style={wrapStyle} title={title} layout={layout} column={column}>
        {items?.map((item) => {
          const content = get(dataSource, item.dataIndex);
          return (
            <Descriptions.Item key={item.dataIndex} label={item.label}>
              {content}
            </Descriptions.Item>
          );
        })}
      </Descriptions>
    );
  },

  ...SfEntityDetailsMeta,
} as Rock;

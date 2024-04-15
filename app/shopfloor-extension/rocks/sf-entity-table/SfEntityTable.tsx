import { CommonProps, type Rock } from '@ruiapp/move-style';
import SfEntityTableMeta from './SfEntityTableMeta';
import type { SfEntityTableRockConfig } from './sf-entity-table-types';
import { pick } from 'lodash';
import { convertToEventHandlers, renderRock } from '@ruiapp/react-renderer';
import { Table } from 'antd';

export default {
  Renderer(context, props: SfEntityTableRockConfig) {
    const styleNames = [...CommonProps.PositionStylePropNames, ...CommonProps.SizeStylePropNames];
    const wrapStyle: React.CSSProperties = pick(props, styleNames) as any;
    wrapStyle.position = 'absolute';

    const eventHandlers = convertToEventHandlers({ context, rockConfig: props });

    return <Table className="lsb-antd-table" columns={props.columns || []} style={wrapStyle} />;
  },

  ...SfEntityTableMeta,
} as Rock;

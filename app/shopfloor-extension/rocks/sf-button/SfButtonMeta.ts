import type { RockMeta } from '@ruiapp/move-style';
import { merge } from 'lodash';

export default {
  $type: 'sfButton',

  name: '按钮',

  slots: {},

  voidComponent: true,

  props: {
    text: {
      valueType: 'string',
      defaultValue: '按钮',
    },
    height: {
      valueType: 'number',
      defaultValue: 40,
    },
    width: {
      valueType: 'number',
      defaultValue: 100,
    },
  },

  events: [
    {
      name: 'onClick',
      label: 'onClick',
      args: {},
    },
  ],

  propertyPanels: [
    {
      $type: 'componentPropPanel',
      setters: [
        {
          $type: 'textPropSetter',
          label: '名称',
          propName: '$name',
        },
        {
          $type: 'textPropSetter',
          label: '文字',
          propName: 'text',
        },
        {
          $type: 'textPropSetter',
          label: '图标',
          propName: 'icon',
        },
      ],
    },
    { $type: 'positionPropPanel' },
    { $type: 'sizePropPanel' },
  ],
} as RockMeta;

export type ButtonKind = 'default' | 'previous' | 'next' | 'menu' | 'complete';

export function getButtonMetaByKind(meta: RockMeta, kind: ButtonKind) {
  switch (kind) {
    case 'previous':
      return merge({}, meta, {
        props: {
          text: {
            valueType: 'string',
            defaultValue: '上一步',
          },
        },
      });
    case 'next':
      return merge({}, meta, {
        props: {
          text: {
            valueType: 'string',
            defaultValue: '下一步',
          },
        },
      });
    case 'menu':
      return merge({}, meta, {
        props: {
          text: {
            valueType: 'string',
            defaultValue: '菜单',
          },
        },
      });
    case 'complete':
      return merge({}, meta, {
        props: {
          text: {
            valueType: 'string',
            defaultValue: '完成步骤',
          },
        },
      });
    case 'default':
    default:
      return meta;
  }
}

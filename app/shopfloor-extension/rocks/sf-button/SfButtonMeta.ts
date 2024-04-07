import type { RockMeta } from '@ruiapp/move-style';

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

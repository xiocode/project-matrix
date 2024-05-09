import type { RockMeta } from '@ruiapp/move-style';

export default {
  $type: 'sfQrcode',

  name: '二维码',

  voidComponent: true,

  props: {
    value: {
      valueType: 'string',
      defaultValue: 'TEST-9192019210',
    },
    bgColor: {
      valueType: 'string',
      defaultValue: '#f1f2f3',
    },
    height: {
      valueType: 'number',
      defaultValue: 200,
    },
    width: {
      valueType: 'number',
      defaultValue: 200,
    },
  },

  slots: {},

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
          label: '编码值',
          propName: 'value',
        },
      ],
    },
    { $type: 'positionPropPanel' },
    { $type: 'sizePropPanel' },
  ],
} as RockMeta;

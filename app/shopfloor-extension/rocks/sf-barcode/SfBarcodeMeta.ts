import type { RockMeta } from '@ruiapp/move-style';

export default {
  $type: 'sfBarcode',

  name: '条形码',

  voidComponent: true,

  props: {
    value: {
      valueType: 'string',
      defaultValue: '1234567890',
    },
    height: {
      valueType: 'number',
      defaultValue: 100,
    },
    width: {
      valueType: 'number',
      defaultValue: 200,
    },
    displayValue: {
      valueType: 'boolean',
      defaultValue: true,
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
        {
          $type: 'switchPropSetter',
          label: '显示编码',
          propName: 'displayValue',
          checkedValue: true,
          uncheckedValue: false,
        },
      ],
    },
    { $type: 'positionPropPanel' },
    { $type: 'sizePropPanel' },
  ],
} as RockMeta;

import type { RockMeta } from '@ruiapp/move-style';

export default {
  $type: 'sfForm',

  name: '表单',

  slots: {},

  voidComponent: true,

  props: {
    title: {
      valueType: 'string',
      defaultValue: '表单',
    },
    height: {
      valueType: 'number',
      defaultValue: 300,
    },
    width: {
      valueType: 'number',
      defaultValue: 300,
    },
  },

  events: [],

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
          label: '标题',
          propName: 'title',
        },
        {
          $type: 'itemControlsPropSetter',
          label: '表单项',
          propName: 'items',
          controls: [
            {
              propName: 'label',
              control: {
                $type: 'textSetterInput',
              },
            },
            {
              propName: 'name',
              control: {
                $type: 'textSetterInput',
              },
            },
          ],
        },
      ],
    },
    { $type: 'positionPropPanel' },
    { $type: 'sizePropPanel' },
  ],
} as RockMeta;

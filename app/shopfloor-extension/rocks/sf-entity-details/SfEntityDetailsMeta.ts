import type { RockMeta } from '@ruiapp/move-style';

export default {
  $type: 'sfEntityDetails',

  name: '记录详情',

  slots: {},

  voidComponent: true,

  props: {
    title: {
      valueType: 'string',
      defaultValue: '详情',
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
          $type: 'numberPropSetter',
          label: '列数',
          propName: 'column',
          defaultValue: 3,
        },
        {
          $type: 'itemControlsPropSetter',
          label: '信息项',
          propName: 'items',
          controls: [
            {
              propName: 'label',
              control: {
                $type: 'textSetterInput',
              },
            },
            {
              propName: 'dataIndex',
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

import type { RockMeta } from '@ruiapp/move-style';

export default {
  $type: 'sfEntityTable',

  name: '数据表格',

  slots: {},

  voidComponent: true,

  props: {
    title: {
      valueType: 'string',
      defaultValue: '表格',
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
          label: '表格列',
          propName: 'columns',
          controls: [
            {
              propName: 'title',
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

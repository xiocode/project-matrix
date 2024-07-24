import type { RockMeta } from "@ruiapp/move-style";

export default {
  $type: "sfPicture",

  name: "图片",

  voidComponent: true,

  props: {
    borderStyle: {
      valueType: 'string',
      defaultValue: 'none'
    },

    width: {
      valueType: "string",
      defaultValue: "100px",
    },

    height: {
      valueType: "string",
      defaultValue: "100px",
    },

    left: {
      valueType: "string",
      defaultValue: "0px",
    },

    top: {
      valueType: "string",
      defaultValue: "0px",
    },
  },

  slots: {},

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [
        {
          $type: "textPropSetter",
          label: "名称",
          propName: "$name",
        },
        {
          $type: "textPropSetter",
          label: "地址",
          propName: "url",
        },
        {
          $type: "selectPropSetter",
          label: "边框",
          propName: "borderStyle",
          options: [
            {
              label: "无",
              value: "none",
            },
            {
              label: "实线",
              value: "solid",
            },
            {
              label: "虚线",
              value: "dashed",
            },
            {
              label: "点线",
              value: "dotted",
            },
            {
              label: "双线",
              value: "double",
            },
          ],
        },
      ],
    },
    { $type: "positionPropPanel" },
    { $type: "sizePropPanel" },
  ],
} as RockMeta;

import type { RockMeta } from "@ruiapp/move-style";

export default {
  $type: "sfPicture",

  name: "图片",

  voidComponent: true,

  props: {
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
      ],
    },
    { $type: "positionPropPanel" },
    { $type: "sizePropPanel" },
  ],
} as RockMeta;

import type { RockMeta } from "@ruiapp/move-style";

export default {
  $type: "sfIcon",

  name: "图标",

  voidComponent: true,

  props: {
    icon: {
      valueType: "string",
      defaultValue: "SmileOutlined",
    },

    width: {
      valueType: "string",
      defaultValue: "32px",
    },

    height: {
      valueType: "string",
      defaultValue: "32px",
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
          label: "图标",
          propName: "icon",
          defaultValue: "SmileOutlined",
        },
        {
          $type: "colorPropSetter",
          label: "颜色",
          propName: "color",
        },
        {
          $type: "numberPropSetter",
          label: "大小",
          propName: "size",
          defaultValue: "32",
        },
      ],
    },
    { $type: "positionPropPanel" },
    { $type: "sizePropPanel" },
  ],
} as RockMeta;

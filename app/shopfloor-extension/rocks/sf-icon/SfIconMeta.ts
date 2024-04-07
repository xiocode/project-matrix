import type { RockMeta } from "@ruiapp/move-style";

export default {
  $type: "sfIcon",

  name: "图标",

  voidComponent: true,

  slots: {
  },

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
          $type: "textPropSetter",
          label: "颜色",
          propName: "color",
        },
        {
          $type: "numberPropSetter",
          label: "大小",
          propName: "size",
          defaultValue: "32",
        },
      ]
    },
  ],
} as RockMeta;
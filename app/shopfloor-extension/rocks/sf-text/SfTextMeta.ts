import type { RockMeta } from "@ruiapp/move-style";

export default {
  $type: "sfText",

  name: "文本",

  props: {
    text: {
      valueType: "string",
      defaultValue: "文本",
    },
  },

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
          label: "文本",
          propName: "text",
        },
      ]
    },
    { $type: "positionPropPanel" },
    { $type: "sizePropPanel" },
  ],
} as RockMeta;
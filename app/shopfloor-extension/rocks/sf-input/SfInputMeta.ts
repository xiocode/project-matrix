import type { RockMeta } from "@ruiapp/move-style";

export default {
  $type: "sfInput",

  name: "输入框",

  slots: {},

  voidComponent: true,

  events: [
    {
      name: "onChange",
      label: "onChange",
      args: {},
    },
  ],

  props: {
    height: {
      valueType: "number",
      defaultValue: 40,
    },
    width: {
      valueType: "number",
      defaultValue: 200,
    },
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
      ],
    },
    { $type: "positionPropPanel" },
    { $type: "sizePropPanel" },
  ],
} as RockMeta;

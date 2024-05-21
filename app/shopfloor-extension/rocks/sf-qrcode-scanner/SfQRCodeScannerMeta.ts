import type { RockMeta } from "@ruiapp/move-style";

export default {
  $type: "sfQrcodeScanner",

  name: "二维码扫描",

  voidComponent: true,

  props: {
    // bgColor: {
    //   valueType: "string",
    //   defaultValue: "#f1f2f3",
    // },
    height: {
      valueType: "number",
      defaultValue: 200,
    },
    width: {
      valueType: "number",
      defaultValue: 200,
    },
  },

  slots: {},

  events: [
    {
      name: "onChange",
      label: "onChange",
      args: {},
    },
  ],

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

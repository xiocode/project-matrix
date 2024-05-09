import type { RockMeta } from "@ruiapp/move-style";

export default {
  $type: "sfPicture",

  name: "图片",

  voidComponent: true,

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

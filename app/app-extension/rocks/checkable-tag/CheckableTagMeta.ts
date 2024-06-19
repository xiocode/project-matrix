import type { RockMeta } from "@ruiapp/move-style";

export default {
  $type: "checkableTag",

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
          $type: "jsonPropsSetter",
          label: "选项",
          propNames: ["options"],
        },
      ],
    },
  ],
} as RockMeta;

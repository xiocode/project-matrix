import type { RockMeta } from "@ruiapp/move-style";

export default {
  $type: "linkshopAppStep",

  slots: {
  },

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [
        {
          $type: "textPropSetter",
          label: "name",
          propName: "name",
        },

        {
          $type: "textPropSetter",
          label: "backgroundColor",
          propName: "backgroundColor",
        },
      ],
    }
  ],
} as RockMeta;
import type { RockMeta } from "@ruiapp/move-style";

export default {
  $type: "linkshopApp",

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
          $type: "linkshopBuilderTriggersPanel",
          label: "Trigger",
          propName: "triggers",
        },
      ],
    },
  ],
} as RockMeta;

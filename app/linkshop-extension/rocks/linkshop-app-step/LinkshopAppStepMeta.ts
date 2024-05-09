import type { RockMeta } from "@ruiapp/move-style";

export default {
  $type: "linkshopAppStep",

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
          label: "backgroundColor",
          propName: "backgroundColor",
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

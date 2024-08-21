import type { RockMeta, RockPropSetter } from "@ruiapp/move-style";

export default {
  $type: "linkshopBuilderBindableSelector",

  name: "绑定选择器",

  slots: {},

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [] as RockPropSetter[],
    },
  ],
} as RockMeta;

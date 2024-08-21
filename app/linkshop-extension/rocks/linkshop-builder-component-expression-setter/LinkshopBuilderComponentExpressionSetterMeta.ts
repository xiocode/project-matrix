import type { RockMeta, RockPropSetter } from "@ruiapp/move-style";

export default {
  $type: "linkshopBuilderComponentExpressionSetter",

  name: "组件属性绑定设置器",

  slots: {},

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [] as RockPropSetter[],
    },
  ],
} as RockMeta;

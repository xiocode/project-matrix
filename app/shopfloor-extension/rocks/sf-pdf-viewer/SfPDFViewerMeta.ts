import type { RockMeta } from "@ruiapp/move-style";

export default {
  $type: "sfPDFViewer",

  name: "附件",

  voidComponent: true,

  props: {
    height: {
      valueType: "number",
      defaultValue: 300,
    },
    width: {
      valueType: "number",
      defaultValue: 200,
    },
  },

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
          $type: "colorPropSetter",
          label: "背景色",
          propName: "backgroundColor",
        },
        {
          $type: "filePropSetter",
          label: "资源",
          propName: "fileObj",
          accept: ".pdf",
        },
      ],
    },
    { $type: "positionPropPanel" },
    { $type: "sizePropPanel" },
    { $type: "borderPropPanel" },
  ],
} as RockMeta;

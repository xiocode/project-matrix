import type { RockMeta } from "@ruiapp/move-style";

export default {
  $type: "sfNumberInput",

  name: "数字输入",

  voidComponent: true,

  props: {
    value: {
      valueType: "number",
      defaultValue: 0,
      onChangeEventName: "onChange",
    },

    fontSize: {
      valueType: "number",
      defaultValue: 16,
    },

    color: {
      valueType: "string",
      defaultValue: "#000000d9",
    },

    textDecorationLine: {
      valueType: "string",
      defaultValue: "none",
    },

    textDecorationStyle: {
      valueType: "string",
      defaultValue: "solid",
    },

    textDecorationColor: {
      valueType: "string",
      defaultValue: "#000000d9",
    },

    width: {
      valueType: "string",
      defaultValue: "100px",
    },

    height: {
      valueType: "string",
      defaultValue: "30px",
    },

    left: {
      valueType: "string",
      defaultValue: "0px",
    },

    top: {
      valueType: "string",
      defaultValue: "0px",
    },
  },

  slots: {},

  propertyPanels: [
    {
      $type: "componentPropPanel",
      title: "常规",
      setters: [
        {
          $type: "numberPropSetter",
          label: "值",
          propName: "value",
        },
        {
          $type: "switchPropSetter",
          label: "禁用",
          propName: "disabled",
        },
        {
          $type: "numberPropSetter",
          label: "文字大小",
          propName: "fontSize",
        },
        {
          $type: "colorPropSetter",
          label: "文本颜色",
          propName: "color",
        },
        {
          $type: "selectPropSetter",
          label: "划线样式",
          propName: "textDecorationLine",
          options: [
            {
              label: "无",
              value: "none",
            },
            {
              label: "下划线",
              value: "underline",
            },
            {
              label: "上划线",
              value: "overline",
            },
            {
              label: "文本线",
              value: "line-through",
            },
          ],
        },
        {
          $type: "selectPropSetter",
          label: "划线类型",
          propName: "textDecorationStyle",
          options: [
            {
              label: "实线",
              value: "solid",
            },
            {
              label: "双线",
              value: "double",
            },
            {
              label: "点线",
              value: "dotted",
            },
            {
              label: "虚线",
              value: "dashed",
            },
            {
              label: "波浪线",
              value: "wavy",
            },
          ],
        },
        {
          $type: "colorPropSetter",
          label: "划线颜色",
          propName: "textDecorationColor",
        },
      ],
    },
    { $type: "positionPropPanel" },
    { $type: "sizePropPanel" },
  ],
} as RockMeta;

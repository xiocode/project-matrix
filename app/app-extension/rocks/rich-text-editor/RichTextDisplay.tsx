import { Rock } from "@ruiapp/move-style";

export default {
  $type: "richTextDisplay",

  slots: {},

  propertyPanels: [],

  Renderer(context, props) {
    if (!props.text) {
      return <></>;
    }

    return <div dangerouslySetInnerHTML={{ __html: props.text }}></div>;
  },
} as Rock<any>;

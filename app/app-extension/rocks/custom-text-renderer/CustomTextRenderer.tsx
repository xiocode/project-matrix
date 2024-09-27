import { type Rock, type RockConfig } from "@ruiapp/move-style";
import { renderRock } from "@ruiapp/react-renderer";
import CustomTextRendererMeta from "./CustomTextRendererMeta";
import type { CustomTextRendererRockConfig } from "./custom-text-renderer-type";
import { parseRockExpressionFunc } from "@ruiapp/rapid-extension";

export default {
  Renderer(context, props) {
    const record = props.$slot.record;

    let text = props.value;
    if (typeof props.render === "string") {
      const render = parseRockExpressionFunc(props.render, { record }, context);
      text = render();
    } else if (typeof props.render === "function") {
      text = props.render({ record, ...context.framework.getExpressionVars() });
    }

    const rockConfig: RockConfig = {
      $id: `${props.$id}_text`,
      $type: "text",
      text,
    };

    return renderRock({ context, rockConfig });
  },

  ...CustomTextRendererMeta,
} as Rock<CustomTextRendererRockConfig>;

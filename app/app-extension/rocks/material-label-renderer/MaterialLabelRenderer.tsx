import type { Rock } from "@ruiapp/move-style";
import MaterialLabelRendererMeta from "./MaterialLabelRendererMeta";
import type { MaterialLabelRendererRockConfig } from "./material-label-renderer-types";

export default {
  Renderer(context, props: MaterialLabelRendererRockConfig) {
    const { value } = props;
    return renderMaterial(value);
  },

  ...MaterialLabelRendererMeta,
} as Rock;

export function renderMaterial(value: MaterialLabelRendererRockConfig["value"]) {
  if (!value) {
    return "";
  }

  let label = value.name;

  if (value.code) {
    label = `${value.code} ${label}`;
  }
  if (value.specification) {
    label = `${label} (${value.specification})`;
  }

  return label;
}

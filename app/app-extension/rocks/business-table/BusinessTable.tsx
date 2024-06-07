import { Rock } from "@ruiapp/move-style";
import { BusinessTableRockConfig } from "./business-table-types";
import BusinessTableMeta from "./BusinessTableMeta";

export default {
  Renderer(context, props, state) {
    return <div></div>;
  },

  ...BusinessTableMeta,
} as Rock<BusinessTableRockConfig>;

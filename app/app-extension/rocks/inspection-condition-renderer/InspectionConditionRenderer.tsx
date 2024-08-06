import { Rock } from "@ruiapp/move-style";
import { fmtCharacteristicNorminal } from "~/utils/fmt";

export default {
  $type: "inspectionConditionRenderer",

  slots: {},

  propertyPanels: [],

  Renderer(context, props: any) {
    const record = props.$slot?.record;

    return fmtCharacteristicNorminal(record);
  },
} as Rock;

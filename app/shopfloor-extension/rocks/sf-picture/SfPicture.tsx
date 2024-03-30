import { CommonProps, type Rock } from "@ruiapp/move-style";
import SfPictureMeta from "./SfPictureMeta";
import type { SfPictureRockConfig } from "./sf-picture-types";
import { pick } from "lodash";

export default {
  Renderer(context, props: SfPictureRockConfig) {
    const { url } = props;

    const wrapStyle: React.CSSProperties = pick(props, CommonProps.PositionStylePropNames) as any;
    wrapStyle.position = "absolute";
    return <img data-component-id={props.$id} alt="" style={wrapStyle} src={url} />
  },

  ...SfPictureMeta,
} as Rock;
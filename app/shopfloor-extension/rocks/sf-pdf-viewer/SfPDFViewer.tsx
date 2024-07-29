import { CommonProps, type Rock } from "@ruiapp/move-style";
import SfAttachmentMeta from "./SfPDFViewerMeta";
import type { SfPDFViewerRockConfig } from "./sf-pdf-viewer-types";
import { pick } from "lodash";
import { EyeOutlined, FilePdfOutlined } from "@ant-design/icons";
import { previewPdf } from "~/utils/file-utility";

export default {
  Renderer(context, props: SfPDFViewerRockConfig) {
    const { src, fileObj, preview = true } = props;

    const styleNames = [...CommonProps.PositionStylePropNames, ...CommonProps.SizeStylePropNames, ...CommonProps.BorderStylePropNames];
    const wrapStyle: React.CSSProperties = pick(props, styleNames) as any;
    wrapStyle.position = "absolute";
    wrapStyle.backgroundColor = props.backgroundColor;

    let url = src;
    if (fileObj) {
      url = `/api/download/file?inline=true&fileKey=${fileObj.fileKey}&fileName=${fileObj.fileName}`;
    }

    if (!url) {
      return (
        <div data-component-id={props.$id} style={wrapStyle} className="sf-pdf-viewer">
          <div className="sf-pdf-viewer--empty">
            <FilePdfOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
            <span style={{ fontSize: 16, marginTop: 24 }}>pdf文件</span>
          </div>
        </div>
      );
    }

    return (
      <div data-component-id={props.$id} style={wrapStyle} className="sf-pdf-viewer">
        <iframe title={fileObj?.fileName} src={url ? `${url}#toolbar=0` : "about:blank"} className="sf-pdf-viewer--iframe" width="100%" height="100%" />
        {preview && (
          <span
            className="sf-pdf-viewer--scale"
            onClick={() => {
              previewPdf({ url });
            }}
          >
            <EyeOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
          </span>
        )}
      </div>
    );
  },

  ...SfAttachmentMeta,
} as Rock;

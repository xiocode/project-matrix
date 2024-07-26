import { CommonProps, type Rock } from "@ruiapp/move-style";
import SfAttachmentMeta from "./SfPDFViewerMeta";
import type { SfPDFViewerRockConfig } from "./sf-pdf-viewer-types";
import { pick } from "lodash";
import { useEffect, useRef, useState } from "react";
import { ExpandOutlined, FilePdfOutlined } from "@ant-design/icons";

export default {
  Renderer(context, props: SfPDFViewerRockConfig) {
    const { src, fileObj } = props;

    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
      if (!iframeRef.current) {
        return;
      }

      iframeRef.current.onfullscreenchange = (e) => {
        setOpen((draft) => !draft);
      };
    }, []);

    const styleNames = [...CommonProps.PositionStylePropNames, ...CommonProps.SizeStylePropNames, ...CommonProps.BorderStylePropNames];
    const wrapStyle: React.CSSProperties = pick(props, styleNames) as any;
    wrapStyle.position = "absolute";
    wrapStyle.backgroundColor = props.backgroundColor;

    let url = src;
    if (fileObj) {
      url = `/api/download/file?inline=true&fileKey=${fileObj.fileKey}&fileName=${fileObj.fileName}&open=${open}`;
    }

    if (!open && url) {
      url = `${url}#toolbar=0`;
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
        <iframe
          title={fileObj?.fileName}
          ref={iframeRef}
          allow="fullscreen"
          src={url || "about:blank"}
          className="sf-pdf-viewer--iframe"
          width="100%"
          height="100%"
        />
        <span
          className="sf-pdf-viewer--scale"
          onClick={() => {
            iframeRef.current?.requestFullscreen();
          }}
        >
          <ExpandOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
        </span>
      </div>
    );
  },

  ...SfAttachmentMeta,
} as Rock;

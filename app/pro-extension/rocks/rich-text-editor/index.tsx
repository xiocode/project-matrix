import type { Rock } from "@ruiapp/move-style";
import meta from "./meta";
import { RichTextEditorRockConfig } from "./type";
import { lazy, Suspense } from "react";
// @ts-ignore
import { ClientOnly } from "remix-utils/client-only";

import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import Editor from "./editor";

// const Editor = lazy(() => import("./editor"));

export default {
  Renderer(context, props: RichTextEditorRockConfig) {
    const { width } = props;

    let containerStyle = {};
    if (width) {
      containerStyle = { width };
    }

    return (
      <div style={containerStyle}>
        <Editor {...props} />
        {/* <ClientOnly fallback={<p>loading...</p>}>
          {() => (
            <Editor {...props} />
            // <Suspense fallback={<p>loading...</p>}>
            //   <Editor {...props} />
            // </Suspense>
          )}
        </ClientOnly> */}
      </div>
    );
  },

  ...meta,
} as Rock;

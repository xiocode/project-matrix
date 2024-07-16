import { type Rock } from "@ruiapp/move-style";
import { lazy, memo, PropsWithChildren, useEffect, useState, Suspense } from "react";

const Editor = lazy(() => import("./Editor"));

const ClientOnly = memo<PropsWithChildren>((props) => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? <>{props.children}</> : <></>;
});

export default {
  $type: "richTextEditor",

  slots: {},

  propertyPanels: [],

  Renderer(context, props) {
    return (
      <ClientOnly>
        <Suspense fallback={<div></div>}>
          <Editor />
        </Suspense>
      </ClientOnly>
    );
  },
} as Rock<any>;

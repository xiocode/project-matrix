import type { Rock } from "@ruiapp/move-style";
import LinkMeta from "./LinkMeta";
import type { LinkRockConfig } from "./link-types";
import { Link } from "@remix-run/react";
import { renderRockChildren } from "@ruiapp/react-renderer";

export default {
  Renderer(context, props: LinkRockConfig) {
    const { className, to, replace, text } = props;

    return <Link to={to} replace={replace} className={className}>
      {
        text || renderRockChildren({context,
          rockChildrenConfig: props.children,
          expVars: {
            $slot: props.$slot,
          },
          fixedProps: {
            $slot: props.$slot,
          }
        })
      }
    </Link>
  },

  ...LinkMeta,
} as Rock;

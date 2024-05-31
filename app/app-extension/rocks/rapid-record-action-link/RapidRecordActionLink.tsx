import type { Rock } from "@ruiapp/move-style";
import RapidRecordActionLinkMeta from "./RapidRecordActionLinkMeta";
import type { LinkRockConfig } from "./rapid-record-action-link-types";
import { Link } from "@remix-run/react";
import { renderRockChildren } from "@ruiapp/react-renderer";

export default {
  Renderer(context, props: LinkRockConfig) {
    const { className, to, replace, actionText } = props;

    return <Link to={to} replace={replace} className={className || "rui-table-action-link"}>
      {
        actionText || renderRockChildren({context,
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

  ...RapidRecordActionLinkMeta,
} as Rock;

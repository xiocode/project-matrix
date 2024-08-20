import { type Rock } from "@ruiapp/move-style";
import { renderRock, renderRockChildren } from "@ruiapp/react-renderer";
import { isArray } from "lodash";
import moment from "moment";
import { useState } from "react";

export default {
  $type: "blockRerenderRock",

  slots: {},

  propertyPanels: [],

  onResolveState(props, state) {
    const [rerenderKey, setRerenderKey] = useState<string | number>("");

    return {
      rerenderKey,
      rerenderRock: () => {
        setRerenderKey(moment().unix());
      },
    };
  },
  onReceiveMessage(message, state, props) {
    if (message.name === "rerenderRock") {
      state.rerenderRock();
    }
  },

  Renderer(context, props) {
    if (isArray(props.children)) {
      return renderRockChildren({ context, rockChildrenConfig: props.children });
    }

    return renderRock({ context, rockConfig: props.children });
  },
} as Rock<any>;

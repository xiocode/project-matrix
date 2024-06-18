import { MoveStyleUtils, RockChildrenConfig, type Rock } from "@ruiapp/move-style";
import { renderRock, renderRockChildren } from "@ruiapp/react-renderer";
import SonicRecordActionPrintEntityMeta from "./SonicRecordActionPrintEntityMeta";
import type { SonicRecordActionPrintEntityRockConfig } from "./sonic-record-action-print-entity-types";
import lodash from "lodash";
import dayjs from "dayjs";

export default {
  onInit(context, props) {},

  onReceiveMessage(message, state, props) {},

  Renderer(context, props) {
    let dataSource = props.record ? [props.record] : [];
    if (typeof props.dataSourceAdapter === "string") {
      const adapter = props.dataSourceAdapter.trim();
      if (adapter.indexOf("function") === 0) {
        // TODO: ruiUtils: lodash、dayjs
        dataSource = new Function(`return ${adapter}`)()(dataSource, { dayjs, lodash });
      }
    } else if (typeof props.dataSourceAdapter === "function") {
      dataSource = props.dataSourceAdapter(dataSource, { lodash, dayjs });
    }

    const rockChildrenConfig: RockChildrenConfig = [
      {
        ...(MoveStyleUtils.omitSystemRockConfigFields(props) as SonicRecordActionPrintEntityRockConfig),
        $type: "rapidTableAction",
        onAction: [
          {
            $action: "script",
            script: () => {
              context.page.sendComponentMessage(`${props.$id}_${props.recordId}_trigger`, { name: "print" });
            },
          },
        ],
      },
      {
        $type: "printTrigger",
        $id: `${props.$id}_${props.recordId}_trigger`,
        dataSource,
        printerCode: props.printerCode,
        printTemplateCode: props.printTemplateCode,
      },
    ];

    return renderRockChildren({ context, rockChildrenConfig });
  },

  ...SonicRecordActionPrintEntityMeta,
} as Rock<SonicRecordActionPrintEntityRockConfig>;

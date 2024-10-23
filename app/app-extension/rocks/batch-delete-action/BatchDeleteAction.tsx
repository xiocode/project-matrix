import { RockChildrenConfig, type Rock } from "@ruiapp/move-style";
import { convertToEventHandlers, renderRockChildren } from "@ruiapp/react-renderer";
import BatchDeleteActionMeta from "./BatchDeleteActionMeta";
import type { BatchDeleteActionRockConfig } from "./batch-delete-action-types";
import { get } from "lodash";
import { message, Modal } from "antd";
import { rapidAppDefinition } from "@ruiapp/rapid-extension";
import { rapidApiRequest } from "~/rapidApi";
import { useState } from "react";

export default {
  Renderer(context, props) {
    const [deleting, setDeleting] = useState<boolean>(false);

    const eventHandlers = convertToEventHandlers({ context, rockConfig: props }) as any;

    const selectedRecords = get(context.scope.vars, "selectedRecords") || [];

    const entity = props.entityCode ? rapidAppDefinition.getEntityByCode(props.entityCode) : null;

    const batchDeleteRecords = async () => {
      if (deleting) {
        return;
      }

      setDeleting(true);
      const { error } = await rapidApiRequest({
        url: `/${entity?.namespace}/${entity?.pluralCode}/operations/delete`,
        method: "POST",
        data: {
          filters: [
            {
              field: "id",
              operator: "in",
              value: selectedRecords.map((r: any) => r.id),
            },
          ],
        },
      });

      if (!error) {
        message.success("批量删除成功");
        eventHandlers.onSuccess?.();
      } else {
        message.error(error?.message || "批量删除失败");
      }

      setDeleting(false);
    };

    const rockChildrenConfig: RockChildrenConfig = [
      {
        $type: "antdButton",
        disabled: !selectedRecords.length || entity == null,
        loading: deleting,
        type: "danger",
        children: {
          $type: "text",
          text: props.title || `批量删除`,
        },
        onClick: [
          {
            $action: "script",
            script: () => {
              Modal.confirm({
                content: props.tooltipText || "确认批量删除已选记录吗？",
                onOk: () => {
                  batchDeleteRecords();
                },
              });
            },
          },
        ],
      },
    ];

    return renderRockChildren({ context, rockChildrenConfig });
  },

  ...BatchDeleteActionMeta,
} as Rock<BatchDeleteActionRockConfig>;

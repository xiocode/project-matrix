import type { Rock } from "@ruiapp/move-style";
import CheckableTagMeta from "./CheckableTagMeta";
import type { CheckableTagRockConfig } from "./checkable-tag-types";
import { convertToEventHandlers } from "@ruiapp/react-renderer";
import { Space, Tag } from "antd";
import { get } from "lodash";
const CheckableTag = Tag.CheckableTag;

export default {
  Renderer(context, props: CheckableTagRockConfig) {
    const { valueKey = "value", labelKey = "label", value } = props;

    const eventHandlers = convertToEventHandlers({ context, rockConfig: props }) as any;

    return (
      <Space wrap size={[8, 8]}>
        {(props.options || []).map((option) => {
          const currentChecked = (value || []).some((v) => v === option.value);
          const currentKey = get(option, valueKey);

          return (
            <CheckableTag
              checked={currentChecked}
              className={currentChecked ? "" : "pm-checkable-tag"}
              key={currentKey}
              onChange={(checked) => {
                eventHandlers.onChange?.(checked ? [...(value || []), currentKey] : (value || []).filter((v) => v !== currentKey));
              }}
            >
              {get(option, labelKey)}
            </CheckableTag>
          );
        })}
      </Space>
    );
  },

  ...CheckableTagMeta,
} as Rock;

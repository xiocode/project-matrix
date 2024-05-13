import { CommonProps, RockConfig, type Rock } from "@ruiapp/move-style";
import SfEntityFormMeta from "./SfEntityFormMeta";
import type { SfEntityFormRockConfig } from "./sf-entity-form-types";
import { find, pick } from "lodash";
import { renderRock } from "@ruiapp/react-renderer";
import rapidAppDefinition from "~/rapidAppDefinition";
import { generateRockConfigOfError, RapidEntity } from "@ruiapp/rapid-extension";

export default {
  Renderer(context, props: SfEntityFormRockConfig) {
    const { items = [], column = 1, actions = [], entityConfig } = props;

    const styleNames = [...CommonProps.PositionStylePropNames, ...CommonProps.SizeStylePropNames];
    const wrapStyle: React.CSSProperties = pick(props, styleNames) as any;
    wrapStyle.position = "absolute";
    wrapStyle.overflow = "auto";

    const entities = rapidAppDefinition.entities;
    let mainEntity: RapidEntity | undefined;

    if (entityConfig?.entityCode) {
      mainEntity = find(entities, (item) => item.code === entityConfig.entityCode);
      if (!mainEntity) {
        const errorRockConfig = generateRockConfigOfError(new Error(`Entitiy with code '${entityConfig.entityCode}' not found.`));
        return renderRock({
          context,
          rockConfig: {
            ...errorRockConfig,
            style: wrapStyle,
          },
        });
      }
    }

    const formMode = props.mode || "new";

    const formRockConfig: RockConfig = {
      $type: "rapidEntityForm",
      $id: `${props.$id}-rapidEntityForm`,
      entityCode: entityConfig?.entityCode,
      dataSourceCode: formMode === "new" ? null : `${entityConfig?.name}_${formMode}`,
      mode: formMode,
      column,
      items,
      actions,
      $exps: props.$exps,
    };

    return (
      <div style={wrapStyle} className="lsb-antd-row">
        {renderRock({
          context,
          rockConfig: formRockConfig,
        })}
      </div>
    );
  },

  ...SfEntityFormMeta,
} as Rock;

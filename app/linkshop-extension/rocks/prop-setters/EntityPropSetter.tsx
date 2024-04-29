import { TextRockPropSetter, RockConfig, Rock, MoveStyleUtils, RockEvent } from '@ruiapp/move-style';
import { renderRock } from '@ruiapp/react-renderer';

export interface EntityPropSetterProps extends TextRockPropSetter {
  $id: string;
  componentConfig: RockConfig;
}

export default {
  $type: 'entityPropSetter',

  Renderer(context, props: EntityPropSetterProps) {
    const { $id, label, labelTip, componentConfig, propName, defaultValue } = props;
    const isPropDynamic = MoveStyleUtils.isComponentPropertyDynamic(componentConfig, propName);

    let rockConfig: any = {
      $id: isPropDynamic ? `${$id}-dynamic` : `${$id}-static`,
      $type: isPropDynamic ? 'expressionPropSetter' : 'singleControlPropSetter',
      label,
      labelTip,
      propName,
      componentConfig,
    } as any;

    if (!isPropDynamic) {
      (rockConfig as any).defaultValue = defaultValue;
      (rockConfig as any).control = {
        $type: 'entitySetterSelect',
      };
    }

    return renderRock({ context, rockConfig });
  },
} as Rock;

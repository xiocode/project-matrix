import { TextRockPropSetter, RockConfig, Rock, MoveStyleUtils, RockEvent } from '@ruiapp/move-style';
import { renderRock } from '@ruiapp/react-renderer';

export interface StoreEntityPropSetterProps extends TextRockPropSetter {
  $id: string;
  componentConfig: RockConfig;
}

export default {
  $type: 'storeEntityPropSetter',

  Renderer(context, props: StoreEntityPropSetterProps) {
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
        $type: 'storeEntitySetterSelect',
      };
    }

    return renderRock({ context, rockConfig });
  },
} as Rock;

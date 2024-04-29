import { TextRockPropSetter, RockConfig, Rock, MoveStyleUtils, RockPropSetterControl } from '@ruiapp/move-style';
import { renderRock } from '@ruiapp/react-renderer';

export interface DynamicArrayPropSetterProps extends TextRockPropSetter {
  $id: string;
  componentConfig: RockConfig;
  controls?: RockPropSetterControl[];
}

export default {
  $type: 'dynamicArrayPropSetter',

  Renderer(context, props: DynamicArrayPropSetterProps) {
    const { $id, label, labelTip, componentConfig, propName, defaultValue, controls } = props;
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
        $type: 'dynamicArraySetterInput',
        controls,
      };
    }

    return renderRock({ context, rockConfig });
  },
} as Rock;

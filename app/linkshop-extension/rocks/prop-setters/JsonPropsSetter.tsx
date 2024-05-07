import { RockConfig, Rock, RockConfigBase } from '@ruiapp/move-style';
import { renderRock } from '@ruiapp/react-renderer';
import { isUndefined } from 'lodash';
import { getComponentPropsValue } from '@ruiapp/designer-extension';

export interface JsonPropsSetterProps extends RockConfigBase {
  $id: string;
  componentConfig: RockConfig;
  label: string;
  labelTip?: string;
  propNames: string[];
  defaultValue?: Record<string, any>;
}

export default {
  $type: 'jsonPropsSetter',

  Renderer(context, props: JsonPropsSetterProps) {
    const { $id, label, labelTip, componentConfig, propNames, defaultValue } = props;

    let rockConfig = {
      $id: `${$id}-static`,
      $type: 'singleControlPropsSetter',
      label,
      labelTip,
      propNames,
      componentConfig,
    } as any;

    (rockConfig as any).defaultValue = defaultValue;
    (rockConfig as any).control = {
      $type: 'jsonSetterInput',
    };

    const value = getComponentPropsValue(componentConfig, propNames, defaultValue);
    if (!isUndefined(value)) {
      (rockConfig as any).extra = {
        $type: 'jsonValueDisplay',
      };
    }

    return renderRock({ context, rockConfig });
  },
} as Rock;

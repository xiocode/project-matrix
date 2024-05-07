import {
  ContainerRockConfig,
  RockConfig,
  RockEvent,
  RockEventHandlerScript,
  Rock,
  RockConfigBase,
  RockPropSetterControl,
  RockEventHandler,
  handleComponentEvent,
} from '@ruiapp/move-style';
import { renderRockChildren } from '@ruiapp/react-renderer';
import _, { forEach, split } from 'lodash';
import { useCallback, useMemo } from 'react';

export interface DynamicArraySetterInputProps extends RockConfigBase {
  $id: string;
  value?: Record<string, any>[];
  onChange?: RockEventHandler;
  controls?: RockPropSetterControl[];
}

export default {
  $type: 'dynamicArraySetterInput',

  Renderer(context, props: DynamicArraySetterInputProps) {
    const { page, framework, scope } = context;
    const { $id, controls, onChange, value } = props;

    const onControlsChange = useCallback(
      (value: DynamicArraySetterInputProps['value']) => {
        handleComponentEvent('onChange', framework, page, scope, props, onChange!, [value]);
      },
      [page, $id, onChange],
    );

    const controlRocks: RockConfig[] = useMemo(() => {
      const rowRocks: RockConfig[] = [];

      forEach(value, (r, rIdx) => {
        let currentRowRock: ContainerRockConfig = {
          $id: `${$id}-row-${rIdx}`,
          $type: 'antdRow',
          align: 'middle',
          wrap: false,
          children: [],
        };

        forEach(controls, (control, cIdx) => {
          const { control: inputControlRockConfig, propName: controlPropName, defaultValue } = control;

          let config = { ...inputControlRockConfig };
          config.$id = `${$id}-input-${rIdx}-${cIdx}`;

          if (controlPropName) {
            if (r?.hasOwnProperty(controlPropName)) {
              config.value = r[controlPropName];
            } else if (!_.isUndefined(defaultValue)) {
              config.value = defaultValue;
            }

            const onInputControlChange: RockEventHandlerScript['script'] = (event: RockEvent) => {
              const propValue = event.args[0];
              onControlsChange(
                value?.map((item, i) => {
                  return i === rIdx ? { ...(item || {}), [control.propName!]: propValue } : item;
                }),
              );
            };

            config.onChange = {
              $action: 'script',
              script: onInputControlChange,
            };
          }

          currentRowRock.children?.push({
            $id: `${$id}-row-${rIdx}-${cIdx}`,
            $type: 'antdCol',
            flex: 1,
            style: {
              marginRight: 4,
            },
            children: config,
          } as RockConfig);
        });

        currentRowRock.children?.push({
          $id: `${$id}-row-${rIdx}-remove-btn`,
          $type: 'htmlElement',
          htmlTag: 'span',
          onClick: {
            $action: 'script',
            script: (event: RockEvent) => {
              onControlsChange(value?.filter((_, i) => i !== rIdx));
            },
          },
          children: [
            {
              $type: 'antdIcon',
              name: 'MinusCircleOutlined',
            },
          ],
        } as RockConfig);

        rowRocks.push(currentRowRock);
      });

      rowRocks.push({
        $id: `${$id}-add-btn`,
        $type: 'antdButton',
        type: 'dashed',
        block: true,
        style: {
          marginTop: 4,
        },
        icon: {
          $type: 'antdIcon',
          name: 'PlusOutlined',
        },
        onClick: {
          $action: 'script',
          script: (event: RockEvent) => {
            onControlsChange([...(value || []), {}]);
          },
        },
      });

      return rowRocks;
    }, [controls, value]);

    return renderRockChildren({ context, rockChildrenConfig: controlRocks });
  },
} as Rock;

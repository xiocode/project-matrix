import { MoveStyleUtils, RockChildrenConfig, RockEvent, type Rock } from "@ruiapp/move-style";
import { renderRockChildren } from "@ruiapp/react-renderer";
import InspectionPrintRecordActionMeta from "./InspectionPrintRecordActionMeta";
import type { InspectionPrintRecordActionRockConfig } from "./inspection-print-record-action-types";
import lodash from "lodash";
import dayjs from "dayjs";
import { useSetState } from "ahooks";
import { useRef } from "react";

interface IFormData {
  sampleCount?: number;
  printSamples?: string[];
  remark?: string;
}

export default {
  Renderer(context, props) {
    const [currentState, setCurrentState] = useSetState<Record<string, any>>({});
    const formDataRef = useRef<IFormData>({});

    const closeModal = () => {
      context.page.sendComponentMessage(`${props.$id}_${props.recordId}_form`, { name: "resetFields" });
    };

    const getDataSource = () => {
      let dataSource = (formDataRef.current.printSamples || []).map((sampleNo) => ({
        ...(props.record || {}),
        sampleNo,
        remark: formDataRef.current.remark,
      }));

      if (typeof props.dataSourceAdapter === "string") {
        const adapter = props.dataSourceAdapter.trim();
        if (adapter.indexOf("function") === 0) {
          // TODO: ruiUtils: lodash、dayjs
          dataSource = new Function(`return ${adapter}`)()(dataSource, { dayjs, lodash });
        }
      } else if (typeof props.dataSourceAdapter === "function") {
        dataSource = props.dataSourceAdapter(dataSource, { lodash, dayjs });
      }

      return dataSource;
    };

    const rockChildrenConfig: RockChildrenConfig = [
      {
        ...(MoveStyleUtils.omitSystemRockConfigFields(props) as InspectionPrintRecordActionRockConfig),
        $type: "rapidTableAction",
        onAction: [
          {
            $action: "script",
            script: () => {
              setCurrentState({ visible: true });
            },
          },
        ],
      },
      {
        $id: `${props.$id}_${props.recordId}_modal`,
        $type: "antdModal",
        title: "送检标签",
        open: currentState.visible,
        children: [
          {
            $id: `${props.$id}_${props.recordId}_form`,
            $type: "rapidForm",
            items: [
              {
                type: "number",
                label: "样本数量",
                code: "sampleCount",
              },
              {
                type: "auto",
                formControlType: "checkableTag",
                formControlProps: {
                  options: [],
                },
                label: "打印",
                code: "printSamples",
                $exps: {
                  "formControlProps.options": "$self.form.getFieldValue('checkableTagOptions') || []",
                },
              },
              {
                type: "textarea",
                label: "备注",
                code: "remark",
              },
            ],
            onValuesChange: [
              {
                $action: "script",
                script: `
                const changedValues = event.args[0] || {};
                if(changedValues.hasOwnProperty('sampleCount')) {
                  const _ = event.framework.getExpressionVars()._;
                  const checkableTagOptions = _.range(changedValues.sampleCount).map(function (i) {
                    return { label: (i + 1) + '号', value: i }
                  }) || [];
                  event.page.sendComponentMessage(event.sender.$id, {
                    name: "setFieldsValue",
                    payload: {
                      checkableTagOptions,
                      printSamples: checkableTagOptions.map(function(option) {
                        return option.value
                      })
                    }
                  });
                }
              `,
              },
            ],
            onFinish: [
              {
                $action: "script",
                script: (e: RockEvent) => {
                  const formData = e.args?.[0];
                  formDataRef.current = formData;
                  context.page.sendComponentMessage(`${props.$id}_${props.recordId}_printer`, { name: "print" });
                },
              },
            ],
          },
        ],
        okText: "打印",
        cancelText: "取消",
        onOk: [
          {
            $action: "script",
            script: () => {
              context.page.sendComponentMessage(`${props.$id}_${props.recordId}_form`, { name: "submit" });
            },
          },
        ],
        onCancel: [
          {
            $action: "script",
            script: () => {
              setCurrentState({ visible: false });
              closeModal();
            },
          },
        ],
      },
      {
        $type: "printTrigger",
        $id: `${props.$id}_${props.recordId}_printer`,
        dataSource: getDataSource,
        printerCode: props.printerCode,
        printTemplateCode: props.printTemplateCode,
      },
    ];

    return renderRockChildren({ context, rockChildrenConfig });
  },

  ...InspectionPrintRecordActionMeta,
} as Rock<InspectionPrintRecordActionRockConfig>;

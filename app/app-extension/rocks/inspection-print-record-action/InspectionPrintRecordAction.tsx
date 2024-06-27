import { MoveStyleUtils, RockChildrenConfig, RockEvent, type Rock } from "@ruiapp/move-style";
import { renderRockChildren } from "@ruiapp/react-renderer";
import InspectionPrintRecordActionMeta from "./InspectionPrintRecordActionMeta";
import type { InspectionPrintRecordActionRockConfig } from "./inspection-print-record-action-types";
import { useSetState } from "ahooks";
import { useRef } from "react";
import { parseRockExpressionFunc } from "~/utils/func-util";
import rapidApi from "~/rapidApi";
import { message } from "antd";
import { get } from "lodash";

interface IFormData {
  sampleCount?: number;
  printSamples?: string[];
  remark?: string;
}

export default {
  Renderer(context, props) {
    const [currentState, setCurrentState] = useSetState<Record<string, any>>({});
    const formDataRef = useRef<IFormData>({});

    const { loadInspectionInfo, loading, inspectionInfo } = useInspectionInfo(props);

    const closeModal = () => {
      setCurrentState({ visible: false });
      context.page.sendComponentMessage(`${props.$id}_${props.recordId}_form`, { name: "resetFields" });
    };

    const getDataSource = () => {
      let dataSource = (formDataRef.current.printSamples || []).map((sampleNo) => ({
        ...(props.record || {}),
        sampleNo,
        remark: formDataRef.current.remark,
        inspectCode: get(inspectionInfo, "code"),
        inspector: get(inspectionInfo, "code"),
      }));

      if (typeof props.dataSourceAdapter === "string") {
        const adapter = parseRockExpressionFunc(props.dataSourceAdapter, { data: dataSource }, context);
        dataSource = adapter();
      } else if (typeof props.dataSourceAdapter === "function") {
        dataSource = props.dataSourceAdapter({ data: dataSource, ...context.framework.getExpressionVars() });
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
              loadInspectionInfo();
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
            $type: "antdSpin",
            spinning: loading,
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
                        return { label: (i + 1) + '号', value: i + 1 }
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

                      if (!formData.printSamples?.length) {
                        message.error("打印样本不可为空");
                        return;
                      }

                      closeModal();
                      context.page.sendComponentMessage(`${props.$id}_${props.recordId}_printer`, { name: "print" });
                    },
                  },
                ],
              },
            ],
          },
        ],
        okText: "打印",
        cancelText: "取消",
        okButtonProps: {
          disabled: loading,
        },
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
              closeModal();
            },
          },
        ],
      },
      {
        $type: "printTrigger",
        $id: `${props.$id}_${props.recordId}_printer`,
        dataSource: getDataSource,
        printTemplateCode: props.printTemplateCode,
      },
    ];

    return renderRockChildren({ context, rockChildrenConfig });
  },

  ...InspectionPrintRecordActionMeta,
} as Rock<InspectionPrintRecordActionRockConfig>;

function useInspectionInfo(props: InspectionPrintRecordActionRockConfig) {
  const { record, operationId } = props;

  const [state, setState] = useSetState<{ loading: boolean; inspectionInfo?: any }>({ loading: false });

  const loadInspectionInfo = async () => {
    if (state.loading) {
      return;
    }

    await rapidApi
      .post("/mom/mom_inspection_sheets/operations/find", {
        filters: [
          {
            operator: "eq",
            field: "inventory_operation_id",
            value: operationId,
          },
          {
            operator: "eq",
            field: "material_id",
            value: record?.material?.id,
          },
          {
            operator: "eq",
            field: "lotNum",
            value: record?.lotNum,
          },
        ],
        properties: ["id", "state", "code", "material", "lotNum", "inventoryOperation", "result", "sender", "inspector", "reviewer", "createdAt"],
        pagination: {
          limit: 1,
          offset: 0,
        },
      })
      .then((res) => {
        const data = res.data?.list?.[0];
        setState({ inspectionInfo: data });
      })
      .finally(() => {
        setState({ loading: false });
      });
  };

  return { loadInspectionInfo, ...state };
}

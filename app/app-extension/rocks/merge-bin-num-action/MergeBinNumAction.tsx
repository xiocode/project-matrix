import { RockChildrenConfig, RockEvent, type Rock } from "@ruiapp/move-style";
import { renderRockChildren } from "@ruiapp/react-renderer";
import MergeBinNumActionMeta from "./MergeBinNumActionMeta";
import type { MergeBinNumActionRockConfig } from "./merge-bin-num-action-types";
import { useSetState } from "ahooks";
import { useEffect, useMemo, useState } from "react";
import { get } from "lodash";
import { message } from "antd";
import rapidApi from "~/rapidApi";

export default {
  Renderer(context, props) {
    const [currentState, setCurrentState] = useSetState<Record<string, any>>({});

    const selectedRecords = get(context.scope.vars, "selectedRecords") || [];

    const closeModal = () => {
      setCurrentState({ visible: false });
      context.page.sendComponentMessage(`${props.$id}_form`, { name: "resetFields" });
    };

    const { mergeBinNum, merging } = useMergeBinNum(() => {
      closeModal();
      context.scope.setVars({ [`goodEntityList-rapidEntityList-selectedIds`]: [] });
      context.scope.getStore("list").loadData();
    });

    const materialInfo = useMemo(() => {
      const materialInfo = selectedRecords.map((r: any) => `${r.binNum}(${get(r.location, "name")})`).join("、");

      return `将标识卡 “${materialInfo}” 合并`;
    }, [selectedRecords]);

    const { locationOptions, canMerge, isAllNormalState } = useMemo(() => {
      const materialGroupKeys = new Set();
      const locationMap = new Map();
      selectedRecords.forEach((r: any) => {
        materialGroupKeys.add(`${r.material?.id}_${r.lotNum}`);
        if (r.location) {
          locationMap.set(r.location.id, r.location);
        }
      });

      return {
        isAllNormalState: !selectedRecords.some((r: any) => r.state !== "normal"),
        // 不同物料、不同批次的不允许合并
        canMerge: materialGroupKeys.size === 1,
        // 如果是同一库位则只能选择该库位，如果是不同库位可以选择任意原标识卡库位
        locationOptions: [...locationMap.values()].map((location) => ({ label: location.name, value: location.id })),
      };
    }, [selectedRecords]);

    useEffect(() => {
      if (currentState.visible) {
        context.page.sendComponentMessage(`${props.$id}_form`, {
          name: "setFieldsValue",
          payload: {
            locationId: locationOptions[0]?.value,
          },
        });
      }
    }, [currentState.visible]);

    const rockChildrenConfig: RockChildrenConfig = [
      {
        $type: "antdButton",
        disabled: !selectedRecords.length,
        children: {
          $type: "text",
          text: `合并标识卡`,
        },
        onClick: [
          {
            $action: "script",
            script: () => {
              if (!canMerge) {
                message.error("不同物料、不同批次的不允许合并");
                return;
              }

              if (!isAllNormalState) {
                message.error("仅正常状态的标签允许合并");
                return;
              }

              setCurrentState({ visible: true });
            },
          },
        ],
      },
      {
        $id: `${props.$id}_modal`,
        $type: "antdModal",
        title: "合并标识卡",
        open: currentState.visible,
        children: [
          {
            $id: `${props.$id}_form`,
            $type: "rapidForm",
            items: [
              {
                type: "auto",
                code: "info",
                formControlType: "text",
                formControlProps: {
                  text: materialInfo,
                },
              },
              {
                label: "合并后库位",
                code: "locationId",
                required: true,
                formControlType: "antdSelect",
                formControlProps: {
                  options: locationOptions,
                },
              },
            ],
            onFinish: [
              {
                $action: "script",
                script: (e: RockEvent) => {
                  const formData = e.args?.[0];
                  if (!formData.locationId) {
                    message.error("合并后库位不可为空");
                    return;
                  }

                  mergeBinNum({
                    goodIds: selectedRecords.map((r: any) => r.id),
                    locationId: formData.locationId,
                  });
                },
              },
            ],
          },
        ],
        confirmLoading: merging,
        okText: "确定",
        cancelText: "取消",
        onOk: [
          {
            $action: "script",
            script: () => {
              context.page.sendComponentMessage(`${props.$id}_form`, { name: "submit" });
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
    ];

    return renderRockChildren({ context, rockChildrenConfig });
  },

  ...MergeBinNumActionMeta,
} as Rock<MergeBinNumActionRockConfig>;

function useMergeBinNum(onSuccess: () => void) {
  const [merging, setMerging] = useState<boolean>(false);

  const mergeBinNum = async (params: { goodIds: string[]; locationId: string }) => {
    if (merging) {
      return;
    }

    setMerging(true);
    await rapidApi
      .post(`/app/mergeGoods`, params)
      .then((res) => {
        if (res.status === 200) {
          onSuccess();
        }
      })
      .finally(() => {
        setMerging(false);
      });
  };

  return { mergeBinNum, merging };
}

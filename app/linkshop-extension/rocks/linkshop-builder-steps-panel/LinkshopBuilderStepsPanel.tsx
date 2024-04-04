import type { Rock, RockConfig, RockEvent, RockEventHandlerScript, RockInstanceContext } from "@ruiapp/move-style";
import LinkshopBuilderStepsPanelMeta from "./LinkshopBuilderStepsPanelMeta";
import type { LinkshopBuilderStepsPanelRockConfig } from "./linkshop-builder-steps-panel-types";
import { renderRock } from "@ruiapp/react-renderer";
import type { LinkshopAppRockConfig, LinkshopAppStepRockConfig } from "~/linkshop-extension/linkshop-types";
import { useCallback, useMemo } from "react";
import { find, forEach } from "lodash";
import type { LinkshopAppDesignerStore } from "~/linkshop-extension/stores/LinkshopAppDesignerStore";
import { sendDesignerCommand } from "~/linkshop-extension/utilities/DesignerUtility";


export type StepTreeNode = StepNode | ComponentNode | SlotNode;

export interface StepNode {
  $nodeType: "step";
  $id: string;
  $type?: string;
  label: string;
  children?: StepTreeNode[];
}

export interface ComponentNode {
  $nodeType: "component";
  $id: string;
  $type?: string;
  label: string;
  children?: StepTreeNode[];
}

export interface SlotNode {
  $nodeType: "slot";
  $id: string;
  $componentId: string;
  $slotPropName: string;
  label: string;
  children?: StepTreeNode[];
}

export default {
  Renderer(context: RockInstanceContext, props: LinkshopBuilderStepsPanelRockConfig) {
    const { designerStoreName } = props;
    const designerStore = context.page.getStore<LinkshopAppDesignerStore>(designerStoreName || "designerStore");
    const shopfloorApp = designerStore.appConfig;

    const stepTree = useMemo(() => {
      return getShopfloorAppStepTree(shopfloorApp);
    }, [shopfloorApp]);

    const onStepTreeNodeSelect = useCallback((event: RockEvent) => {
      const page = event.page;
      const [selectedKeys, {node}] = event.args as [string[], { node: StepTreeNode }];
      const isNodeSelected = selectedKeys.length !== 0;
      let selectedSetpId: string | null = null;
      if (isNodeSelected) {
        selectedSetpId = node.$id;

        designerStore.setDesignStage({
          type: "step",
          stepId: selectedSetpId,
        });

        const currentStep = designerStore.currentStep;
        if (currentStep) {
          sendDesignerCommand(page, designerStore, {
            name: "setPageConfig",
            payload: {
              pageConfig: {
                $id: "designPreviewPage",
                view: currentStep.children || [],
              }
            }
          });
        }
      }

    }, [designerStore]);

    if (!shopfloorApp) {
      return null;
    }

    const rockConfig: RockConfig = {
      $id: `${props.$id}-internal`,
      $type: "antdTree",
      fieldNames: { key: "$id", title: "label" },
      defaultExpandAll: true,
      treeData: stepTree,
      style: props.style,
      onSelect: {
        $action: "script",
        script: onStepTreeNodeSelect,
      } as RockEventHandlerScript,
    };

    return renderRock({context, rockConfig});
  },

  ...LinkshopBuilderStepsPanelMeta,
} as Rock;

function getShopfloorAppStepTree(shopfloorApp?: LinkshopAppRockConfig) {
  if (!shopfloorApp) {
    return [];
  }

  const componentTree: StepTreeNode[] = [];

  forEach(shopfloorApp.steps, (child: any) => {
    const step: LinkshopAppStepRockConfig = child;
    const stepNode: StepTreeNode = {
      $nodeType: "step",
      $id: step.$id!,
      $type: step.$type,
      label: step.$name || "",
    };

    componentTree.push(stepNode);
  })

  return componentTree;
}
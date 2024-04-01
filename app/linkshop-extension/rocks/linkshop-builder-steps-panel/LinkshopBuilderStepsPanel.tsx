import type { Rock, RockConfig, RockEvent, RockEventHandlerScript } from "@ruiapp/move-style";
import ShopfloorAppBuilderMeta from "./LinkshopBuilderStepsPanelMeta";
import type { LinkshopBuilderStepsPanelRockConfig } from "./linkshop-builder-steps-panel-types";
import { renderRock } from "@ruiapp/react-renderer";
import type { LinkshopAppRockConfig, LinkshopAppStepRockConfig } from "~/linkshop-extension/linkshop-types";
import { useCallback, useMemo } from "react";
import { find, forEach } from "lodash";
import type { LinkshopAppDesignerStore } from "~/linkshop-extension/stores/LinkshopAppDesignerStore";
import { DesignerStore, DesignerUtility } from "@ruiapp/designer-extension";


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
  Renderer(context, props: LinkshopBuilderStepsPanelRockConfig) {
    const { shopfloorApp } = props;

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

        const designerStore = page.getStore<DesignerStore>("designerStore");
        const linkshopAppDesignerStore = page.getStore<LinkshopAppDesignerStore>("linkshopAppDesignerStore");
        linkshopAppDesignerStore.setCurrentStepId(selectedKeys[0], selectedSetpId);

        const currentStep = linkshopAppDesignerStore.currentStep;
        if (currentStep) {
          DesignerUtility.sendDesignerCommand(page, designerStore, {
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

    }, []);

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

  ...ShopfloorAppBuilderMeta,
} as Rock;

function getShopfloorAppStepTree(shopfloorApp: LinkshopAppRockConfig) {
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
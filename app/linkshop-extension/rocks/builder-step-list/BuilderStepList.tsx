import type { Rock, RockConfig } from "@ruiapp/move-style";
import ShopfloorAppBuilderMeta from "./BuilderStepListMeta";
import type { ShopfloorAppBuilderRockConfig } from "./builder-step-list-types";
import { renderRock } from "@ruiapp/react-renderer";
import { LinkshopAppRockConfig, LinkshopAppStepRockConfig } from "~/linkshop-extension/linkshop-types";
import { useMemo } from "react";
import { forEach } from "lodash";


export type ComponentTreeNode = StepNode | ComponentNode | SlotNode;

export interface StepNode {
  $nodeType: "step";
  $id: string;
  $type?: string;
  label: string;
  children?: ComponentTreeNode[];
}

export interface ComponentNode {
  $nodeType: "component";
  $id: string;
  $type?: string;
  label: string;
  children?: ComponentTreeNode[];
}

export interface SlotNode {
  $nodeType: "slot";
  $id: string;
  $componentId: string;
  $slotName: string;
  label: string;
  children?: ComponentTreeNode[];
}

export default {
  Renderer(context, props: ShopfloorAppBuilderRockConfig) {
    const { shopfloorApp } = props;

    const componentTree = useMemo(() => {
      return getShopfloorAppStepTree(shopfloorApp);
    }, [shopfloorApp]);

    if (!shopfloorApp) {
      return null;
    }

    const rockConfig: RockConfig = {
      $id: `${props.$id}-internal`,
      $type: "antdTree",
      fieldNames: { key: "$id", title: "label" },
      defaultExpandAll: true,
      treeData: componentTree,
      style: props.style,
    };

    return renderRock({context, rockConfig});
  },

  ...ShopfloorAppBuilderMeta,
} as Rock;

function getShopfloorAppStepTree(shopfloorApp: LinkshopAppRockConfig) {
  const componentTree: ComponentTreeNode[] = [];

  forEach(shopfloorApp.children, (child: any) => {
    const step: LinkshopAppStepRockConfig = child;
    const stepNode: ComponentTreeNode = {
      $nodeType: "step",
      $id: step.$id!,
      $type: step.$type,
      label: step.name,
    };

    componentTree.push(stepNode);
  })
}
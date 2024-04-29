import type { Framework, Page, PageConfig, PageWithoutLayoutConfig, Rock, RockConfig, RockEvent, RockEventHandlerScript } from '@ruiapp/move-style';
import LinkshopBuilderComponentsPanelMeta from './LinkshopBuilderComponentsPanelMeta';
import type { LinkshopBuilderComponentsPanelRockConfig } from './linkshop-builder-components-panel-types';
import { renderRock } from '@ruiapp/react-renderer';
import { useCallback, useMemo } from 'react';
import type { LinkshopAppDesignerStore } from '~/linkshop-extension/stores/LinkshopAppDesignerStore';

export type ComponentTreeNode = ComponentNode | SlotNode;

export interface ComponentNode {
  $nodeType: 'component';
  $id: string;
  $type?: string;
  label: string;
  children?: ComponentTreeNode[];
}

export interface SlotNode {
  $nodeType: 'slot';
  $id: string;
  $componentId: string;
  $slotPropName: string;
  label: string;
  children?: ComponentTreeNode[];
}

export default {
  Renderer(context, props: LinkshopBuilderComponentsPanelRockConfig) {
    const { framework, page } = context;

    const { designerStoreName } = props;
    const designerStore = page.getStore<LinkshopAppDesignerStore>(designerStoreName || 'designerStore');

    const designingPage: Page = designerStore.page;
    const designingPageConfig = designingPage.getConfig();

    const componentTree = useMemo(() => convertPageConfigToComponentTree(framework, designingPageConfig), [framework, designingPageConfig]);

    const onComponentTreeNodeSelect: RockEventHandlerScript['script'] = useCallback(
      (event: RockEvent) => {
        const [selectedKeys, { node }] = event.args as [string[], { node: ComponentTreeNode }];
        const isNodeSelected = selectedKeys.length !== 0;
        let selectedComponentId: string | null = null;
        let selectedSlotPropName: string | null = null;
        if (isNodeSelected) {
          if (node.$nodeType === 'component') {
            selectedComponentId = node.$id;
            selectedSlotPropName = null;
          } else if (node.$nodeType === 'slot') {
            selectedComponentId = node.$componentId;
            selectedSlotPropName = node.$slotPropName;
          }
        }
        designerStore.setSelectedComponentTreeNode(selectedKeys[0], selectedComponentId, selectedSlotPropName);
      },
      [designerStore],
    );

    const onComponentTreeNodeDrop: RockEventHandlerScript['script'] = useCallback((event: RockEvent) => {
      const { event: dragEvent, node, dragNode } = event.args[0];
      console.log({
        dragEvent,
        node,
        dragNode,
      });
    }, []);

    const rockConfig: RockConfig = {
      $id: `${props.$id}-internal`,
      $type: 'antdTree',
      fieldNames: { key: '$id', title: 'label' },
      defaultExpandAll: true,
      treeData: componentTree,
      selectedKeys: [designerStore.selectedComponentTreeNodeId],
      style: props.style,
      onSelect: {
        $action: 'script',
        script: onComponentTreeNodeSelect,
      } as RockEventHandlerScript,
      onDrop: {
        $action: 'script',
        script: onComponentTreeNodeDrop,
      } as RockEventHandlerScript,
    };

    return renderRock({ context, rockConfig });
  },

  ...LinkshopBuilderComponentsPanelMeta,
} as Rock;

export function convertPageConfigToComponentTree(framework: Framework, pageConfig: PageConfig) {
  const componentTree: ComponentTreeNode[] = [];
  const rockTree = (pageConfig as PageWithoutLayoutConfig).view;
  travalRockTree(framework, rockTree, componentTree);
  return componentTree;
}

function travalRockTree(framework: Framework, rockTree: RockConfig[], componentTree: ComponentTreeNode[]) {
  for (const rock of rockTree) {
    const rockMeta = framework.getComponent(rock.$type);

    const rockLabel = rock.$name || rockMeta.name || rock.$type;
    const component: ComponentTreeNode = {
      $nodeType: 'component',
      $id: rock.$id!,
      $type: rock.$type,
      label: rockLabel,
    };

    if (rockMeta.slots) {
      if (!component.children) {
        component.children = [];
      }

      for (const slotPropName in rockMeta.slots) {
        const slotMeta = rockMeta.slots[slotPropName];
        let slotLabel = `#${slotPropName}`;
        if (slotMeta.name) {
          slotLabel += ` ${slotMeta.name}`;
        }
        const slotNode: ComponentTreeNode = {
          $nodeType: 'slot',
          $id: `${rock.$id}.${slotPropName}`,
          $componentId: rock.$id!,
          $slotPropName: slotPropName,
          label: slotLabel,
        };
        component.children.push(slotNode);

        const slotChildren = rock[slotPropName];
        if (slotChildren) {
          slotNode.children = [];
          if (Array.isArray(slotChildren)) {
            travalRockTree(framework, slotChildren, slotNode.children);
          } else {
            travalRockTree(framework, [slotChildren], slotNode.children);
          }
        }
      }
    }

    if (rock.children) {
      if (!component.children) {
        component.children = [];
      }

      if (Array.isArray(rock.children)) {
        travalRockTree(framework, rock.children, component.children);
      } else {
        travalRockTree(framework, [rock.children], component.children);
      }
    }
    componentTree.push(component);
  }
}

import { EventEmitter, Framework, IStore, Page, PageCommand, PageConfig, RockConfig, StoreConfigBase, StoreMeta } from "@ruiapp/move-style";
import type { LinkshopAppRockConfig } from "../linkshop-types";
import { cloneDeep, find, map } from "lodash";

export interface LinkshopAppStoreConfig extends StoreConfigBase {
  appConfig?: LinkshopAppRockConfig;
}

export class LinkshopAppDesignerStore implements IStore<LinkshopAppStoreConfig> {
  #emitter: EventEmitter;
  #name: string;
  appConfig?: LinkshopAppRockConfig;
  #page: Page;
  #currentStepTreeNodeId: string | null;
  #currentStepId: string | null;
  #selectedComponentTreeNodeId: string | null;
  #selectedComponentId: string | null;
  #selectedSlotPropName: string | null;
  #snippets: RockConfig[];

  constructor(framework: Framework) {
    this.#name = "";
    this.#emitter = new EventEmitter();

    this.#currentStepTreeNodeId = null;
    this.#currentStepId = null;
    this.#selectedComponentTreeNodeId = null;
    this.#selectedComponentId = null;
    this.#selectedSlotPropName = null;
    this.#snippets = [];

    this.#page = new Page(framework);
    this.#page.observe(() => {
      this.#emitter.emit("dataChange", null);
    });
  }

  get name(): string {
    return this.#name;
  }

  setConfig(storeConfig: LinkshopAppStoreConfig) {
    console.debug(`[RUI][LinkshopAppDesignerStore][${storeConfig.name}] LinkshopAppDesignerStore.setConfig()`)
    this.#name = storeConfig.name;
    if (storeConfig.appConfig) {
      this.setAppConfig(storeConfig.appConfig || {
        $type: "linkshopApp",
        steps: [],
      });
    }
  }

  setAppConfig(value: LinkshopAppRockConfig) {
    this.appConfig = value;
    this.#emitter.emit("dataChange", null);
  }

  get selectedSetpId(): string | null {
    return this.#currentStepId;
  }

  setCurrentStepId(nodeId: string, currentStepId: string) {
    if (!currentStepId) {
      return;
    }

    if (this.#currentStepId === currentStepId) {
      return;
    }

    this.#currentStepTreeNodeId = nodeId;
    this.#currentStepId = currentStepId;
    this.#emitter.emit("dataChange", null);
  }

  get currentStep() {
    if (!this.appConfig) {
      return null;
    }

    if (!this.#currentStepId) {
      return null;
    }

    const step = find(this.appConfig.steps, { $id: this.#currentStepId });
    return step;
  }

  setPageConfig(value: PageConfig) {
    this.#page.setConfig(value);
    this.#emitter.emit("dataChange", null);
  }

  setPropertyExpression(propName: string, propExpression: string) {
  }

  async loadData(input?: any): Promise<any> {
    return this.#page.loadData();
  }

  observe(callback: (data: any) => void) {
    this.#emitter.on("dataChange", callback);
  }

  get data() {
    return this.#page.getConfig();
  }

  get pageConfig(): PageConfig {
    return this.#page?.getConfig();
  }

  get page(): Page {
    return this.#page;
  }

  get selectedComponentTreeNodeId(): string | null {
    return this.#selectedComponentTreeNodeId;
  }

  get selectedComponentId(): string | null {
    return this.#selectedComponentId;
  }
  
  get selectedSlotPropName(): string | null {
    return this.#selectedSlotPropName;
  }

  setSelectedComponentTreeNode(nodeId: string | null, componentId: string | null, slotPropName: string | null) {
    this.#selectedComponentTreeNodeId = nodeId;
    this.#selectedComponentId = componentId;
    this.#selectedSlotPropName = slotPropName;
    this.#emitter.emit("dataChange", null);
  }

  processCommand(command: PageCommand) {
    if (command.name === "setPageConfig") {
      const { payload } = command;
      this.#page.setConfig(payload.pageConfig);

    } else if (command.name === "setComponentProperty") {
      const { payload } = command;
      this.#page.setComponentProperty(payload.componentId, payload.propName, payload.propValue);

    } else if (command.name === "setComponentPropertyExpression") {
      const { payload } = command;
      this.#page.setComponentPropertyExpression(payload.componentId, payload.propName, payload.propExpression);

    } else if (command.name === "removeComponentPropertyExpression") {
      const { payload } = command;
      this.#page.removeComponentPropertyExpression(payload.componentId, payload.propName);

    } else if (command.name === "addComponent") {
      const { payload } = command;
      const { componentType, parentComponentId, slotPropName, prevSiblingComponentId, defaultProps} = payload;
      const componentConfig: RockConfig = {
        $type: componentType,
        ...defaultProps,
      };

      // TODO: implement this: Generate id before add to page, so that we can support collaboration design.
      // if (!componentConfig.$id) {
      //   throw new Error("Component id MUST be set before added to page.");
      // }
      this.#page.addComponents([componentConfig], parentComponentId, slotPropName, prevSiblingComponentId);

    } else if (command.name === "removeComponents") {
      this.#page.removeComponents(command.payload.componentIds);
      this.setSelectedComponentTreeNode(null, null, null);

    } else if (command.name === "cutComponents") {
      const componentIds = command.payload.componentIds;
      if (!componentIds || !componentIds.length) {
        return;
      }
      this.#snippets = map(componentIds, componentId => this.#page.getComponent(componentId));
      this.#page.removeComponents(componentIds);
      this.setSelectedComponentTreeNode(null, null, null);

    } else if (command.name === "copyComponents") {
      const componentIds = command.payload.componentIds;
      if (!componentIds || !componentIds.length) {
        return;
      }
      this.#snippets = map(componentIds, componentId => cloneDeep(this.#page.getComponent(componentId)));

    } else if (command.name === "pasteComponents") {
      if (!this.#snippets || !this.#snippets.length) {
        return;
      }

      const { payload } = command;
      const { parentComponentId, slotPropName, prevSiblingComponentId } = payload;

      this.#page.addComponents(this.#snippets, parentComponentId, slotPropName, prevSiblingComponentId);
    }
  }
}

export default {
  type: "linkshopAppDesignerStore",
  store: LinkshopAppDesignerStore,
} as StoreMeta<LinkshopAppStoreConfig>;
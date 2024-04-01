import { EventEmitter, Framework, IStore, PageCommand, StoreConfigBase, StoreMeta } from "@ruiapp/move-style";
import type { LinkshopAppRockConfig } from "../linkshop-types";
import { find } from "lodash";
import { DesignerUtility } from "@ruiapp/designer-extension";

export interface LinkshopAppStoreConfig extends StoreConfigBase {
  appConfig?: LinkshopAppRockConfig;
}

export class LinkshopAppDesignerStore implements IStore<LinkshopAppStoreConfig> {
  #emitter: EventEmitter;
  #name: string;
  #currentStepTreeNodeId?: string;
  #currentStepId?: string;
  appConfig?: LinkshopAppRockConfig;

  constructor(framework: Framework) {
    this.#name = "";
    this.#emitter = new EventEmitter();
  }

  get name(): string {
    return this.#name;
  }

  setConfig(storeConfig: LinkshopAppStoreConfig) {
    console.debug(`[RUI][LinkshopAppDesignerStore][${storeConfig.name}] LinkshopAppDesignerStore.setConfig()`)
    this.#name = storeConfig.name;
    if (storeConfig.appConfig) {
      this.setAppConfig(storeConfig.appConfig);
    }
  }

  setAppConfig(value: LinkshopAppRockConfig) {
    this.appConfig = value;
    this.#emitter.emit("dataChange", null);
  }

  setPropertyExpression(propName: string, propExpression: string) {
  }

  async loadData(input?: any): Promise<any> {
  }

  observe(callback: (data: any) => void) {
    this.#emitter.on("dataChange", callback);
  }

  get data() {
    return this.appConfig;
  }

  get selectedSetpId(): string | undefined {
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

  processCommand(command: PageCommand) {
  }
}

export default {
  type: "linkshopAppDesignerStore",
  store: LinkshopAppDesignerStore,
} as StoreMeta<LinkshopAppStoreConfig>;
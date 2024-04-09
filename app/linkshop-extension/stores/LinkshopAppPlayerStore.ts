import { EventEmitter, Framework, IStore, Page, PageCommand, PageConfig, RockConfig, StoreConfigBase, StoreMeta } from '@ruiapp/move-style';
import type { LinkshopAppRockConfig } from '../linkshop-types';
import { cloneDeep, find, map } from 'lodash';
import { DesignStage } from '../designer-types';
import { UpdateEntityByIdOptions } from '@ruiapp/rapid-core';
import rapidApi from '~/rapidApi';

export interface LinkshopAppStoreConfig extends StoreConfigBase {
  appId?: string;
  appConfig?: LinkshopAppRockConfig;
}

export class LinkshopAppPlayerStore {
  #emitter: EventEmitter;
  #name: string;
  appId?: string;
  appConfig?: LinkshopAppRockConfig;
  #framework: Framework;
  #page: Page;
  #stage?: DesignStage;

  constructor(framework: Framework) {
    this.#name = '';
    this.#emitter = new EventEmitter();

    this.#framework = framework;
    this.#page = new Page(framework);
    this.#page.observe(() => {
      this.#emitter.emit('dataChange', null);
    });
  }

  get name(): string {
    return this.#name;
  }

  setConfig(storeConfig: LinkshopAppStoreConfig) {
    console.debug(`[RUI][LinkshopAppPlayerStore][${storeConfig.name}] LinkshopAppPlayerStore.setConfig()`);
    this.#name = storeConfig.name;
    if (storeConfig.appConfig) {
      this.setAppConfig(
        storeConfig.appConfig || {
          $type: 'linkshopApp',
          steps: [],
          stores: [],
        },
      );
    }

    this.appId = storeConfig.appId;
  }

  setAppConfig(value: LinkshopAppRockConfig) {
    this.appConfig = value;
    this.#emitter.emit('dataChange', null);
  }

  get selectedSetpId(): string | null {
    if (!this.#stage) {
      return null;
    }

    if (this.#stage.type === 'step') {
      return this.#stage.stepId;
    }

    return null;
  }

  get currentStep() {
    if (!this.appConfig) {
      return null;
    }

    const currentStage = this.#stage;
    if (!currentStage) {
      return null;
    }

    if (currentStage.type === 'step') {
      const step = find(this.appConfig.steps, { $id: currentStage.stepId });
      return step;
    }

    return null;
  }

  setPageConfig(value: PageConfig) {
    this.#page.setConfig(value);
    this.#emitter.emit('dataChange', null);
  }

  async loadData(input?: any): Promise<any> {
    return this.#page.loadData();
  }

  observe(callback: (data: any) => void) {
    this.#emitter.on('dataChange', callback);
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

  getSerializableConfig(): PageConfig {
    return this.#page?.getSerializableConfig();
  }
}

export default {
  type: 'linkshopAppPlayerStore',
  store: LinkshopAppPlayerStore,
} as any;

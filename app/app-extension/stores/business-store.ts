import {
  EventEmitter,
  Framework,
  HttpRequestOptions,
  IStore,
  MoveStyleUtils,
  Page,
  RuiModuleLogger,
  Scope,
  StoreConfigBase,
  StoreMeta,
} from "@ruiapp/move-style";
import lodash, { cloneDeep, find, set } from "lodash";
import { FindEntityOptions } from "@ruiapp/rapid-extension";

export interface BusinessStoreConfig extends StoreConfigBase, FindEntityOptions {
  type: "businessStore";
  url: string;
  baseUrl?: string;
  frozon?: boolean;
  fixedFilters?: FindEntityOptions["filters"];
  requestParamsAdapter?: string;
  responseDataAdapter?: string;
}

export class BusinessStore implements IStore<BusinessStoreConfig> {
  #framework: Framework;
  #logger: RuiModuleLogger;
  #page: Page;
  #scope: Scope;
  #name: string;
  #emitter: EventEmitter;
  #data?: any;
  #config: BusinessStoreConfig;
  #isLoading: boolean;

  constructor(framework: Framework, page: Page, scope: Scope) {
    this.#emitter = new EventEmitter();
    this.#framework = framework;
    this.#logger = framework.getLogger("store");
    this.#page = page;
    this.#scope = scope;
    this.#name = "";
    this.#isLoading = false;
    this.#config = {} as any;
  }

  get name(): string {
    return this.#name;
  }

  setConfig(storeConfig: BusinessStoreConfig) {
    this.#config = storeConfig;
    this.#name = storeConfig.name;
  }

  getConfig() {
    return this.#config;
  }

  setPropertyExpression(propName: string, propExpression: string) {
    if (!this.#config.$exps) {
      this.#config.$exps = {};
    }
    this.#config.$exps[propName] = propExpression;
  }

  setPagination(pagination: FindEntityOptions["pagination"]) {
    if (pagination) {
      Object.assign(this.#config, { pagination });
    } else {
      this.#config.pagination = null;
    }
  }

  setFrozon(frozon: boolean) {
    this.#config.frozon = frozon;
  }

  async loadData(input?: any): Promise<any> {
    this.#logger.debug(`Loading entity store data, name='${this.name}'`);
    if (this.#isLoading) {
      return;
    }

    this.#isLoading = true;

    const expressions = this.#config.$exps;
    const config: Partial<BusinessStoreConfig> = {
      fixedFilters: cloneDeep(this.#config.fixedFilters),
      filters: cloneDeep(this.#config.filters),
      orderBy: cloneDeep(this.#config.orderBy),
      properties: cloneDeep(this.#config.properties),
      pagination: cloneDeep(this.#config.pagination),
    };

    if (expressions) {
      for (const propName in expressions) {
        if (propName.startsWith("$")) {
          this.#logger.error(`System field can not bind to an expression. ${propName}=${expressions[propName]}`);
          continue;
        }
        const interpretedValue = this.#page.interpreteExpression(expressions[propName], {
          $scope: this.#scope,
        });
        set(config, propName, interpretedValue);
      }
    }

    if (config.frozon) {
      this.#isLoading = false;
      return;
    }

    const { url, baseUrl, requestParamsAdapter, responseDataAdapter } = this.#config || {};

    let requestData = {
      filters: config.filters,
      orderBy: config.orderBy,
      properties: config.properties,
      pagination: config.pagination,
    };

    if (input) {
      Object.assign(requestData, input);
    }

    const { fixedFilters } = config;
    if (fixedFilters && fixedFilters.length) {
      requestData.filters = [
        {
          operator: "and",
          filters: [...fixedFilters, ...(requestData.filters! || [])],
        },
      ];
    }

    if (requestParamsAdapter && typeof requestParamsAdapter === "string") {
      const adapter = requestParamsAdapter.trim();
      if (adapter.indexOf("function") === 0) {
        requestData = new Function(`return ${adapter}`)()(requestData, lodash);
      } else {
        requestData = new Function("params", "_", `${adapter}`)(requestData, lodash);
      }
    }

    const requestOptions: HttpRequestOptions<FindEntityOptions> = {
      method: "POST",
      url: baseUrl ? `${baseUrl}${url}` : url,
      data: requestData,
    };

    const response = await MoveStyleUtils.request(requestOptions);
    // TODO: should deal with response.statusCode
    // TODO: need something like ResponseDataTransformer.

    let data = response.data;
    if (responseDataAdapter && typeof responseDataAdapter === "string") {
      const adapter = responseDataAdapter.trim();
      if (adapter.indexOf("function") === 0) {
        data = new Function(`return ${adapter}`)()(data, lodash);
      } else {
        data = new Function("data", "_", `${adapter}`)(data, lodash);
      }
    }

    this.#data = data;
    this.#isLoading = false;
    this.#emitter.emit("dataChange", data);

    return data;
  }

  observe(callback: (data: any) => void): void {
    this.#emitter.on("dataChange", callback);
  }

  get data() {
    return this.#data;
  }
}

export default {
  type: "businessStore",
  store: BusinessStore,
} as StoreMeta<BusinessStoreConfig>;

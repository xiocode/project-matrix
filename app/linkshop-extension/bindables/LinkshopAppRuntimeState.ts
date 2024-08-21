import { Bindable, BindableBase, BindableManager, BindableMeta, BindableObjectMeta } from "@ruiapp/data-binding-extension";
import { LinkshopAppVariables, linkshopAppVariablesProxyHandler } from "./LinkshopAppVariables";
import type { LinkshopAppVariableConfig } from "../linkshop-types";

export type LinkshopAppRuntimeStateConfig = {
  variables: LinkshopAppVariableConfig[];
};

export class LinkshopAppRuntimeState extends BindableBase<BindableMeta, any> implements Bindable {
  static _bindableMeta: BindableMeta = {
    type: "object",
    fields: [],
  };

  #variables: LinkshopAppVariables;
  #_variables: LinkshopAppVariables;

  constructor(manager: BindableManager, config: LinkshopAppRuntimeStateConfig) {
    super(manager, LinkshopAppRuntimeState._bindableMeta, {
      variables: [],
    });

    this.#variables = new LinkshopAppVariables(manager, config.variables);
    this.#_variables = new Proxy(this.#variables, linkshopAppVariablesProxyHandler);
  }

  get _bindableMeta() {
    const variablesMetaFields = (this.#variables._bindableMeta as BindableObjectMeta).fields;
    const meta: BindableMeta = {
      type: "object",
      fields: [
        {
          fieldName: "variables",
          meta: {
            type: "object",
            name: "应用变量",
            writable: false,
            fields: variablesMetaFields,
          },
        },
        {
          fieldName: "timeElapsedOnApp",
          meta: {
            type: "integer",
            name: "消耗时间",
            writable: true,
          },
        },
      ],
    };

    return meta;
  }

  get variables() {
    return this.#_variables;
  }

  addVariable(variableConfig: LinkshopAppVariableConfig) {
    this.#variables.addVariable(variableConfig);
  }

  setVariables(variablesConfig: LinkshopAppVariableConfig[]) {
    this.#variables.setVariables(variablesConfig);
  }
}

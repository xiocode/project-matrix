import { Bindable, BindableBase, BindableManager, BindableMeta } from "@ruiapp/data-binding-extension";
import type { LinkshopAppVariableConfig } from "../linkshop-types";

function convertBindableMetaFromVariableConfig(variableConfig: LinkshopAppVariableConfig) {
  return {
    type: variableConfig.type,
    name: variableConfig.name,
    writable: true,
  } as BindableMeta;
}

export class LinkshopAppVariable extends BindableBase<BindableMeta, any> implements Bindable {
  #variableConfig: LinkshopAppVariableConfig;

  static _bindableMeta: BindableMeta = {
    // TODO: convert type
    type: "string",
  };

  constructor(manager: BindableManager, variableConfig: LinkshopAppVariableConfig) {
    super(manager, convertBindableMetaFromVariableConfig(variableConfig), variableConfig.defaultValue);
    this.#variableConfig = variableConfig;
  }
}

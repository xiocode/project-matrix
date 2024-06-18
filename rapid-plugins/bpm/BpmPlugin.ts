/**
 * Sequence plugin
 */

import type { IRpdServer, RapidPlugin, RpdApplicationConfig, RpdConfigurationItemOptions, RpdServerPluginConfigurableTargetOptions, RpdServerPluginExtendingAbilities } from "@ruiapp/rapid-core";
import pluginActionHandlers from "./actionHandlers";
import pluginEntityWatchers from "./entityWatchers";
import pluginModels from "./models";
import pluginRoutes from "./routes";
import BpmService from "./BpmService";


class BpmPlugin implements RapidPlugin {
  #bpmService!: BpmService;

  get code(): string {
    return "bpmService";
  }

  get description(): string {
    return "";
  }

  get extendingAbilities(): RpdServerPluginExtendingAbilities[] {
    return [];
  }

  get configurableTargets(): RpdServerPluginConfigurableTargetOptions[] {
    return [];
  }

  get configurations(): RpdConfigurationItemOptions[] {
    return [];
  }

  async registerActionHandlers(server: IRpdServer): Promise<any> {
    for (const actionHandler of pluginActionHandlers) {
      server.registerActionHandler(this, actionHandler);
    }
  }

  async registerEventHandlers(server: IRpdServer): Promise<any> {
    for (const entityWatcher of pluginEntityWatchers)
    server.registerEntityWatcher(entityWatcher);
  }

  async configureModels(server: IRpdServer, applicationConfig: RpdApplicationConfig): Promise<any> {
    server.appendApplicationConfig({ models: pluginModels });
  }

  async configureServices(server: IRpdServer, applicationConfig: RpdApplicationConfig): Promise<any> {
    this.#bpmService = new BpmService(server);
    server.registerService("bpmService", this.#bpmService);
  }

  async configureRoutes(server: IRpdServer, applicationConfig: RpdApplicationConfig): Promise<any> {
    server.appendApplicationConfig({ routes: pluginRoutes });
  }

  async onApplicationLoaded(server: IRpdServer, applicationConfig: RpdApplicationConfig) {
  }

  get bpmService() {
    return this.#bpmService;
  }
}

export default BpmPlugin;

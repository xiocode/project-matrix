import type { ActionHandlerContext, IRpdServer, RapidPlugin, RpdApplicationConfig, RpdConfigurationItemOptions, RpdHttpMethod, RpdRoute, RpdServerPluginConfigurableTargetOptions, RpdServerPluginExtendingAbilities } from "@ruiapp/rapid-core";

import pluginActionHandlers from "./actionHandlers";


export interface ServerOperation {
  code: string;
  method: RpdHttpMethod;
  handler: (ctx: ActionHandlerContext) => Promise<void>;
}

export interface ServerOperationPluginInitOptions {
  operations: ServerOperation[];
}

class ServerOperationPlugin implements RapidPlugin {
  #operations: ServerOperation[];

  constructor(options: ServerOperationPluginInitOptions) {
    this.#operations = options.operations || [];
  }

  get code(): string {
    return "authManager";
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

  async initPlugin(server: IRpdServer): Promise<any> {
  }

  async registerMiddlewares(server: IRpdServer): Promise<any> {
  }

  async registerActionHandlers(server: IRpdServer): Promise<any> {
    for (const actionHandler of pluginActionHandlers) {
      server.registerActionHandler(this, actionHandler);
    }
  }

  async registerEventHandlers(server: IRpdServer): Promise<any> {
  }

  async registerMessageHandlers(server: IRpdServer): Promise<any> {
  }

  async registerTaskProcessors(server: IRpdServer): Promise<any> {
  }

  async onLoadingApplication(server: IRpdServer, applicationConfig: RpdApplicationConfig): Promise<any> {
  }

  async configureModels(server: IRpdServer, applicationConfig: RpdApplicationConfig): Promise<any> {
  }

  async configureModelProperties(server: IRpdServer, applicationConfig: RpdApplicationConfig): Promise<any> {
  }

  async configureRoutes(server: IRpdServer, applicationConfig: RpdApplicationConfig): Promise<any> {
    const routes: RpdRoute[] = [];
    for (const operation of this.#operations) {
      routes.push({
        namespace: "app",
        name: `app.operations.${operation.code}`,
        code: `app.operations.${operation.code}`,
        type: "RESTful",
        method: operation.method,
        endpoint: `/app/${operation.code}`,
        actions: [
          {
            code: "runServerOperation",
            config: {
              operation: operation.handler,
            }
          },
        ],
      })
    }
    server.appendApplicationConfig({ routes });
  }

  async onApplicationLoaded(server: IRpdServer, applicationConfig: RpdApplicationConfig): Promise<any> {
  }

  async onApplicationReady(server: IRpdServer, applicationConfig: RpdApplicationConfig): Promise<any> {
  }
}

export default ServerOperationPlugin;

import type { EventAction, Framework, Page, Scope } from "@ruiapp/move-style";

export interface RockEventHandlerReloadPage {
  $action: "reloadPage";
}

export async function reloadPage(eventName: string, framework: Framework, page: Page, scope: Scope, sender: any, eventHandler: RockEventHandlerReloadPage, eventArgs: any) {
  location.reload();
}

export default {
  name: "reloadPage",
  handler: reloadPage,
} as EventAction<RockEventHandlerReloadPage>;
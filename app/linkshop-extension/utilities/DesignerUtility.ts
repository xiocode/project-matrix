import type { IPage, PageCommand } from "@ruiapp/move-style";
import type { LinkshopAppDesignerStore } from "../stores/LinkshopAppDesignerStore";

export function sendDesignerCommand(designerPage: IPage, designerStore: LinkshopAppDesignerStore, command: PageCommand) {
  console.debug("sendDesignerCommand", command);

  designerStore.processCommand(command);

  const targetWindow = (document.getElementById("previewIFrame") as HTMLIFrameElement).contentWindow!;
  targetWindow.postMessage(command, "*");
}
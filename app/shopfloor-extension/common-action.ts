import { RockInstanceContext } from "@ruiapp/move-style";
import { IScanPayload } from "~/linkshop-extension/rocks/linkshop-scanner-provider/LinkshopScannerProvider";

export function scan(context: RockInstanceContext, payload: IScanPayload) {
  context.page.sendComponentMessage("linkshopScannerProvider", {
    name: "scan",
    payload,
  });
}

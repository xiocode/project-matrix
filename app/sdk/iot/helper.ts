import {IRpdServer} from "@ruiapp/rapid-core";
import IotSDK from "~/sdk/iot/sdk";

class IotHelper {
  private server: IRpdServer;

  constructor(server: IRpdServer) {
    this.server = server;
  }

  public async NewAPIClient() {
    return new IotSDK({
      baseURL: ""
    });
  }

}

export default IotHelper;

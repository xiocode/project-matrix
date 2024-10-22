import {IRpdServer} from "@ruiapp/rapid-core";
import IotDBSDK from "~/sdk/iotdb/sdk";

class IotDBHelper {
  private server: IRpdServer;

  constructor(server: IRpdServer) {
    this.server = server;
  }

  public async NewAPIClient() {
    return new IotDBSDK({
      baseURL: ""
    });
  }
}


export interface IotDBQueryInput {
  sql: string,
}

export interface IotDBQueryOutput {
  expressions: string[],
  column_names: string[],
  timestamps: number[],
  values: any[],
}

export default IotDBHelper;

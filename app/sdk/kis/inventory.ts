import KingdeeSDK from "~/sdk/kis/api";

export interface WarehouseInPayload {
  Object: {
    Head: {
      FBillerID: number;
      FBillNo: string;
      FCheckDate: string;
      FCheckerID: number;
      Fdate: string;
      FDCStockID: number;
      FDeptID: number;
      FFManagerID: number;
      FManageType: number;
      FMultiCheckStatus: string;
      FPosterID: number;
      FSManagerID: number;
      FTranType: number;
      FROB: number;
    };
    Entry: Array<{
      Famount: number;
      FAuxPropID: number;
      Fauxqty: number;
      FAuxQtyMust: number;
      FBatchNo: string;
      FDCSPID: number;
      FDCStockID: number;
      FEntryID: number;
      FICMOBillNo: string;
      FICMOInterID: number;
      FItemID: number;
      FKFDate: string;
      FKFPeriod: number;
      FMTONo: string;
      Fnote: string;
      FPeriodDate: string;
      FPlanAmount: number;
      FPlanMode: number;
      FPPBomEntryID: number;
      FQty: number;
      FQtyMust: number;
      FSecCoefficient: number;
      FSecQty: number;
      FSnList: Array<{
        FSerialNum: string;
        FSerialDesc: string;
      }>;
      FSourceBillNo: string;
      FSourceEntryID: number;
      FSourceInterId: number;
      FSourceTranType: number;
      FUnitID: number;
    }>;
  };
}

export interface WarehouseOutPayload {
  Object: {
    Head: {
      FAcctID: number;
      FBackFlushed: any;
      FBillerID: number;
      FBillNo: string;
      FCheckDate: string;
      FCheckerID: number;
      Fdate: string;
      FDeptID: number;
      FFManagerID: number;
      FManageType: number;
      FPosterID: number;
      FPurposeID: number;
      FSCStockID: number;
      FSManagerID: number;
      FTranType: number;
      Fuse: string;
      FWBINTERID: number;
      FROB: number;
    };
    Entry: Array<{
      Famount: number;
      FAuxPropID: number;
      Fauxqty: number;
      FAuxQtyMust: number;
      FBatchNo: string;
      FBomInterID: number;
      FCostCenterID: number;
      FCostObjGroupID: number;
      FCostOBJID: number;
      FDCSPID: number;
      FEntryID: number;
      FICMOBillNo: string;
      FICMOInterID: number;
      FInStockID: number;
      FItemID: number;
      FKFDate: any;
      FKFPeriod: number;
      FMTONo: string;
      Fnote: string;
      FOperID: number;
      FOperSN: number;
      FPeriodDate: any;
      FPlanAmount: number;
      FPlanMode: number;
      FPPBomEntryID: number;
      FQty: number;
      FQtyMust: number;
      FReProduceType: number;
      FSCStockID: number;
      FSecCoefficient: number;
      FSecQty: number;
      FSnList: Array<{
        FSerialNum: string;
        FSerialDesc: string;
      }>;
      FSourceBillNo: string;
      FSourceEntryID: number;
      FSourceInterId: number;
      FSourceTranType: number;
      FUnitID: number;
    }>;
  };
}

export interface WarehouseTransferPayload {
  Object: {
    Head: {
      FBillerID: number;
      FBillNo: string;
      FCheckDate: string;
      FCheckerID: number;
      Fdate: string;
      FDeptID: number;
      FFManagerID: number;
      FManageType: number;
      FMultiCheckStatus: string;
      FPosterID: number;
      FSManagerID: number;
      FTranType: number;
      FROB: number;
    };
    Entry: Array<{
      Famount: number;
      FAuxPropID: number;
      Fauxqty: number;
      FAuxQtyMust: number;
      FBatchNo: string;
      FDCSPID: number;
      FDCStockID: number;
      FEntryID: number;
      FICMOBillNo: string;
      FICMOInterID: number;
      FItemID: number;
      FKFDate: string;
      FKFPeriod: number;
      FMTONo: string;
      Fnote: string;
      FPeriodDate: string;
      FPlanAmount: number;
      FPlanMode: number;
      FPPBomEntryID: number;
      FQty: number;
      FQtyMust: number;
      FSecCoefficient: number;
      FSecQty: number;
      FSnList: Array<{
        FSerialNum: string;
        FSerialDesc: string;
      }>;
      FSourceBillNo: string;
      FSourceEntryID: number;
      FSourceInterId: number;
      FSourceTranType: number;
      FUnitID: number;
    }>;
  };
}

interface ApiResponse<T> {
  errorCode: number;
  description: string;
  data: T;
}

interface WarehouseResponseData {
  FID: number;
  FBillNo: string;
}

class KisInventoryOperationAPI {
  private api!: KingdeeSDK;

  constructor(api: KingdeeSDK) {
    this.api = api;
  }

  // Utility function to pause execution
  private sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Retry mechanism for API requests
  private async retryApiRequest<T>(url: string, payload: object, retries: number = 3): Promise<ApiResponse<T>> {
    let attempts = 0;
    while (attempts < retries) {
      const response = await this.api.PostResourceRequest(url, payload);
      if (response.data.errcode === 0) {
        return response.data as ApiResponse<T>;
      }
      console.log(`API request failed (attempt ${attempts + 1}):`, response.data);
      attempts += 1;
      await this.sleep(2000); // Wait before retrying
    }
    throw new Error(`Failed to fetch data from ${url} after ${retries} attempts`);
  }

  // 产成品入库单
  public async createProductReceipt(payload: WarehouseInPayload): Promise<ApiResponse<WarehouseResponseData>> {
    const url = "/koas/app007104/api/productreceipt/create";
    return await this.retryApiRequest<WarehouseResponseData>(url, payload);
  }

  // 生产领料单
  public async createPickingList(payload: WarehouseOutPayload): Promise<ApiResponse<WarehouseResponseData>> {
    const url = "/koas/app007104/api/pickinglist/create";
    return await this.retryApiRequest<WarehouseResponseData>(url, payload);
  }

  // 外购入库单
  public async createPurchaseReceipt(payload: WarehouseInPayload): Promise<ApiResponse<WarehouseResponseData>> {
    const url = "/koas/app007104/api/purchasereceipt/create";
    return await this.retryApiRequest<WarehouseResponseData>(url, payload);
  }

  // 销售出库单
  public async createSalesDelivery(payload: WarehouseOutPayload): Promise<ApiResponse<WarehouseResponseData>> {
    const url = "/koas/app007104/api/salesdelivery/create";
    return await this.retryApiRequest<WarehouseResponseData>(url, payload);
  }

  // 调拨单
  public async createStockTransfer(payload: WarehouseTransferPayload): Promise<ApiResponse<WarehouseResponseData>> {
    const url = "/koas/app007104/api/stocktransfer/create";
    return await this.retryApiRequest<WarehouseResponseData>(url, payload);
  }

  // 委外加工入库单
  public async createSubcontractReceipt(payload: WarehouseInPayload): Promise<ApiResponse<WarehouseResponseData>> {
    const url = "/koas/app007104/api/subcontractreceipt/create";
    return await this.retryApiRequest<WarehouseResponseData>(url, payload);
  }

  // 其他入库
  public async createMiscellaneousReceipt(payload: WarehouseInPayload): Promise<ApiResponse<WarehouseResponseData>> {
    const url = "/koas/app007104/api/miscellaneousreceipt/create";
    return await this.retryApiRequest<WarehouseResponseData>(url, payload);
  }

  // 其他出库
  public async createMiscellaneousDelivery(payload: WarehouseOutPayload): Promise<ApiResponse<WarehouseResponseData>> {
    const url = "/koas/app007104/api/miscellaneousdelivery/create";
    return await this.retryApiRequest<WarehouseResponseData>(url, payload);
  }


}

export default KisInventoryOperationAPI;

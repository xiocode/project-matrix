import KingdeeSDK from "~/sdk/kis/api";
import {ActionHandlerContext, IRpdServer, UpdateEntityByIdOptions} from "@ruiapp/rapid-core";
import KisHelper from "~/sdk/kis/helper";
import {
  BaseEmployee,
  BaseLocation,
  BaseMaterial,
  BaseMaterialCategory, BasePartner,
  BasePartnerCategory,
  BaseUnit,
  SaveBaseEmployeeInput, SaveBaseLocationInput,
  SaveBaseMaterialCategoryInput,
  SaveBaseMaterialInput,
  SaveBasePartnerInput,
  SaveBaseUnitInput,
  SaveMomGoodTransferInput, SaveMomInventoryApplicationInput, SaveMomInventoryApplicationItemInput,
  SaveMomInventoryOperationInput,
  SaveMomWarehouseInput,
} from "~/_definitions/meta/entity-types";

interface SyncOptions {
  url: string;
  singularCode?: string;
  mapToEntity: (item: any) => Promise<any>;
  filter?: (item: any) => boolean;
  payload?: any;
  syncAll?: boolean | true;
}

class KisDataSync {
  private api!: KingdeeSDK;
  private server: IRpdServer;
  private ctx: ActionHandlerContext;
  private materialCategories: BaseMaterialCategory[] = [];
  private partnerCategories: BasePartnerCategory[] = [];
  private units: BaseUnit[] = [];

  constructor(server: IRpdServer, ctx: ActionHandlerContext) {
    this.server = server;
    this.ctx = ctx;
  }

  // Initialize API client
  public async initialize() {
    this.api = await new KisHelper(this.server).NewAPIClient();
  }

  // Load base data for categories and units
  private async loadBaseData() {
    await Promise.all([this.loadMaterialCategories(), this.loadPartnerCategories(), this.loadUnits()]);
  }

  private async loadMaterialCategories() {
    this.materialCategories = await this.loadEntities("base_material_category");
  }

  private async loadPartnerCategories() {
    this.partnerCategories = await this.loadEntities("base_partner_category", {});
  }

  private async loadUnits() {
    this.units = await this.loadEntities("base_unit");
  }

  private async loadEntities(entityName: string, options: object = {
    filters: [{
      operator: "notNull",
      field: "externalCode"
    }]
  }) {
    const entityManager = this.server.getEntityManager(entityName);
    return await entityManager.findEntities(options);
  }

  // Utility function to pause execution
  private sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Retry mechanism for API requests
  private async retryApiRequest(url: string, payload: any, retries: number = 3): Promise<any> {
    let attempts = 0;
    while (attempts < retries) {
      const response = await this.api.PostResourceRequest(url, payload);
      if (response.data.errcode === 0) {
        return response;
      }
      console.error(`API request failed (attempt ${attempts + 1}):`, response.data);
      attempts += 1;
      await this.sleep(2000); // Wait before retrying
    }
    throw new Error(`Failed to fetch data from ${url} after ${retries} attempts`);
  }

  // Fetch paginated list from the API
  private async fetchListPages(options: SyncOptions): Promise<any[]> {
    const results: any[] = [];
    let page = 1;
    const pageSize = 100;

    if (!options.payload) {
      options.payload = {}
    }

    try {
      while (true) {
        const response = await this.retryApiRequest(options.url, {
          CurrentPage: page,
          ItemsOfPage: pageSize,
          ...options.payload,
        });

        const data = response.data.data;

        console.log(`URL: ${options.url}, Payload: ${JSON.stringify(options.payload, null, 2)}, Current Page: ${page} Current Page: ${data?.TotalItems}, Page Size: ${pageSize}, Total Pages: ${data?.TotalPage || data?.TotalPages || 1}`);

        if (data?.GoodItemStocks?.length) {
          results.push(...data.GoodItemStocks);
        }
        if (data?.List?.length) {
          results.push(...data.List);
        }

        if (options.syncAll) {
          const totalPage = data?.TotalPage || data?.TotalPages || 1;
          if (page >= totalPage) break;
        }

        await this.sleep(500);

        page += 1;
      }
    } catch (e) {
      console.error(e);
    }

    return results;
  }

  // Fetch detail page from the API
  private async fetchDetailPages(options: SyncOptions): Promise<any[]> {

    const results: any[] = [];

    try {
      const chunks = this.chunkArray(options?.payload?.ItemIds, 20); // Split itemIds into chunks of 20

      for (const chunk of chunks) {
        const response = await this.retryApiRequest(options.url, {ItemIds: chunk});
        const data = response.data.data;
        if (data.GoodItemStocks && data.GoodItemStocks.length) {
          results.push(...data.GoodItemStocks);
        }
        if (data.List && data.List.length) {
          results.push(...data.List);
        }
      }
    } catch (e) {
      console.error(e);
    }

    return results;
  }

  private async syncEntities(options: SyncOptions, isLoadDetail: boolean = false) {
    const data = isLoadDetail ? await this.fetchDetailPages(options) : await this.fetchListPages(options);
    console.log(`Fetched ${data.length} items from ${options.url}`)
    const filteredData = options.filter ? data.filter(options.filter) : data;
    console.log(`Filtered ${filteredData.length} items from ${options.url}`)
    const entities = (await Promise.all(filteredData.map(options.mapToEntity))).filter(item => item != null);
    console.log(`Mapped ${entities.length} items from ${options.url}`)
    const entityManager = options.singularCode ? this.server.getEntityManager(options.singularCode) : null;

    for (const entity of entities) {
      try {
        if (!entityManager) break;
        isLoadDetail ? await entityManager.updateEntityById(entity) : await entityManager.createEntity({entity});
      } catch (e: any) {
        if (e.code === '23505') {
          console.error(`Entity with code ${entity.code} already exists or id ${entity.id} updated`);
        } else {
          console.error(e);
        }
      }
    }
    this.ctx.logger.info(`${options.singularCode} entities ${isLoadDetail ? 'detail' : 'list'} synced`);
  }

  // Utility function to split an array into chunks
  private chunkArray(array: any[], chunkSize: number): any[][] {
    const results: any[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      results.push(array.slice(i, chunkSize + i));
    }
    return results;
  }

  // Create sync function for general entities
  private createListSyncFunction(options: SyncOptions) {
    return async () => {
      await this.syncEntities(options, false);
    };
  }

  // Create sync function for detailed entities
  private createDetailSyncFunction(options: SyncOptions) {
    return async () => {
      await this.syncEntities(options, true);
    };
  }

  // Main sync function to synchronize all entities
  public async syncBaseData() {
    if (!this.api) {
      throw new Error("API client is not initialized");
    }

    await this.loadBaseData();

    const syncFunctions = [
      //  同步单位
      this.createListSyncFunction({
        url: "/koas/APP006992/api/MeasureUnit/List",
        singularCode: "base_unit",
        mapToEntity: async (item: any) => ({
          code: item.FNumber,
          name: item.FName,
          externalCode: item.FItemID,
          type: 'others',
          orderNum: 1,
          category: {id: 1}
        } as SaveBaseUnitInput)
      }),
      // 同步物料分类
      this.createListSyncFunction({
        url: "/koas/APP006992/api/Material/List",
        singularCode: "base_material_category",
        mapToEntity: async (item: any) => {
          const parentId = this.materialCategories.find(cat => cat.externalCode === String(item.FParentID))?.id;

          let entity = {
            code: item.FNumber,
            name: item.FName,
            externalCode: item.FItemID,
            orderNum: 1,
          } as SaveBaseMaterialCategoryInput

          if (parentId) {
            entity.parent = {id: parentId};
          }
        },
        payload: {Detail: false},
      }),
      // 同步物料
      this.createListSyncFunction({
        url: "/koas/APP006992/api/Material/List",
        singularCode: "base_material",
        mapToEntity: async (item: any) => {
          const category = this.materialCategories.find(cat => cat.externalCode === String(item.FParentID));
          if (!category) return null;
          return {
            code: item.FNumber,
            name: item.FName,
            externalCode: item.FItemID,
            state: 'enabled',
            category: {id: category?.id},
          } as SaveBaseMaterialInput;
        },
        payload: {Detail: true},
        filter: (item: any) => item.FParentID !== 0
      }),
      // 同步员工
      this.createListSyncFunction({
        url: "/koas/APP006992/api/Employee/List",
        singularCode: "base_employee",
        mapToEntity: async (item: any) => {
          return {
            code: item.FNumber,
            name: item.FName,
            externalCode: item.FItemID,
            state: 'normal',
          } as SaveBaseEmployeeInput;
        },
      }),
      // 同步合作伙伴（供应商）
      this.createListSyncFunction({
        url: "/koas/APP006992/api/Vendor/List",
        singularCode: "base_partner",
        mapToEntity: async (item: any) => {
          const category = this.partnerCategories.find(cat => cat.code === 'supplier');
          if (!category) return null;

          return {
            code: item.FNumber,
            name: item.FName,
            externalCode: item.FItemID,
            categories: category ? [{id: category.id}] : [],
          } as SaveBasePartnerInput;
        },
        filter: (item: any) => item.FParentID !== 0
      }),
      // 同步合作伙伴（客户）
      this.createListSyncFunction({
        url: "/koas/APP006992/api/Customer/List",
        singularCode: "base_partner",
        mapToEntity: async (item: any) => {
          const category = this.partnerCategories.find(cat => cat.code === 'customer');
          if (!category) return null;

          return {
            code: item.FNumber,
            name: item.FName,
            externalCode: item.FItemID,
          } as SaveBasePartnerInput;
        },
      }),
      // 同步仓库
      this.createListSyncFunction({
        url: "/koas/APP006992/api/Stock/List",
        singularCode: "mom_warehouse",
        mapToEntity: async (item: any) => {
          return {
            code: item.FNumber,
            name: item.FName,
            externalCode: item.FItemID,
            orderNum: 1,
            state: 'enabled',
          } as SaveMomWarehouseInput;
        },
      }),
      this.createListSyncFunction({
        url: "/koas/APP006992/api/Stock/List",
        singularCode: "base_location",
        mapToEntity: async (item: any) => {
          return {
            code: item.FNumber,
            name: item.FName,
            externalCode: item.FItemID,
            type: 'warehouse',

          } as SaveBaseLocationInput;
        },
        filter: (item: any) => item.FParentID === 0
      }),
    ];

    for (const syncListFunction of syncFunctions) {
      await syncListFunction();
    }

    const materials = await this.server.getEntityManager("base_material").findEntities({
      filters: [{operator: "notNull", field: "externalCode"}],
    });

    const materialIds = materials.map((material: BaseMaterial) => material.externalCode);

    const syncDetailFunctions = [
      this.createDetailSyncFunction({
        url: "/koas/APP006992/api/Material/GetListDetails",
        singularCode: "base_material",
        mapToEntity: async (item: any) => ({
          id: materials.find(material => material.externalCode === String(item.FItemID))?.id,
          entityToSave: {
            specification: item.FModel,
            defaultUnit: {
              id: item.FUnitID ? this.units.find(unit => unit.externalCode === String(item.FUnitID))?.id : null,
            },
          },
        } as UpdateEntityByIdOptions),
        payload: {ItemIds: materialIds}
      }),
    ];

    for (const syncDetailFunction of syncDetailFunctions) {
      await syncDetailFunction();
    }
  }

  public async syncInventoryData() {
    if (!this.api) {
      throw new Error("API client is not initialized");
    }


    const materials: BaseMaterial[] = await this.server.getEntityManager("base_material").findEntities({
      filters: [{operator: "notNull", field: "externalCode"}],
      properties: ["id", "externalCode", "defaultUnit"],
    });

    const warehouses: BaseLocation[] = await this.server.getEntityManager("mom_warehouse").findEntities({
      filters: [{operator: "notNull", field: "externalCode"}],
    });

    const warehouseLocations: BaseLocation[] = await this.server.getEntityManager("base_location").findEntities({
      filters: [{operator: "notNull", field: "externalCode"}],
    });


    const momInventoryManager = this.server.getEntityManager("mom_inventory_operation")

    const result = await momInventoryManager.createEntity(
      {
        entity: {
          approvalState: 'uninitiated',
          approveState: 'uninitiated',
          businessType: 3,
          code: `KIS-${new Date().getTime()}`,
          operationType: 'in',
          state: 'processing',
        } as SaveMomInventoryOperationInput
      }
    )

    const syncFunctions = materials.flatMap(material =>
      warehouses.map(warehouse =>
        this.createListSyncFunction({
          url: "/koas/APP002112/uereport/UEStockController/GetItemStockInfors",
          singularCode: "mom_good_transfer",
          mapToEntity: async (item: any) => ({
            operation: {id: result.id},
            material: {id: material?.id},
            lotNum: item.GBatchNo,
            quantity: item.GAvailableNum,
            unit: {id: material?.defaultUnit?.id},
            to: {id: warehouseLocations.find(location => location.externalCode === warehouse.externalCode)?.id},
          } as SaveMomGoodTransferInput),
          payload: {Data: {GItemID: material.externalCode, GStockID: warehouse.externalCode}},
          syncAll: false,
        })
      )
    );

    // const syncFunctions = [
    //   this.createListSyncFunction({
    //     url: "/koas/APP002112/uereport/UEStockController/GetItemStockInfors",
    //     singularCode: "mom_good_transfer",
    //     mapToEntity: async (item: any) => {
    //       const material = materials.find(material => material.externalCode === String(item.GItemID));
    //       if (!material) {
    //         console.log(`Material not found for item ${item.GItemID}`)
    //         return null;
    //       }
    //
    //       return {
    //         operation: {id: result.id},
    //         material: {id: material?.id},
    //         lotNum: item.GBatchNo,
    //         quantity: item.GAvailableNum,
    //         unit: {id: material?.defaultUnit?.id},
    //         to: {id: warehouseLocations.find(location => location.externalCode === String(item.FStockID))?.id},
    //       } as SaveMomGoodTransferInput
    //     },
    //     payload: {Data: {}}
    //   }),
    // ]


    for (const syncListFunction of syncFunctions) {
      await syncListFunction();
    }

  }


  public async syncInventoryNotify() {
    if (!this.api) {
      throw new Error("API client is not initialized");
    }

    const [materials, employees, partners] = await Promise.all([
      this.server.getEntityManager("base_material").findEntities({
        filters: [{ operator: "notNull", field: "externalCode" }],
        properties: ["id", "externalCode", "defaultUnit"],
      }),
      this.server.getEntityManager("base_employee").findEntities({
        filters: [{ operator: "notNull", field: "externalCode" }],
      }),
      this.server.getEntityManager("base_partner").findEntities({
        filters: [{ operator: "notNull", field: "externalCode" }],
      }),
    ]);

    const materialMap = new Map(materials.map(material => [material.externalCode, material]));
    const employeeMap = new Map(employees.map(employee => [employee.externalCode, employee]));
    const partnerMap = new Map(partners.map(partner => [partner.externalCode, partner]));

    const syncFunctions = [
      this.createListSyncFunction({
        url: "/koas/app007140/api/materialreceiptnotice/list",
        singularCode: "mom_inventory_application",
        mapToEntity: async (item: any) => {
          const { Entry, Head } = item;
          const entities = Entry.map((entry: any) => {
            const material = materialMap.get(String(entry.FItemID));
            return {
              material,
              lotNum: entry.FBatchNo,
              quantity: entry.Fauxqty,
              unit: { id: material?.defaultUnit?.id },
              trackingCode: entry.FKFPeriod,
            } as SaveMomInventoryApplicationItemInput;
          });

          const items = entities.map((entity: SaveMomInventoryApplicationItemInput) => ({
            ...entity,
          }));

          return {
            code: Head.FBillNo,
            contractNum: Head.FHeadSelfP0338,
            businessType: 1, // 采购入库
            supplier: { id: partnerMap.get(String(Head.FSupplyID))?.id },
            applicant: { id: employeeMap.get(String(Head.FEmpID))?.id },
            operationType: 'in',
            state: 'processing',
            items,
          } as SaveMomInventoryApplicationInput;
        },
        payload: {
          OrderBy: {
            Property: "Fdate",
            Type: "Desc",
          },
        },
      }),
    ];

    try {
      await Promise.all(syncFunctions.map(syncFunc => syncFunc()));
    } catch (error) {
      console.error("Error during inventory sync:", error);
    }
  }
}

export default KisDataSync;

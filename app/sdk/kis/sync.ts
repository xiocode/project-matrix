import KingdeeSDK from "~/sdk/kis/api";
import {IRpdServer, UpdateEntityByIdOptions} from "@ruiapp/rapid-core";
import KisHelper from "~/sdk/kis/helper";
import {
  BaseMaterial,
  BaseMaterialCategory, BaseUnit,
  SaveBaseMaterialCategoryInput,
  SaveBaseMaterialInput,
  SaveBaseUnitInput,
} from "~/_definitions/meta/entity-types";

interface SyncOptions {
  url: string;
  singularCode: string;
  mapToEntity: (item: any) => Promise<any>;
  filter?: (item: any) => boolean;
  payload?: any;
}

class KisDataSync {
  private api!: KingdeeSDK;
  private server: IRpdServer;
  private categories: BaseMaterialCategory[] = [];
  private units: BaseUnit[] = [];

  constructor(server: IRpdServer) {
    this.server = server;
  }

  public async initialize() {
    this.api = await new KisHelper(this.server).NewAPIClient();
  }

  private async loadBaseData() {
    await Promise.all([this.loadCategories(), this.loadUnits()]);
  }

  private async loadCategories() {
    const categoryEntityManager = this.server.getEntityManager("base_material_category");
    this.categories = await categoryEntityManager.findEntities({
      filters: [{operator: "ne", field: "externalCode", value: null}],
    });
    console.log("Categories loaded:", this.categories);
  }

  private async loadUnits() {
    const unitEntityManager = this.server.getEntityManager("base_unit");
    this.units = await unitEntityManager.findEntities({
      filters: [{operator: "ne", field: "externalCode", value: null}],
    });
    console.log("Units loaded:", this.units);
  }

  private sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async fetchListPages(url: string, payload: any = {}): Promise<any[]> {
    const results: any[] = [];
    let page = 1;
    const pageSize = 100;
    let hasNextPage = true;

    while (hasNextPage) {
      const response = await this.api.PostResourceRequest(url, {
        ...payload,
        CurrentPage: page,
        ItemsOfPage: pageSize,
        Data: {},
      });

      if (response.data.errcode !== 0) {
        console.error(response.data);
        break;
      }

      console.log(`URL: ${url}, Page Size: ${pageSize}, Total Pages: ${response.data?.data.TotalPages}`);

      results.push(...response.data.data.List);
      hasNextPage = response.data.data.HasNextPage;
      page += 1;

      if (hasNextPage) {
        await this.sleep(2000);
      }
    }

    return results;
  }

  private async fetchDetailPage(url: string, payload: object = {}): Promise<any[]> {
    const results: any[] = [];
    const response = await this.api.PostResourceRequest(url, payload);

    if (response.data.errcode !== 0) {
      console.error(response.data);
      return results;
    }

    results.push(...response.data.data.List);
    return results;
  }

  private async syncEntities({url, singularCode, mapToEntity, filter, payload}: SyncOptions) {
    const data = await this.fetchListPages(url, payload);
    const filteredData = filter ? data.filter(filter) : data;
    const entities = (await Promise.all(filteredData.map(mapToEntity))).filter((item) => item != null);
    const entityManager = this.server.getEntityManager(singularCode);

    for (const entity of entities) {
      try {
        await entityManager.createEntity({entity});
      } catch (e: any) {
        if (e.code === '23505') {
          console.error(`Entity with code ${entity.code} already exists`);
        } else {
          console.error(e);
        }
      }
    }

    console.log(`${singularCode} entities synced:`, entities);
  }

  private async syncDetailEntities({url, singularCode, mapToEntity, filter, payload}: SyncOptions) {
    const data = await this.fetchDetailPage(url, payload);
    const filteredData = filter ? data.filter(filter) : data;
    const entities: UpdateEntityByIdOptions[] = (await Promise.all(filteredData.map(mapToEntity))).filter((item) => item != null);
    const entityManager = this.server.getEntityManager(singularCode);

    for (const entity of entities) {
      try {
        await entityManager.updateEntityById(entity);
      } catch (e: any) {
        if (e.code === '23505') {
          console.error(`Entity id ${entity.id} updated`);
        } else {
          console.error(e);
        }
      }
    }

    console.log(`${singularCode} entities synced:`, entities);
  }

  private createSyncFunction(
    url: string,
    singularCode: string,
    mapToEntity: (item: any) => Promise<any>,
    filter?: (item: any) => boolean,
    payload: any = {}
  ) {
    return async () => {
      await this.syncEntities({url, singularCode, mapToEntity, filter, payload});
    };
  }

  private createDetailSyncFunction(
    url: string,
    singularCode: string,
    mapToEntity: (item: any) => Promise<any>,
    filter?: (item: any) => boolean,
    payload: any = {},
  ) {
    return async () => {
      await this.syncDetailEntities({url, singularCode, mapToEntity, filter, payload});
    };
  }

  public async syncAll() {
    await this.loadBaseData();

    const syncFunctions = [
      this.createSyncFunction(
        "/koas/APP006992/api/MeasureUnit/List",
        "base_unit",
        async (item: any) => ({
          code: item.FNumber,
          name: item.FName,
          externalCode: item.FItemID,
          type: 'others',
          orderNum: 1,
        } as SaveBaseUnitInput)
      ),
      this.createSyncFunction(
        "/koas/APP006992/api/Material/List",
        "base_material_category",
        async (item: any) => ({
          code: item.FNumber,
          name: item.FName,
          externalCode: item.FItemID,
          orderNum: 1,
        } as SaveBaseMaterialCategoryInput),
        (item: any) => item.FParentID === 0
      ),
      this.createSyncFunction(
        "/koas/APP006992/api/Material/List",
        "base_material",
        async (item: any) => {
          const category = this.categories.find((cat) => cat.externalCode === item.FParentID as string);
          if (!category) return null;

          return {
            code: item.FNumber,
            name: item.FName,
            externalCode: item.FItemID,
            state: 'enabled',
            category: {id: category.id},
          } as SaveBaseMaterialInput;
        },
        (item: any) => item.FParentID !== 0
      ),
    ];

    for (const syncFunction of syncFunctions) {
      await syncFunction();
    }

    const materials = await this.server.getEntityManager("base_material").findEntities({
      filters: [{operator: "ne", field: "externalCode", value: null}],
    });

    const materialIds = materials.map((material: BaseMaterial) => material.externalCode);

    const syncDetailFunctions = [
      this.createDetailSyncFunction(
        "/koas/APP006992/api/Material/GetListDetails",
        "base_material",
        async (item: any) => ({
          id: item.id,
          entityToSave: {
            defaultUnit: {
              id: item.FUnitID ? this.units.find((unit) => unit.externalCode === item.FUnitID)?.id : null,
            },
          },
        } as UpdateEntityByIdOptions),
        (item: any) => item.FParentID !== 0,
        {ItemIds: materialIds},
      ),
    ];

    for (const syncDetailFunction of syncDetailFunctions) {
      await syncDetailFunction();
    }
  }
}

export default KisDataSync;

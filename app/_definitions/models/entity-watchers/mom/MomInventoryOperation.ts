import type { EntityWatchHandlerContext, EntityWatcher, IRpdServer } from "@ruiapp/rapid-core";
import { MomInventoryBusinessType, type BaseLot, type MomInventory, type MomInventoryOperation, type SaveBaseLotInput } from "~/_definitions/meta/entity-types";

export default [
  {
    eventName: "entity.update",
    modelSingularCode: "mom_inventory_operation",
    handler: async (ctx: EntityWatchHandlerContext<"entity.update">) => {
      const { server, payload } = ctx;
      const changes: Partial<MomInventoryOperation> = payload.changes;
      const after = payload.after;
      if (after.operationType === "in") {
        if (changes.hasOwnProperty('state') && changes.state === "done") {
          const transfers = await server.queryDatabaseObject(
            `select * from mom_good_transfers where operation_id=$1;`,
            [after.id]
            );

          const businessTypeManager = server.getEntityManager<MomInventoryBusinessType>('mom_inventory_business_type');
          const businessType = await businessTypeManager.findById(after.business_id);

          for (const transfer of transfers) {
            // 生成批次信息
            await saveMaterialLotInfo(server, {
              lotNum: transfer.lot_num,
              material: { id: transfer.material_id },
              sourceType: businessType?.config?.defaultSourceType || null,
              qualificationState: businessType?.config?.defaultQualificationState || "qualified",
              isAOD: false,
            });
          }
        }

        if (changes.hasOwnProperty('approvalState') && changes.approvalState === "approved") {
          const transfers = await server.queryDatabaseObject(
            `select * from mom_good_transfers where operation_id=$1;`,
            [after.id]
            );

          const inventoryManager = server.getEntityManager<MomInventory>('mom_inventory');

          for (const transfer of transfers) {
            // 更新库存量
            let inventory = await inventoryManager.findEntity({
              filters: [
                {
                  operator: 'eq',
                  field: 'material_id',
                  value: transfer.material_id,
                },
                {
                  operator: 'eq',
                  field: 'tags',
                  value: transfer.tags || "",
                },
              ]
            })

            if (!inventory) {
              await inventoryManager.createEntity({
                entity: {
                  material: { id: transfer.material_id },
                  unit: transfer.unit_id,
                  lotNum: transfer.lot_num || "",
                  tags: transfer.tags || "",
                  allocableQuantity: transfer.quantity,
                  availableQuantity: transfer.quantity,
                  instockQuantity: transfer.quantity,
                  purchasedQuantity: 0,
                  intransitQuantity: 0,
                  processingQuantity: 0,
                  processedQuantity: 0,
                  yieldQuantity: 0,
                  reservedQuantity: 0,
                  allocatedQuantity: 0,
                  shippingQuantity: 0,
                  deliveredQuantity: 0,
                } as Partial<MomInventory>
              });
            } else {
              await inventoryManager.updateEntityById({
                id: inventory.id,
                entityToSave: {
                  allocableQuantity: inventory.allocableQuantity + transfer.quantity,
                  availableQuantity: inventory.availableQuantity + transfer.quantity,
                  instockQuantity: inventory.instockQuantity + transfer.quantity,
                } as Partial<MomInventory>
              });
            }
          }
        }
      }

      if (after.operationType === "out") {
        if (!changes.hasOwnProperty('approvalState') || changes.approvalState !== "approved") {
          return;
        }

        const transfers = await server.queryDatabaseObject(
          `select * from mom_good_transfers where operation_id=$1;`,
          [after.id]
          );

        const inventoryManager = server.getEntityManager<MomInventory>('mom_inventory');

        for (const transfer of transfers) {
          let inventory = await inventoryManager.findEntity({
            filters: [
              {
                operator: 'eq',
                field: 'material_id',
                value: transfer.material_id,
              },
              {
                operator: 'eq',
                field: 'tags',
                value: transfer.tags || "",
              },
            ]
          })

          if (!inventory) {
            await inventoryManager.createEntity({
              entity: {
                material: { id: transfer.material_id },
                unit: transfer.unit_id,
                lotNum: transfer.lot_num || "",
                tags: transfer.tags || "",
                allocableQuantity: 0,
                availableQuantity: 0,
                instockQuantity: 0,
                purchasedQuantity: 0,
                intransitQuantity: 0,
                processingQuantity: 0,
                processedQuantity: 0,
                yieldQuantity: 0,
                reservedQuantity: 0,
                allocatedQuantity: 0,
                shippingQuantity: 0,
                deliveredQuantity: 0,
              } as Partial<MomInventory>
            });
          } else {
            await inventoryManager.updateEntityById({
              id: inventory.id,
              entityToSave: {
                allocableQuantity: (inventory.allocableQuantity || 0) - transfer.quantity,
                availableQuantity: (inventory.availableQuantity || 0) - transfer.quantity,
                instockQuantity: (inventory.instockQuantity || 0) - transfer.quantity,
              } as Partial<MomInventory>
            });
          }
        }
      }
    }
  },
] satisfies EntityWatcher<any>[];



async function saveMaterialLotInfo(server: IRpdServer, lot: SaveBaseLotInput) {
  if (!lot.lotNum || !lot.material || !lot.material.id) {
    throw new Error('lotNum and material are required when saving lot info.');
  }

  const baseLotManager = server.getEntityManager<BaseLot>("base_lot");
  const lotInDb = await baseLotManager.findEntity({
    filters: [
      {
        operator: 'eq',
        field: 'lot_num',
        value: lot.lotNum,
      },
      {
        operator: 'eq',
        field: 'material_id',
        value: lot.material.id,
      },
    ]
  });

  if (!lotInDb) {
    await baseLotManager.createEntity({
      entity: lot,
    });
  }
}
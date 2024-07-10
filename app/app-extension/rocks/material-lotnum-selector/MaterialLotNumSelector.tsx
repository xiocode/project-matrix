import type { Rock, RockConfig } from "@ruiapp/move-style";
import { FindEntityOptions } from "@ruiapp/rapid-extension";
import { renderRock } from "@ruiapp/react-renderer";
import dayjs from "dayjs";
import { find, get } from "lodash";
import rapidAppDefinition from "~/rapidAppDefinition";

export default {
  $type: "materialLotNumSelector",

  propertyPanels: [],

  onInit(context, props) {
    const entity = rapidAppDefinition.entities.find((entity) => entity.code === "MomWarehouseStrategy");
    const store = {
      name: "momWarehouseStrategyList",
      type: "entityStore",
      entityModel: entity,
      properties: ["id", "materialCategory", "warehouse", "businessType", "strategy", "enabled", "qualifiedFilter", "validityFilter"],
    };

    context.scope.addStore(store);
    context.scope.stores[store.name]?.loadData();
  },

  Renderer(context, props: Record<string, any>) {
    const { materialId, businessTypeId, materialCategoryId } = props;

    let fixedFilters: FindEntityOptions["filters"] = [
      {
        field: "onHandQuantity",
        operator: "gt",
        value: 0
      }
    ];

    if (materialId) {
      fixedFilters.push({
        field: "material",
        operator: "exists",
        filters: [
          {
            field: "id",
            operator: "eq",
            value: materialId,
          },
        ],
      });
    }

    const warehouseStrategies = get(context.scope.getStore("momWarehouseStrategyList"), "data.list") || [];
    const currentStrategy = find(warehouseStrategies, (s) => s.businessType?.id === businessTypeId && s.materialCategory?.id === materialCategoryId);

    if (currentStrategy?.qualifiedFilter) {
      fixedFilters.push({
        field: "qualificationState",
        operator: "eq",
        value: "qualified",
      });
    }

    // TODO: 关联字段排序
    // if (currentStrategy?.validityFilter) {
    //   fixedFilters.push({
    //     field: "lot.validityDate",
    //     operator: "gte",
    //     value: dayjs().endOf("day").format(),
    //   });
    // }

    let orderBy: { field: string; desc?: boolean }[] = [];
    if (currentStrategy?.strategy === "fifo") {
      orderBy = [{field: "createdAt", desc: true}];
    }
    // } else if (currentStrategy?.strategy === "fdfo") {
    //   orderBy = [{ field: "lot.validityDate", desc: true }];
    // }

    const rockConfig: RockConfig = {
      $id: `${props.$id}_${materialId}_lot_list`,
      $type: "tableSingleSelector",
      labelKey: "lotNum",
      valueKey: "lotNum",
      searchFields: ["lotNum"],
      dropdownMatchSelectWidth: 600,
      columns: [
        {
          title: "批次号",
          code: "lotNum",
          width: 120,
          fixed: "left",
        },
        {
          title: "入库时间",
          code: "createdAt",
          width: 180,
          render: `_.get(record, 'createdAt') && dayjs(_.get(record, 'createdAt')).format('YYYY-MM-DD')`,
        },
        {
          title: "检验状态",
          code: "lot.qualificationState",
          width: 120,
          render: (record: any) => {
            switch (record.lot.qualificationState) {
              case "uninspected":
                return "待检";
              case "qualified":
                return "合格";
              case "unqualified":
                return "不合格";
            }
          },
        },
        {
          title: "有效期",
          code: "lot.validityDate",
          width: 120,
          render: `_.get(record, 'lot.validityDate') && dayjs(_.get(record, 'lot.validityDate')).format('YYYY-MM-DD')`,
        },
      ],
      requestConfig: {
        url: `/mom/mom_material_lot_inventory_balances/operations/find`,
        params: {
          fixedFilters,
          orderBy,
          properties: ["id", "lotNum", "material", "createdAt", "lot"],
        },
      },
      value: props.value,
      onChange: props.onChange,
    };

    return renderRock({ context, rockConfig });
  },
} as Rock;

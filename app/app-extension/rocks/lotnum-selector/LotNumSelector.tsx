import type { Rock, RockConfig } from "@ruiapp/move-style";
import type { FindEntityOptions } from "@ruiapp/rapid-extension";
import { renderRock } from "@ruiapp/react-renderer";
import { get, isPlainObject } from "lodash";
import rapidAppDefinition from "~/rapidAppDefinition";

export default {
  $type: "lotNumSelector",

  propertyPanels: [],

  onInit(context, props) {
    const entity = rapidAppDefinition.entities.find((entity) => entity.code === "MomWarehouseStrategy");

    const store = {
      name: "momWarehouseStrategyList",
      type: "entityStore",
      entityModel: entity,
      properties: ["id", "materialCategory", "warehouse", "businessType", "strategy", "enabled", "qualifiedFilter", "validityFilter"],
      fixedFilters: [
        {
          field: "enabled",
          operator: "eq",
          value: true,
        },
      ],
    };

    context.scope.addStore(store);
    context.scope.stores[store.name]?.loadData();
  },

  Renderer(context, props: Record<string, any>) {
    const { materialId } = props;

    let fixedFilters: FindEntityOptions["filters"] = [];

    if (materialId) {
      fixedFilters.push({
        field: "material",
        operator: "exists",
        filters: [
          {
            field: "id",
            operator: "eq",
            value: isPlainObject(materialId) ? get(materialId, "id") : materialId,
          },
        ],
      });
    }

    let orderBy: { field: string; desc?: boolean }[] = [];

    const rockConfig: RockConfig = {
      $id: `${props.$id}_${materialId}_lot_list`,
      $type: "rapidEntityTableSelect",
      listTextFieldName: "lotNum",
      listValueFieldName: "lotNum",
      listFilterFields: ["lotNum"],
      placeholder: "请选择",
      searchPlaceholder: "批次号搜索",
      allowClear: true,
      disabled: props?.disabled,
      dropdownMatchSelectWidth: 300,
      columns: [
        {
          title: "批次号",
          code: "lotNum",
          width: 180,
          fixed: "left",
        },
      ],
      entityCode: "BaseLot",
      requestParams: {
        fixedFilters,
        orderBy,
        properties: ["id", "lotNum", "material", "createdAt"],
      },
      value: props.value,
      onChange: props.onChange,
    };

    return renderRock({ context, rockConfig });
  },
} as Rock;

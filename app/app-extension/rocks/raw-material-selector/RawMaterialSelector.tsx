import type { Rock, RockConfig } from "@ruiapp/move-style";
import type { FindEntityOptions } from "@ruiapp/rapid-extension";
import { renderRock } from "@ruiapp/react-renderer";
import { get } from "lodash";
import rapidAppDefinition from "~/rapidAppDefinition";

export default {
  $type: "rawMaterialSelector",

  propertyPanels: [],

  onInit(context, props) {
    const entity = rapidAppDefinition.entities.find((entity) => entity.code === "MomMaterialBreakdown");
    const store = {
      name: "MomMaterialBreakdownList",
      type: "entityStore",
      entityModel: entity,
      properties: ["id", "material", "version", "unit", "state"],
      fixedFilters: [
        {
          field: "material",
          operator: "exists",
          filters: [
            {
              field: "id",
              operator: "eq",
              value: props?.$exps?.materialId,
            },
          ],
        },
      ],
    };

    context.scope.addStore(store);
    context.scope.stores[store.name]?.loadData();
  },

  Renderer(context, props: Record<string, any>) {
    let fixedFilters: FindEntityOptions["filters"] = [];
    let orderBy: { field: string; desc?: boolean }[] = [];
    const materialBreakdownList = get(context.scope.getStore("MomMaterialBreakdownList"), "data.list") || [];
    const materialBreakdownId = materialBreakdownList[0]?.id;

    if (materialBreakdownId) {
      fixedFilters.push({
        field: "materialBreakdown",
        operator: "exists",
        filters: [
          {
            field: "id",
            operator: "eq",
            value: materialBreakdownId,
          },
        ],
      });
    }

    const rockConfig: RockConfig = {
      $id: `${props.$id}_${props?.$exps.materialId}_${materialBreakdownId}_raw_list`,
      $type: "rapidEntityTableSelect",
      listTextFieldName: "subMaterial.name",
      listValueFieldName: "subMaterial.id",
      listFilterFields: ["subMaterial.code", "subMaterial.name"],
      placeholder: "请选择",
      searchPlaceholder: "原材料搜索",
      allowClear: true,
      disabled: props?.disabled,
      dropdownMatchSelectWidth: 300,
      columns: [
        {
          title: "编码",
          code: "subMaterial.code",
          width: 180,
          render: (record: any) => {
            return `${record.subMaterial.code}`;
          },
        },
        {
          title: "名称",
          code: "subMaterial.name",
          width: 180,
          render: (record: any) => {
            return `${record.subMaterial.name}`;
          },
        },
      ],
      entityCode: "MomMaterialBreakdownPart",
      requestParams: {
        fixedFilters,
        orderBy,
        properties: ["id", "materialBreakdown", "createdAt", "version", "quantity", "unit", "subMaterial"],
      },
      value: props.value,
      onChange: props.onChange,
    };

    return renderRock({ context, rockConfig });
  },
} as Rock;

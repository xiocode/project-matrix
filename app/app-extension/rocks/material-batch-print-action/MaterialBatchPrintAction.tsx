import { RockChildrenConfig, type Rock } from "@ruiapp/move-style";
import { renderRockChildren } from "@ruiapp/react-renderer";
import MaterialBatchPrintActionMeta from "./MaterialBatchPrintActionMeta";
import type { MaterialBatchPrintActionRockConfig } from "./material-batch-print-action-types";
import { find, get, merge } from "lodash";
import { rapidAppDefinition } from "@ruiapp/rapid-extension";
import dayjs from "dayjs";

export default {
  Renderer(context, props) {
    const selectedRecords = get(context.scope.vars, "selectedRecords") || [];

    const getDataSource = () => {
      return selectedRecords.map((record: any) => {
        const createdAt = get(record, "createdAt");
        const validityDate = get(record, "validityDate");
        const dictionaries = rapidAppDefinition.getDataDictionaries();
        const dictionary = find(dictionaries, (d) => d.code === "QualificationState");
        const qualificationStateInfo = find(get(dictionary, "entries"), (e) => e.value === get(record, "lot.qualificationState"));

        return merge({}, record, {
          materialName: get(record, "material.name"),
          materialCode: get(record, "material.code"),
          materialSpecification: get(record, "material.specification"),
          lotNum: get(record, "lot.lotNum"),
          createdAt: createdAt && dayjs(createdAt).format("YYYY-MM-DD HH:mm:ss"),
          validityDate: validityDate && dayjs(validityDate).format("YYYY-MM-DD"),
          currentTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
          unit: get(record, "unit.name"),
          qualificationState: get(qualificationStateInfo, "name"),
        });
      });
    };

    const rockChildrenConfig: RockChildrenConfig = [
      {
        $type: "antdButton",
        disabled: !selectedRecords.length,
        children: {
          $type: "text",
          text: `打印标识卡`,
        },
        onClick: [
          {
            $action: "script",
            script: () => {
              context.page.sendComponentMessage(`${props.$id}_print_trigger`, { name: "print" });
            },
          },
        ],
      },
      {
        $type: "printTrigger",
        $id: `${props.$id}_print_trigger`,
        dataSource: getDataSource,
        printTemplateCode: "materialIdentificationCard",
      },
    ];

    return renderRockChildren({ context, rockChildrenConfig });
  },

  ...MaterialBatchPrintActionMeta,
} as Rock<MaterialBatchPrintActionRockConfig>;

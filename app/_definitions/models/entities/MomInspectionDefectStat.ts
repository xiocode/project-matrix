import type { TDictionaryCodes } from "../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "mom",
  code: "MomInspectionDefect",
  name: "缺陷记录",
  description: "用来记录对某个检验单所检样本的缺陷数量的统计信息。",
  fields: [
    {
      code: "sheet",
      name: "检验单",
      type: "relation",
      targetSingularCode: "mom_inspection_sheet",
      targetIdColumnName: "sheet_id",
    },
    {
      code: "defect",
      name: "缺陷",
      type: "relation",
      targetSingularCode: "mom_inspection_defect",
      targetIdColumnName: "defect_id",
    },
    {
      code: "sampleAmount",
      name: "样本数量",
      type: "integer",
    },
    {
      code: "defectAmount",
      name: "缺陷数量",
      type: "integer",
    },
  ],
};

export default entity;

import type { TDictionaryCodes } from "../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "app",
  code: "BpmApplication",
  name: "业务申请单",
  fields: [
    {
      code: "process",
      name: "业务流程",
      type: "relation",
      required: true,
      targetSingularCode: "bpm_process",
      targetIdColumnName: "process_id",
    },
    {
      code: "code",
      name: "申请单号",
      type: "text",
      required: true,
    },
    {
      code: "title",
      name: "标题",
      type: "text",
      required: true,
    },
    {
      code: "formData",
      name: "表单数据",
      type: "json",
    },
    {
      code: "initiator",
      name: "发起人",
      type: "relation",
      targetSingularCode: "oc_user",
      targetIdColumnName: "initiator_id",
    },
    {
      code: "initiatedAt",
      name: "发起时间",
      type: "datetime",
    },
    {
      code: "approvedAt",
      name: "批准时间",
      type: "datetime",
    },
    {
      code: "state",
      name: "流程状态",
      type: "option",
      dataDictionary: "BusinessApplicationState",
      required: true,
    },
  ],
};

export default entity;

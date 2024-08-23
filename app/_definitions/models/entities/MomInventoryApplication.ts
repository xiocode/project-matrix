import type { TDictionaryCodes } from "../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";
import type {PropertySequenceConfig} from "@ruiapp/rapid-core";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "mom",
  code: "MomInventoryApplication",
  name: "库存业务申请",
  fields: [
    {
      code: "code",
      name: "申请单号",
      type: "text",
      config: {
        sequence: {
          enabled: true,
          config: {
            segments: [
              {
                type: "literal",
                content: "WA-"
              },
              {
                type: "year",
                length: 4,
              },
              {
                type: "month",
                length: 2,
                padding: "0",
              },
              {
                type: "dayOfMonth",
                length: 2,
                padding: "0",
              },
              {
                type: "autoIncrement",
                scope: "",
                period: "day",
                length: 3,
              },
            ],
          },
        } satisfies PropertySequenceConfig,
      },
    },
    {
      code: "operationType",
      name: "库存操作类型",
      type: "option",
      dataDictionary: "MomInventoryOperationType",
      required: true,
    },
    {
      code: "businessType",
      name: "业务类型",
      type: "relation",
      targetSingularCode: "mom_inventory_business_type",
      targetIdColumnName: "business_id",
    },
    {
      code: "applicant",
      name: "申请人",
      type: "relation",
      targetSingularCode: "oc_user",
      targetIdColumnName: "applicant_id",
    },
    {
      code: "items",
      name: "明细项",
      type: "relation[]",
      targetSingularCode: "mom_inventory_application_item",
      selfIdColumnName: "operation_id",
    },
    {
      code: "state",
      name: "申请状态",
      type: "option",
      dataDictionary: "BusinessApplicationState",
      required: true,
    },
    {
      code: "extra",
      name: "其它信息",
      type: "json",
    },
    {
      code: "contractNum",
      name: "合同号",
      type: "text",
    },
    {
      code: "from",
      name: "转出仓库",
      type: "relation",
      targetSingularCode: "base_location",
      targetIdColumnName: "from_warehouse_id",
    },
    {
      code: "to",
      name: "转入仓库",
      type: "relation",
      targetSingularCode: "base_location",
      targetIdColumnName: "to_warehouse_id",
    },
    {
      code: "supplier",
      name: "供应商",
      type: "relation",
      targetSingularCode: "base_partner",
      targetIdColumnName: "partner_id",
    },
    {
      code: "customer",
      name: "客户",
      type: "relation",
      targetSingularCode: "base_partner",
      targetIdColumnName: "customer_id",
    },
    {
      code: "operationState",
      name: "库存操作状态",
      type: "option",
      dataDictionary: "MomInventoryOperationState",
    },
    {
      code: "source",
      name: "来源",
      type: "option",
      dataDictionary: "MomApplicationSource",
      defaultValue: "manual",
    },
    {
      code: "processInstance",
      name: "流程实例",
      type: "relation",
      targetSingularCode: "bpm_instance",
      targetIdColumnName: "process_instance_id",
    },
    {
      code: "externalCode",
      name: "外部编号",
      type: "text",
    },
  ],
};

export default entity;

import type { TDictionaryCodes } from "../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "mom",
  code: "MomEquipment",
  name: "设备",
  fields: [
    {
      code: "code",
      name: "设备号",
      type: "text",
      required: true,
    },
    {
      code: "name",
      name: "名称",
      type: "text",
      required: true,
    },
    {
      code: "category",
      name: "分类",
      type: "relation",
      targetSingularCode: "mom_equipment_category",
      targetIdColumnName: "category_id",
      required: true,
    },
    {
      code: "state",
      name: "状态",
      type: "option",
      dataDictionary: "EnabledDisabledState",
      required: true,
    },
    {
      code: "powerState",
      name: "电源状态",
      type: "option",
      dataDictionary: "MomEquipmentPowerState",
      required: false,
    },
    {
      code: "productionState",
      name: "生产状态",
      type: "option",
      dataDictionary: "MomEquipmentProductionState",
      required: false,
    },
    {
      code: "planedDailyWorkingTime",
      name: "计划每日工作时间",
      type: "integer",
    },
    {
      code: "station",
      name: "所在工位",
      type: "relation",
      targetSingularCode: "mom_station",
      targetIdColumnName: "station_id",
    },
  ],
};

export default entity;

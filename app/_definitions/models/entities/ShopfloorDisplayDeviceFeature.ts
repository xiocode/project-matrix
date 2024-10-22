import type { TDictionaryCodes } from "../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "shopfloor",
  code: "ShopfloorDisplayDeviceFeature",
  name: "车间配置系统-显示设备",
  fields: [
    {
      code: "displayDevice",
      name: "显示设备",
      type: "relation",
      targetSingularCode: "shopfloor_display_device",
      targetIdColumnName: "display_device_id",
    },
    {
      code: "process",
      name: "关联工序",
      type: "relation",
      targetSingularCode: "mom_process",
      targetIdColumnName: "process_id",
    },
    {
      code: "app",
      name: "关联应用",
      type: "relation",
      targetSingularCode: "shopfloor_app",
      targetIdColumnName: "app_id",
    },
    {
      code: "factory",
      name: "工厂",
      type: "relation",
      targetSingularCode: "mom_factory",
      targetIdColumnName: "factory_id",
    },
    {
      code: "printTemplate",
      name: "打印模版",
      type: "relation",
      targetSingularCode: "mom_print_template",
      targetIdColumnName: "template_id",
    },
    {
      code: "config",
      name: "配置",
      type: "json",
    },
  ],
};

export default entity;

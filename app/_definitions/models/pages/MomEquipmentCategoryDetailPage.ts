import {cloneDeep} from "lodash";
import type {RapidEntityFormRockConfig, RapidPage} from "@ruiapp/rapid-extension";

const formConfig: Partial<RapidEntityFormRockConfig> = {
  items: [
    {
      type: "auto",
      code: "code",
    },
    {
      type: "auto",
      code: "name",
    },
    // {
    //   type: "auto",
    //   code: "nominal",
    // },
    // {
    //   type: "auto",
    //   code: "upperLimit",
    // },
    // {
    //   type: "auto",
    //   code: "lowerLimit",
    // },
    // {
    //   type: "auto",
    //   code: "config",
    // },
  ],
};

const page: RapidPage = {
  code: "mom_equipment_category_details",
  //@ts-ignore
  parentCode: "mom_equipment_category_list",
  name: "设备分类详情",
  title: "设备分类详情",
  // permissionCheck: {any: []},
  view: [
    {
      $type: "rapidEntityForm",
      entityCode: "MomEquipmentCategory",
      mode: "view",
      column: 3,
      items: [
        {
          type: "auto",
          code: "code",
        },
        {
          type: "auto",
          code: "name",
        },
      ],
      $exps: {
        entityId: "$rui.parseQuery().id",
      },
    },
    {
      $type: "sectionSeparator",
      showLine: true,
    },
    {
      $type: "antdTabs",
      items: [
        {
          key: "items",
          label: "设备采集指标",
          children: [
            {
              $id: "goodTransferList",
              $type: "sonicEntityList",
              entityCode: "MomEquipmentCategoryDimension",
              viewMode: "table",
              selectionMode: "none",
              fixedFilters: [
                {
                  field: "category_id",
                  operator: "eq",
                  value: "",
                },
              ],
              listActions: [
                {
                  $type: "sonicToolbarNewEntityButton",
                  text: "新建",
                  icon: "PlusOutlined",
                  actionStyle: "primary",
                },
                {
                  $type: "sonicToolbarRefreshButton",
                  text: "刷新",
                  icon: "ReloadOutlined",
                },
              ],
              pageSize: -1,
              orderBy: [
                {
                  field: "createdAt",
                },
              ],
              columns: [
                {
                  type: "auto",
                  code: "code",
                },
                {
                  type: "auto",
                  code: "name",
                },
                // {
                //   type: "auto",
                //   code: "nominal",
                // },
                // {
                //   type: "auto",
                //   code: "upperLimit",
                // },
                // {
                //   type: "auto",
                //   code: "lowerLimit",
                // },
              ],
              actions: [
                {
                  $type: "sonicRecordActionEditEntity",
                  code: "edit",
                  actionType: "edit",
                  actionText: "修改",
                },
                {
                  $type: "sonicRecordActionDeleteEntity",
                  code: "delete",
                  actionType: "delete",
                  actionText: "删除",
                  dataSourceCode: "list",
                  entityCode: "MomEquipmentCategoryDimension",
                },
              ],
              newForm: cloneDeep(formConfig),
              editForm: cloneDeep(formConfig),
              $exps: {
                "fixedFilters[0].value": "$rui.parseQuery().id",
                "newForm.fixedFields.category_id": "$rui.parseQuery().id",
              },
            },
          ],
        },
      ],
    },
    {
      $type: "sectionSeparator",
      showLine: false,
    },
  ],
};

export default page;


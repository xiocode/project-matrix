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
    {
      type: "auto",
      code: "nominal",
    },
    {
      type: "auto",
      code: "upperLimit",
    },
    {
      type: "auto",
      code: "lowerLimit",
    },
    {
      type: "auto",
      code: "orderNum",
    },
    {
      type: "auto",
      code: "config",
    },
  ],
};

const page: RapidPage = {
  code: "mom_route_process_parameter_details",
  //@ts-ignore
  parentCode: "base_material_details",
  name: "工艺参数详情",
  title: "工艺参数详情",
  // permissionCheck: {any: []},
  view: [
    // {
    //   $type: "rapidEntityForm",
    //   entityCode: "MomRouteProcess",
    //   mode: "view",
    //   column: 3,
    //   items: [
    //     {
    //       type: "auto",
    //       code: "route",
    //     },
    //     {
    //       type: "auto",
    //       code: "process",
    //     },
    //   ],
    //   $exps: {
    //     routeId: "$rui.parseQuery().routeId",
    //     processId: "$rui.parseQuery().processId",
    //   },
    // },
    {
      $type: "sectionSeparator",
      showLine: true,
    },
    {
      $type: "antdTabs",
      items: [
        {
          key: "items",
          label: "工艺参数指标",
          children: [
            {
              $id: "momRouteProcessParameter",
              $type: "sonicEntityList",
              entityCode: "MomRouteProcessParameter",
              viewMode: "table",
              selectionMode: "none",
              fixedFilters: [
                {
                  field: "route_id",
                  operator: "eq",
                  value: "",
                },
                {
                  field: "process_id",
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
                {
                  type: "auto",
                  code: "nominal",
                },
                {
                  type: "auto",
                  code: "upperLimit",
                },
                {
                  type: "auto",
                  code: "lowerLimit",
                },
                {
                  type: "auto",
                  code: "orderNum",
                },
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
                  entityCode: "MomRouteProcessParameter",
                },
              ],
              newForm: cloneDeep(formConfig),
              editForm: cloneDeep(formConfig),
              $exps: {
                "fixedFilters[0].value": "$rui.parseQuery().routeId",
                "fixedFilters[1].value": "$rui.parseQuery().processId",
                "newForm.fixedFields.route_id": "$rui.parseQuery().routeId",
                "newForm.fixedFields.process_id": "$rui.parseQuery().processId",
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


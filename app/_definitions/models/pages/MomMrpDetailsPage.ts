import { cloneDeep } from "lodash";
import type { RapidPage, RapidEntityFormRockConfig } from "@ruiapp/rapid-extension";

const orderFormConfig: Partial<RapidEntityFormRockConfig> = {
  items: [],
};

const page: RapidPage = {
  code: "mom_mrp_details",
  name: "物料需求计划详情",
  title: "物料需求计划详情",
  view: [
    {
      $type: "rapidEntityForm",
      entityCode: "MomManufacturingResourcePlan",
      mode: "view",
      column: 3,
      items: [
        {
          type: "auto",
          code: "name",
        },
        {
          type: "auto",
          code: "planningState",
        },
        {
          type: "auto",
          code: "executionState",
        },
        {
          type: "auto",
          code: "createdAt",
        },
      ],
      $exps: {
        entityId: "$rui.parseQuery().id",
      },
    },
    {
      $type: "antdTabs",
      items: [
        {
          key: "sandTable",
          label: "规划详情",
          children: [
            {
              $type: "mrpSandTable",
              $exps: {
                mrpId: "$rui.parseQuery().id",
              },
            },
          ],
        },
        {
          key: "mps",
          label: "主生产计划",
          children: [
            {
              $type: "sonicEntityList",
              entityCode: "MomMasterProductionSchedule",
              viewMode: "table",
              fixedFilters: [
                {
                  field: "mrp_id",
                  operator: "eq",
                  value: "",
                },
              ],
              listActions: [
                {
                  $type: "sonicToolbarRefreshButton",
                  text: "刷新",
                  icon: "ReloadOutlined",
                },
              ],
              columns: [
                {
                  type: "auto",
                  code: "material",
                  rendererType: "anchor",
                  rendererProps: {
                    children: {
                      $type: "materialLabelRenderer",
                      $exps: {
                        value: "$slot.value",
                      },
                    },
                    $exps: {
                      href: "$rui.execVarText('/pages/mom_mps_details?id={{id}}', $slot.record)",
                    },
                  },
                },
                // {
                //   type: 'auto',
                //   code: 'tags',
                //   width: '200px',
                // },
                {
                  type: "auto",
                  code: "tags",
                  title: "d",
                  fieldName: "tags",
                  width: "50px",
                  align: "right",
                  rendererProps: {
                    $exps: {
                      value: "qs.parse($slot.value).d",
                    },
                  },
                },
                {
                  type: "auto",
                  code: "tags",
                  title: "D",
                  fieldName: "tags",
                  width: "50px",
                  align: "right",
                  rendererProps: {
                    $exps: {
                      value: "qs.parse($slot.value).D",
                    },
                  },
                },
                {
                  type: "auto",
                  code: "tags",
                  title: "b",
                  fieldName: "tags",
                  width: "50px",
                  align: "right",
                  rendererProps: {
                    $exps: {
                      value: "qs.parse($slot.value).b",
                    },
                  },
                },
                {
                  type: "auto",
                  code: "quantity",
                  width: "100px",
                },
                {
                  type: "auto",
                  code: "unit",
                  width: "100px",
                  rendererProps: {
                    format: "{{name}}",
                  },
                },
                {
                  type: "auto",
                  code: "scheduledStartDate",
                  width: "100px",
                },
                {
                  type: "auto",
                  code: "scheduledFinishDate",
                  width: "100px",
                },
                {
                  type: "auto",
                  code: "scheduleState",
                  width: "100px",
                },
                {
                  type: "auto",
                  code: "executionState",
                  width: "100px",
                },
                {
                  type: "auto",
                  code: "createdAt",
                  width: "150px",
                },
              ],
              newForm: cloneDeep(orderFormConfig),
              editForm: cloneDeep(orderFormConfig),
              $exps: {
                "fixedFilters[0].value": "$rui.parseQuery().id",
              },
            },
          ],
        },
      ],
    },
  ],
};

export default page;

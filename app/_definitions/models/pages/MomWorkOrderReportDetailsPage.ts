import { cloneDeep } from "lodash";
import type { RapidPage, RapidEntityFormRockConfig } from "@ruiapp/rapid-extension";
import { materialFormatStrTemplate } from "~/utils/fmt";

const measurementFormConfig: Partial<RapidEntityFormRockConfig> = {
  items: [
    {
      type: "auto",
      code: "process",
      listDataFindOptions: {
        properties: ["id", "code", "name"],
        fixedFilters: [
          {
            field: "id",
            operator: "eq",
            value: "",
          },
        ],
        $exps: {
          "fixedFilters[0].value": "$stores.detail?.data?.list[0]?.process.id",
        },
      },
      formControlProps: {
        dropdownMatchSelectWidth: 300,
        listTextFormat: "{{code}} {{name}}",
        listFilterFields: ["name", "code"],
        columns: [
          { code: "code", title: "编号", width: 120 },
          { code: "name", title: "名称", width: 120 },
        ],
      },
    },
    {
      type: "auto",
      code: "equipment",
      listDataFindOptions: {
        properties: ["id", "code", "name"],
        fixedFilters: [
          {
            field: "id",
            operator: "eq",
            value: "",
          },
        ],
        $exps: {
          "fixedFilters[0].value": "$stores.detail?.data?.list[0]?.equipment.id",
        },
      },
      formControlProps: {
        dropdownMatchSelectWidth: 300,
        listTextFormat: "{{code}} {{name}}",
        listFilterFields: ["name", "code"],
        columns: [
          { code: "code", title: "编号", width: 120 },
          { code: "name", title: "名称", width: 120 },
        ],
      },
    },
    {
      type: "auto",
      code: "dimension",
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
      code: "value",
    },
    {
      type: "auto",
      code: "isOutSpecification",
    }
  ],
  defaultFormFields: {
    isOutSpecification: false,
  },
};

const page: RapidPage = {
  code: "mom_work_report_details",
  //@ts-ignore
  parentCode: "mom_work_order_details",
  name: "报工详情",
  title: "报工详情",
  view: [
    {
      $type: "rapidEntityForm",
      entityCode: "MomWorkReport",
      mode: "view",
      column: 3,
      items: [
        {
          type: "auto",
          code: "process",
        },
        {
          type: "auto",
          code: "equipment",
        },
        {
          type: "auto",
          code: "createdAt",
          label: "报工时间"
        },
      ],
      $exps: {
        entityId: "$rui.parseQuery().workReportId",
      },
    },
    {
      $type: "antdTabs",
      items: [
        {
          key: "metrics",
          label: "数采数据",
          children: [
            {
              $type: "sonicEntityList",
              entityCode: "MomRouteProcessParameterMeasurement",
              viewMode: "table",
              selectionMode: "none",
              fixedFilters: [
                {
                  field: "work_order_id",
                  operator: "eq",
                  value: "",
                },
                {
                  field: "work_report_id",
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
                // {
                //   $type: "sonicToolbarRefreshButton",
                //   text: "刷新",
                //   icon: "ReloadOutlined",
                // },
              ],
              columns: [
                {
                  type: "auto",
                  code: "dimension",
                  width: "150px",
                  rendererProps: {
                    format: "{{name}}",
                  }
                },
                {
                  type: "auto",
                  code: "process",
                  width: "150px",
                  rendererProps: {
                    format: "{{code}}-{{name}}",
                  }
                },
                {
                  type: "auto",
                  code: "equipment",
                  width: "150px",
                  rendererProps: {
                    format: "{{code}}-{{name}}",
                  }
                },
                {
                  type: "auto",
                  code: "nominal",
                  width: "150px",
                },
                {
                  type: "auto",
                  code: "upperLimit",
                  width: "150px",
                },
                {
                  type: "auto",
                  code: "lowerLimit",
                  width: "150px",
                },
                {
                  type: "auto",
                  code: "value",
                  width: "150px",
                },
                {
                  type: "auto",
                  code: "isOutSpecification",
                  width: "150px",
                },
                {
                  type: "auto",
                  code: "createdAt",
                  width: "150px",
                },
              ],
              newForm: cloneDeep(measurementFormConfig),
              $exps: {
                "fixedFilters[0].value": "$rui.parseQuery().workOrderId",
                "fixedFilters[1].value": "$rui.parseQuery().workReportId",
                "newForm.fixedFields.work_order_id": "$rui.parseQuery().workOrderId",
                "newForm.fixedFields.work_report_id": "$rui.parseQuery().workReportId",
              },
            },
          ],
        },
      ],
    },
  ],
};

export default page;

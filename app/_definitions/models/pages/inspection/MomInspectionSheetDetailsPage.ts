import { cloneDeep } from "lodash";
import type { RapidPage, RapidEntityFormRockConfig } from "@ruiapp/rapid-extension";

const flowFormConfig: Partial<RapidEntityFormRockConfig> = {
  items: [
    {
      type: "auto",
      code: "version",
    },
    {
      type: "auto",
      code: "state",
    },
    {
      type: "auto",
      code: "publishState",
    },
  ],
};

const flowProcessFormConfig: Partial<RapidEntityFormRockConfig> = {
  items: [
    {
      type: "auto",
      code: "orderNum",
    },
    {
      type: "auto",
      code: "process",
      formControlProps: {
        listTextFormat: "{{name}}",
        listFilterFields: ["label"],
        listOrderBy: [
          {
            field: "code",
          },
        ],
      },
    },
    {
      type: "auto",
      code: "aliasName",
    },
    {
      type: "auto",
      code: "standardCycleTime",
    },
  ],
};

const breakdownFormConfig: Partial<RapidEntityFormRockConfig> = {
  items: [
    {
      type: "auto",
      code: "version",
    },
    {
      type: "auto",
      code: "quantity",
    },
    {
      type: "auto",
      code: "unit",
    },
    {
      type: "auto",
      code: "state",
    },
  ],
};

const breakdownPartFormConfig: Partial<RapidEntityFormRockConfig> = {
  items: [
    {
      type: "auto",
      code: "orderNum",
    },
    {
      type: "auto",
      code: "subMaterial",
      listDataFindOptions: {
        properties: ["id", "code", "name", "defaultUnit"],
      },
      formControlProps: {
        listTextFormat: "{{code}} {{name}}",
        listFilterFields: ["label"],
      },
    },
    {
      type: "auto",
      code: "matchTags",
    },
    {
      type: "auto",
      code: "quantity",
    },
    {
      type: "auto",
      code: "unit",
    },
  ],
  onValuesChange: [
    {
      $action: "script",
      script: `
        const changedValues = event.args[0] || {};
        if(changedValues.hasOwnProperty('subMaterial')) {
          const _ = event.framework.getExpressionVars()._;
          const materials = _.get(event.scope.stores['dataFormItemList-subMaterial'], 'data.list');
          const subMaterial = _.find(materials, function (item) { return item.id == changedValues.subMaterial });
          const unitId = _.get(subMaterial, 'defaultUnit.id');
          event.page.sendComponentMessage(event.sender.$id, {
            name: "setFieldsValue",
            payload: {
              unit: unitId,
            }
          });
        }
      `,
    },
  ],
};

const materialDocumentFormConfig: Partial<RapidEntityFormRockConfig> = {
  items: [
    // {
    //   type: "auto",
    //   code: "document",
    //   label: "文件",
    //   valueFieldType: "json",
    //   formControlType: "rapidDocumentFormControl",
    //   formControlProps: {
    //     uploadProps: {
    //       name: "files",
    //       action: "/api/upload",
    //       headers: {},
    //       maxCount: 1,
    //     },
    //     onUploaded: [
    //       { $action: "printToConsole" },
    //       {
    //         $action: "script",
    //         script: `
    //           var fileInfo = event.args[0];
    //           event.sender.form.setFieldsValue({
    //             name: fileInfo.name,
    //             size: fileInfo.size,
    //             document: {
    //               code: "",
    //               name: fileInfo.name,
    //               size: fileInfo.size,
    //               storageObject: {
    //                 size: fileInfo.size,
    //                 key: fileInfo.key,
    //               },
    //               publishState: "published",
    //             },
    //           });
    //         `,
    //       },
    //     ],
    //   },
    // },
    {
      code: "sampleCode",
      type: "text",
    },
    {
      code: "characteristic",
      type: "auto",
    },
    {
      code: "instrumentCategory",
      type: "auto",
    },
    {
      code: "instrument",
      type: "auto",
    },
    {
      code: "inspector",
      type: "auto",
    },
    {
      code: "inspectedAt",
      type: "auto",
    },
    {
      code: "qualitativeValue",
      type: "auto",
    },
    {
      code: "quantitativeValue",
      type: "auto",
    },
    {
      code: "isQualified",
      type: "auto",
    },
  ],
  defaultFormFields: {
    isQualified: "true",
  },
};

const page: RapidPage = {
  code: "mom_inspection_sheet_details",
  //@ts-ignore
  parentCode: "mom_inspection_sheet_list",
  name: "检验单详情",
  title: "检验单详情",
  permissionCheck: { any: [] },
  view: [
    {
      $type: "rapidEntityForm",
      entityCode: "MomInspectionSheet",
      mode: "view",
      column: 3,
      items: [
        {
          code: "code",
          type: "auto",
        },
        {
          code: "state",
          type: "auto",
        },
        {
          type: "auto",
          code: "approvalState",
        },
        {
          code: "result",
          type: "auto",
        },
        {
          code: "material",
          type: "auto",
          rendererProps: {
            format: "{{code}}-{{name}}",
          },
        },
        {
          code: "lotNum",
          type: "auto",
        },
        // {
        //   code: "serialNum",
        //   type: "auto",
        // },
        // {
        //   code: "sampleCount",
        //   type: "auto",
        // },
        // {
        //   code: "workOrder",
        //   type: "auto",
        //   rendererProps: {
        //     format: "{{code}}",
        //   },
        // },
        // {
        //   code: "workTrack",
        //   type: "auto",
        //   rendererProps: {
        //     format: "{{code}}",
        //   },
        // },
        // {
        //   code: "workTask",
        //   type: "auto",
        //   rendererProps: {
        //     format: "{{code}}",
        //   },
        // },
        {
          code: "inventoryOperation",
          type: "auto",
          rendererProps: {
            format: "{{code}}",
          },
        },
        {
          code: "rule",
          type: "auto",
          rendererProps: {
            format: "{{name}}",
          },
        },
        // {
        //   code: "routeProcess",
        //   type: "auto",
        // },
        {
          code: "sender",
          type: "auto",
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          code: "inspector",
          type: "auto",
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          code: "reviewer",
          type: "auto",
          rendererProps: {
            format: "{{name}}",
          },
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
          key: "measurements",
          label: "检验记录",
          children: [
            {
              $id: "userList",
              $type: "sonicEntityList",
              entityCode: "MomInspectionMeasurement",
              viewMode: "table",
              selectionMode: "none",
              fixedFilters: [
                {
                  field: "sheet_id",
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
                  $permissionCheck: "inspectionSheet.manage",
                },
                {
                  $type: "sonicToolbarRefreshButton",
                  text: "刷新",
                  icon: "ReloadOutlined",
                },
              ],
              columns: [
                {
                  code: "sampleCode",
                  type: "text",
                },
                {
                  code: "characteristic",
                  type: "auto",
                  rendererProps: {
                    format: "{{name}}",
                  },
                },
                {
                  code: "instrumentCategory",
                  type: "auto",
                  rendererProps: {
                    format: "{{name}}",
                  },
                },
                {
                  code: "instrument",
                  type: "auto",
                  rendererProps: {
                    format: "{{code}}",
                  },
                },
                {
                  code: "inspector",
                  type: "auto",
                  rendererProps: {
                    format: "{{name}}",
                  },
                },
                {
                  code: "inspectedAt",
                  type: "auto",
                },
                {
                  code: "qualitativeValue",
                  type: "auto",
                },
                {
                  code: "quantitativeValue",
                  type: "auto",
                },
                {
                  code: "isQualified",
                  type: "auto",
                },
              ],
              actions: [
                {
                  $type: "sonicRecordActionDeleteEntity",
                  code: "delete",
                  actionType: "delete",
                  actionText: "删除",
                  $permissionCheck: "inspectionSheet.manage",
                  dataSourceCode: "list",
                  entityCode: "MomInspectionMeasurement",
                },
              ],
              newForm: cloneDeep(materialDocumentFormConfig),
              $exps: {
                "fixedFilters[0].value": "$rui.parseQuery().id",
                "newForm.fixedFields.sheet_id": "$rui.parseQuery().id",
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
    {
      $type: "rapidToolbar",
      items: [
        {
          $type: "rapidToolbarButton",
          text: "批准",
          actionStyle: "primary",
          size: "large",
          $permissionCheck: "inspectionSheet.review",
          onAction: [
            {
              $action: "sendHttpRequest",
              method: "PATCH",
              data: { approvalState: "approved" },
              $exps: {
                url: `"/api/mom/mom_inspection_sheets/" + $rui.parseQuery().id`,
              },
            },
            {
              $action: "antdMessage",
              title: "审核成功",
              onClose: [
                {
                  $action: "reloadPage",
                },
              ],
            },
          ],
          $exps: {
            _hidden: "_.get(_.first(_.get($stores.detail, 'data.list')), 'approvalState') !== 'approving'",
          },
        },
        {
          $type: "rapidToolbarButton",
          text: "拒绝",
          danger: true,
          size: "large",
          $permissionCheck: "inspectionSheet.review",
          onAction: [
            {
              $action: "sendHttpRequest",
              method: "PATCH",
              data: { approvalState: "rejected" },
              $exps: {
                url: `"/api/mom/mom_inspection_sheets/" + $rui.parseQuery().id`,
              },
            },
            {
              $action: "antdMessage",
              title: "审核成功",
              onClose: [
                {
                  $action: "reloadPage",
                },
              ],
            },
          ],
          $exps: {
            _hidden: "_.get(_.first(_.get($stores.detail, 'data.list')), 'approvalState') !== 'approving'",
          },
        },
      ],
    },
  ],
};

export default page;

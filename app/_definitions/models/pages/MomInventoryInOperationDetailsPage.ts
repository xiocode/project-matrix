import { cloneDeep } from "lodash";
import type { RapidPage, RapidEntityFormConfig } from "@ruiapp/rapid-extension";

const createFormConfig: Partial<RapidEntityFormConfig> = {
  defaultFormFields: { outMethod: "batch" },
  items: [
    {
      type: "auto",
      code: "material",
      formControlType: "tableSingleSelector",
      formControlProps: {
        labelFormat: "{{name}}({{code}})",
        requestConfig: {
          url: "/app/base_materials/operations/find",
        },
        columns: [
          {
            title: "物料编号",
            code: "code",
            width: 120,
          },
          {
            title: "物料名称",
            code: "name",
            width: 120,
          },
        ],
      },
      // listDataFindOptions: {
      //   properties: ["id", "code", "name", "defaultUnit"],
      // },
      // formControlProps: {
      //   listTextFormat: "{{code}} {{name}}",
      //   listFilterFields: ["label"],
      // },
    },
    {
      type: "auto",
      code: "unit",
      formControlProps: {
        disabled: true,
      },
    },
    {
      type: "auto",
      code: "lotNum",
    },
    {
      type: "date",
      code: "manufactureDate",
    },
    {
      type: "auto",
      code: "packageNum",
    },
    {
      type: "auto",
      code: "outMethod",
      label: "收货方式",
      formControlType: "rapidRadioListFormInput",
      formControlProps: {
        optionType: "button",
        listTextFieldName: "label",
        listValueFieldName: "value",
        listDataSource: {
          data: {
            list: [
              {
                label: "批量收货",
                value: "batch",
              },
              {
                label: "单托收货",
                value: "single",
              },
            ],
          },
        },
      },
    },
    {
      type: "auto",
      label: "单托数量",
      $exps: {
        _hidden: "$self.form.getFieldValue('outMethod') !== 'batch'",
      },
      code: "palletWeight",
      formControlType: "antdInputNumber",
      formControlProps: {
        min: 0,
      },
    },
    {
      type: "auto",
      label: "托数",
      $exps: {
        _hidden: "$self.form.getFieldValue('outMethod') !== 'batch'",
      },
      code: "palletCount",
      formControlType: "antdInputNumber",
      formControlProps: {
        min: 0,
      },
    },
    {
      type: "auto",
      code: "transfers",
      $exps: {
        _hidden: "$self.form.getFieldValue('outMethod') !== 'single'",
      },
      formControlType: "editableTable",
      formControlProps: {
        width: "100%",
        columns: [
          {
            name: "index",
            title: "序号",
            width: 50,
            fixed: "left",
            control: `
              function(r, index){
                return index + 1;
              }
            `,
          },
          {
            name: "palletWeight",
            title: "数量",
            control: "number",
            width: 100,
          },
        ],
      },
    },
  ],
  onValuesChange: [
    {
      $action: "script",
      script: `
        const changedValues = event.args[0] || {};
        if(changedValues.hasOwnProperty('material')) {
          const _ = event.framework.getExpressionVars()._;
          const materials = _.get(event.scope.stores['dataFormItemList-material'], 'data.list');
          const material = _.find(materials, function (item) { return item.id == changedValues.material });
          const unitName = _.get(material, 'defaultUnit.name');
          event.page.sendComponentMessage(event.sender.$id, {
            name: "setFieldsValue",
            payload: {
              unit: unitName,
            }
          });
        }
      `,
    },
  ],
  customRequest: {
    method: "post",
    url: "/app/createGoodTransfers",
  },
};

const formConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      type: "auto",
      code: "material",
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
      code: "lotNum",
    },
    {
      type: "auto",
      code: "binNum",
      label: "托盘号",
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
      type: "treeSelect",
      code: "to",
      formControlProps: {
        listDataSourceCode: "locations",
        listParentField: "parent.id",
      },
    },
    {
      type: "auto",
      code: "transferTime",
    },
    {
      type: "auto",
      code: "packageNum",
    },
  ],
  onValuesChange: [
    {
      $action: "script",
      script: `
        const changedValues = event.args[0] || {};
        if(changedValues.hasOwnProperty('material')) {
          const _ = event.framework.getExpressionVars()._;
          const materials = _.get(event.scope.stores['dataFormItemList-material'], 'data.list');
          const material = _.find(materials, function (item) { return item.id == changedValues.material });
          const unitId = _.get(material, 'defaultUnit.id');
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

const page: RapidPage = {
  code: "mom_inventory_in_operation_details",
  name: "入库操作详情",
  title: "入库操作详情",
  // permissionCheck: {any: []},
  view: [
    {
      $type: "rapidEntityForm",
      entityCode: "MomInventoryOperation",
      mode: "view",
      column: 3,
      extraProperties: ["application"],
      items: [
        {
          type: "auto",
          code: "code",
        },
        {
          type: "auto",
          code: "operationType",
        },
        {
          type: "auto",
          code: "businessType",
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          type: "auto",
          code: "createdAt",
        },
        {
          type: "auto",
          code: "state",
        },
        {
          type: "auto",
          code: "contractNum",
        },
        {
          type: "auto",
          code: "supplier",
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          type: "auto",
          code: "approvalState",
        },
      ],
      $exps: {
        entityId: "$rui.parseQuery().id",
      },
    },
    {
      $type: "box",
      children: [
        {
          $type: "sectionSeparator",
          showLine: true,
        },
        {
          $type: "htmlElement",
          htmlTag: "h2",
          children: [
            {
              $type: "text",
              text: "申请明细",
            },
          ],
        },
        {
          $id: "applicationItemList",
          $type: "sonicEntityList",
          entityCode: "MomInventoryApplicationItem",
          viewMode: "table",
          selectionMode: "none",
          fixedFilters: [
            {
              field: "application",
              operator: "exists",
              filters: [
                {
                  field: "id",
                  operator: "eq",
                  value: "",
                },
              ],
            },
          ],
          pageSize: -1,
          orderBy: [
            {
              field: "orderNum",
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
                  href: "$rui.execVarText('/pages/base_material_details?id={{id}}', $slot.value)",
                },
              },
            },
            {
              type: "auto",
              code: "lotNum",
              width: "100px",
            },
            {
              type: "auto",
              code: "quantity",
              width: "100px",
            },
            {
              type: "auto",
              code: "unit",
              width: "80px",
              rendererProps: {
                format: "{{name}}",
              },
            },
          ],
          $exps: {
            "fixedFilters[0].filters[0].value": "_.get(_.first(_.get($stores.detail, 'data.list')), 'application.id')",
          },
        },
      ],
      $exps: {
        _hidden: "!_.get(_.first(_.get($stores.detail, 'data.list')), 'application.id')",
      },
    },
    {
      $type: "sectionSeparator",
      showLine: false,
    },
    {
      $type: "antdTabs",
      items: [
        {
          key: "items",
          label: "库存操作明细",
          children: [
            {
              $id: "goodTransferList",
              $type: "sonicEntityList",
              entityCode: "MomGoodTransfer",
              viewMode: "table",
              fixedFilters: [
                {
                  field: "operation",
                  operator: "exists",
                  filters: [
                    {
                      field: "id",
                      operator: "eq",
                      value: "",
                    },
                  ],
                },
              ],
              listActions: [
                {
                  $type: "sonicToolbarNewEntityButton",
                  text: "新建",
                  icon: "PlusOutlined",
                  actionStyle: "primary",
                  $exps: {
                    _hidden: "_.get(_.first(_.get($stores.detail, 'data.list')), 'state') !== 'processing'",
                  },
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
                      href: "$rui.execVarText('/pages/base_material_details?id={{id}}', $slot.value)",
                    },
                  },
                },
                {
                  type: "auto",
                  code: "lotNum",
                  width: "100px",
                },
                {
                  type: "auto",
                  code: "binNum",
                  width: "100px",
                  title: "托盘号",
                },
                {
                  type: "auto",
                  code: "quantity",
                  width: "100px",
                },
                {
                  type: "auto",
                  code: "unit",
                  width: "80px",
                  rendererProps: {
                    format: "{{name}}",
                  },
                },
                {
                  type: "auto",
                  code: "material",
                  title: "保质期",
                  rendererProps: {
                    format: "{{qualityGuaranteePeriod}}",
                  },
                },
                {
                  type: "auto",
                  code: "good",
                  title: "生产日期",
                  fieldName: "good.manufactureDate",
                  fieldType: "date",
                },
                {
                  type: "auto",
                  code: "good",
                  title: "有效期至",
                  fieldName: "good.validityDate",
                  fieldType: "date",
                },
                {
                  type: "auto",
                  code: "to",
                  width: "150px",
                  rendererProps: {
                    format: "{{name}}",
                  },
                },
              ],
              actions: [
                {
                  $type: "sonicRecordActionPrintEntity",
                  code: "print",
                  actionType: "print",
                  actionText: "打印",
                  printerCode: "DB5-4SA-NS6",
                  printTemplateCode: "test",
                  dataSourceAdapter: `function(data, utils){
                    return utils.lodash.map(data, function(item){
                      const createdAt = utils.lodash.get(item, "good.createdAt");
                      const validityDate = utils.lodash.get(item, "good.validityDate");
                      return utils.lodash.merge({}, item, {
                        materialName: utils.lodash.get(item, "material.name"),
                        materialCode: utils.lodash.get(item, "material.code"),
                        materialSpecification: utils.lodash.get(item, "material.specification"),
                        createdAt: createdAt && utils.dayjs(createdAt).format("YYYY-MM-DD HH:mm:ss"),
                        validityDate: validityDate && utils.dayjs(validityDate).format("YYYY-MM-DD"),
                        currentTime: utils.dayjs().format("YYYY-MM-DD HH:mm:ss"),
                      })
                    });
                  }`,
                  $exps: {
                    _hidden: "_.get(_.first(_.get($stores.detail, 'data.list')), 'operationType') !== 'in'",
                  },
                },
                {
                  $type: "inspectionPrintRecordAction",
                  actionType: "print",
                  actionText: "送检",
                  printerCode: "DB5-4SA-NS6",
                  printTemplateCode: "test",
                },
                {
                  $type: "sonicRecordActionEditEntity",
                  code: "edit",
                  actionType: "edit",
                  actionText: "修改",
                  $exps: {
                    _hidden: "_.get(_.first(_.get($stores.detail, 'data.list')), 'state') !== 'processing'",
                  },
                },
                {
                  $type: "sonicRecordActionDeleteEntity",
                  code: "delete",
                  actionType: "delete",
                  actionText: "删除",
                  dataSourceCode: "list",
                  entityCode: "MomGoodTransfer",
                  $exps: {
                    _hidden: "_.get(_.first(_.get($stores.detail, 'data.list')), 'state') !== 'processing'",
                  },
                },
              ],
              newForm: cloneDeep(createFormConfig),
              editForm: cloneDeep(formConfig),
              stores: [
                {
                  type: "entityStore",
                  name: "locations",
                  entityCode: "BaseLocation",
                  properties: ["id", "type", "code", "name", "parent", "orderNum", "createdAt"],
                  filters: [],
                  orderBy: [
                    {
                      field: "orderNum",
                    },
                  ],
                },
              ],
              $exps: {
                "fixedFilters[0].filters[0].value": "$rui.parseQuery().id",
                "newForm.fixedFields.operation_id": "$rui.parseQuery().id",
                "newForm.fixedFields.operationId": "$rui.parseQuery().id",
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
          text: "确认提交",
          actionStyle: "primary",
          size: "large",
          onAction: [
            {
              $action: "sendHttpRequest",
              method: "PATCH",
              data: { state: "done", approvalState: "approving" },
              $exps: {
                url: `"/api/mom/mom_inventory_operations/" + $rui.parseQuery().id`,
              },
            },
          ],
          $exps: {
            _hidden: "_.get(_.first(_.get($stores.detail, 'data.list')), 'state') !== 'processing'",
          },
        },
        {
          $type: "rapidToolbarButton",
          text: "批准",
          actionStyle: "primary",
          size: "large",
          onAction: [
            {
              $action: "sendHttpRequest",
              method: "PATCH",
              data: { approvalState: "approved" },
              $exps: {
                url: `"/api/mom/mom_inventory_operations/" + $rui.parseQuery().id`,
              },
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
          onAction: [
            {
              $action: "sendHttpRequest",
              method: "PATCH",
              data: { approvalState: "rejected" },
              $exps: {
                url: `"/api/mom/mom_inventory_operations/" + $rui.parseQuery().id`,
              },
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

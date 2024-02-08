import { cloneDeep } from 'lodash';
import type { RapidPage, RapidEntityFormConfig } from '@ruiapp/rapid-extension';


const contractFileNewForm: Partial<RapidEntityFormConfig> = {
  items: [
    {
      type: 'auto',
      code: 'storageObject',
      label: "文件",
      valueFieldType: "json",
      formControlType: "rapidDocumentFormControl",
      formControlProps: {
        uploadProps: {
          name: "files",
          action: "/api/upload",
          headers: {},
          maxCount: 1,
        },
        onUploaded: [
          {
            $action: "script",
            script: `function (event) {
              var fileInfo = event.args;
              event.sender.form.setFieldsValue({
                name: fileInfo.name,
                size: fileInfo.size,
                storageObject: {
                  size: fileInfo.size,
                  key: fileInfo.key,
                }
              });
            }`
          }
        ],
      },
    },
    {
      type: 'auto',
      code: 'code',
    },
    {
      type: 'auto',
      code: 'name',
    },
    {
      type: 'auto',
      code: 'size',
      hidden: true,
    },
    {
      type: 'textarea',
      code: 'description',
    },
  ],
}

const contractFileEditForm: Partial<RapidEntityFormConfig> = {
  items: [
    {
      type: 'auto',
      code: 'code',
    },
    {
      type: 'auto',
      code: 'name',
    },
    {
      type: 'textarea',
      code: 'description',
    },
  ]
}

const relatedContractFormConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      type: 'auto',
      code: 'target',
      formControlProps: {
        listTextFormat: "{{code}} {{name}}",
        listFilterFields: ['label']
      }
    },
    {
      type: 'auto',
      code: 'kind',
      formControlProps: {
        listTextFormat: "{{code}} {{name}}",
        listFilterFields: ['label']
      }
    },
  ],
};

const page: RapidPage = {
  code: 'cbs_contract_details',
  name: '合同详情',
  title: '合同详情',
  view: [
    {
      $type: 'rapidEntityForm',
      entityCode: 'CbsContract',
      mode: 'view',
      column: 3,
      items: [
        {
          type: 'auto',
          code: 'kind',
        },
        {
          type: 'auto',
          code: 'code',
        },
        {
          type: 'auto',
          code: 'name',
        },
        {
          type: 'auto',
          code: 'project',
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          type: 'auto',
          code: 'salesman',
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          type: 'auto',
          code: 'totalAmount',
          rendererType: 'rapidCurrencyRenderer',
        },
        {
          type: 'auto',
          code: 'state',
        },
      ],
      $exps: {
        entityId: "$rui.parseQuery().id",
      }
    },
    {
      $type: "antdTabs",
      items: [
        {
          key: "files",
          label: "文件",
          children: [
            {
              $type: "sonicEntityList",
              entityCode: "CbsContractFile",
              viewMode: "table",
              fixedFilters: [
                {
                  field: "contract_id",
                  operator: "eq",
                  value: "",
                }
              ],
              orderBy: [
                {
                  field: "createdAt",
                },
              ],
              listActions: [
                {
                  $type: "sonicToolbarNewEntityButton",
                  text: "上传",
                  icon: "PlusOutlined",
                  actionStyle: "primary",
                },
                {
                  $type: "sonicToolbarRefreshButton",
                  text: "刷新",
                  icon: "ReloadOutlined",
                },
              ],
              extraProperties: ["storageObject"],
              columns: [
                {
                  type: 'auto',
                  code: 'code',
                  width: '150px',
                },
                {
                  type: 'auto',
                  code: 'name',
                  width: '250px',
                  rendererType: "rapidLinkRenderer",
                  rendererProps: {
                    $exps: {
                      text: "$slot.record.name",
                      url: "'/api/download/file?fileId=' + $slot.record.id + '&fileName=' + encodeURIComponent($slot.record.name)",
                    },
                  },
                },
                {
                  type: 'auto',
                  code: 'description',
                },
                {
                  type: 'auto',
                  code: 'size',
                  width: '150px',
                  rendererType: 'rapidFileSizeRenderer',
                },
                {
                  type: 'auto',
                  code: 'createdAt',
                  width: '150px',
                },
              ],
              actions: [
                {
                  $type: "sonicRecordActionEditEntity",
                  code: 'edit',
                  actionType: "edit",
                  actionText: '修改',
                },
                {
                  $type: "sonicRecordActionDeleteEntity",
                  code: 'delete',
                  actionType: 'delete',
                  actionText: '删除',
                  dataSourceCode: "list",
                  entityCode: "CbsContractFile",
                },
              ],
              newForm: cloneDeep(contractFileNewForm),
              editForm: cloneDeep(contractFileEditForm),
              $exps: {
                "fixedFilters[0].value": "$rui.parseQuery().id",
                "newForm.fixedFields.contract_id": "$rui.parseQuery().id",
              },
            },
          ],
        },
        {
          key: "relatedContracts",
          label: "相关合同",
          children: [
            {
              $id: "relatedContractsList",
              $type: "sonicEntityList",
              entityCode: "CbsContractRelation",
              viewMode: "table",
              fixedFilters: [
                {
                  field: "main",
                  operator: "exists",
                  filters: [
                    {
                      field: "id",
                      operator: "eq",
                      value: ""
                    }
                  ]
                }
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
              pageSize: 20,
              columns: [
                {
                  type: 'auto',
                  code: 'kind',
                  width: '150px',
                  rendererProps: {
                    format: "{{name}}",
                  },
                },
                {
                  type: 'auto',
                  code: 'target',
                  rendererType: "rapidLinkRenderer",
                  rendererProps: {
                    text: "{{code}} {{name}}",
                    url: "/pages/cbs_contract_details?id={{id}}",
                  },
                },
              ],
              actions: [
                {
                  $type: "sonicRecordActionEditEntity",
                  code: 'edit',
                  actionType: "edit",
                  actionText: '修改',
                },
                {
                  $type: "sonicRecordActionDeleteEntity",
                  code: 'delete',
                  actionType: 'delete',
                  actionText: '删除',
                  dataSourceCode: "list",
                  entityCode: "CbsContractRelation",
                },
              ],
              newForm: cloneDeep(relatedContractFormConfig),
              editForm: cloneDeep(relatedContractFormConfig),
              $exps: {
                "fixedFilters[0].filters[0].value": "$rui.parseQuery().id",
                "newForm.fixedFields.main_id": "$rui.parseQuery().id",
              },
            }
          ]
        },
        {
          key: "orders",
          label: "相关订单",
          children: [
            {
              $id: "orderList",
              $type: "sonicEntityList",
              entityCode: "CbsOrder",
              viewMode: "table",
              fixedFilters: [
                {
                  field: "contracts",
                  operator: "exists",
                  filters: [
                    {
                      field: "id",
                      operator: "eq",
                      value: ""
                    }
                  ]
                }
              ],
              listActions: [
                {
                  $type: "sonicToolbarRefreshButton",
                  text: "刷新",
                  icon: "ReloadOutlined",
                },
              ],
              pageSize: 20,
              columns: [
                {
                  type: 'auto',
                  code: 'kind',
                  fixed: 'left',
                  width: '100px',
                },
                {
                  type: 'auto',
                  code: 'code',
                  fixed: 'left',
                  width: '100px',
                },
                {
                  type: 'link',
                  code: 'name',
                  fixed: 'left',
                  rendererProps: {
                    url: "/pages/cbs_order_details?id={{id}}",
                  },
                },
                {
                  type: 'auto',
                  code: 'totalAmount',
                  width: '120px',
                  align: 'right',
                  rendererType: 'rapidCurrencyRenderer',
                },
                {
                  type: 'auto',
                  code: 'projects',
                  width: '300px',
                  rendererProps: {
                    listContainer: {
                      $type: "htmlElement",
                      htmlTag: "div",
                    },
                    itemContainer: {
                      $type: "htmlElement",
                      htmlTag: "div",
                    },
                    item: {
                      $type: "rapidLinkRenderer",
                      url: "/pages/pm_project_details?id={{id}}",
                      text: "{{code}} {{name}}",
                    },
                    separator: {
                      $type: "htmlElement",
                      htmlTag: "div",
                    }
                  },
                },
                {
                  type: 'auto',
                  code: 'contracts',
                  width: '300px',
                  rendererProps: {
                    listContainer: {
                      $type: "htmlElement",
                      htmlTag: "div",
                    },
                    itemContainer: {
                      $type: "htmlElement",
                      htmlTag: "div",
                    },
                    item: {
                      $type: "rapidLinkRenderer",
                      url: "/pages/cbs_contract_details?id={{id}}",
                      text: "{{code}} {{name}}",
                    },
                    separator: {
                      $type: "htmlElement",
                      htmlTag: "div",
                    }
                  },
                },
                {
                  type: 'auto',
                  code: 'state',
                  width: '100px',
                },
                {
                  type: 'auto',
                  code: 'createdAt',
                  width: '150px',
                },
              ],
              $exps: {
                "fixedFilters[0].filters[0].value": "$rui.parseQuery().id",
              },
            }
          ]
        },
      ]
    }
  ],
};

export default page;

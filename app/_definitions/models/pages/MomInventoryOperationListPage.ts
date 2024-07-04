import { cloneDeep } from "lodash";
import type { RapidPage, RapidEntityFormConfig } from "@ruiapp/rapid-extension";

const formConfig: Partial<RapidEntityFormConfig> = {
  items: [
    // {
    //   type: "auto",
    //   code: "code",
    // },
    {
      type: "auto",
      code: "application",
      listDataFindOptions: {
        properties: ["id", "operationType", "businessType", "code"],
      },
      formControlProps: {
        listTextFormat: "{{code}}",
      },
    },
    {
      type: "auto",
      code: "businessType",
    },
    {
      type: "auto",
      code: "operationType",
    },
  ],
  onValuesChange: [
    {
      $action: "script",
      script: `
        const changedValues = event.args[0] || {};
        const _ = event.framework.getExpressionVars()._;
        if(changedValues.hasOwnProperty('application')) {
          const applicationItems = _.get(event.scope.stores['dataFormItemList-application'], 'data.list');
          const applicationItem = _.find(applicationItems, function (item) { return item.id == changedValues.application });

          event.page.sendComponentMessage(event.sender.$id, {
            name: "setFieldsValue",
            payload: {
              businessType: _.get(applicationItem, "businessType.id"),
              operationType: _.get(applicationItem, "operationType"),
            }
          });
        }else if(changedValues.hasOwnProperty('businessType')){
          const businessTypeItems = _.get(event.scope.stores['dataFormItemList-businessType'], 'data.list');
          const businessTypeItem = _.find(businessTypeItems, function (item) { return item.id == changedValues.businessType });

          event.page.sendComponentMessage(event.sender.$id, {
            name: "setFieldsValue",
            payload: {
              operationType: _.get(businessTypeItem, "operationType"),
            }
          });
        }
      `,
    },
  ],
  defaultFormFields: {
    state: "pending",
    approvalState: "uninitiated",
  },
};

const page: RapidPage = {
  code: "mom_inventory_operation_list",
  name: "库存操作记录",
  title: "库存操作",
  // permissionCheck: {any: []},
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "MomInventoryOperation",
      viewMode: "table",
      listActions: [
        {
          $type: "sonicToolbarNewEntityButton",
          text: "新建",
          icon: "PlusOutlined",
          actionStyle: "primary",
        },
      ],
      fixedFilters: [
        {
          operator: "or",
          filters: [
            {
              field: "operationType",
              operator: "eq",
              value: "in",
            },
            {
              field: "operationType",
              operator: "eq",
              value: "out",
            },
          ],
        },
      ],
      extraActions: [
        {
          $type: "sonicToolbarFormItem",
          formItemType: "search",
          placeholder: "Search",
          actionEventName: "onSearch",
          filterMode: "contains",
          filterFields: ["material"],
        },
      ],
      orderBy: [
        {
          field: "createdAt",
          desc: true,
        },
      ],
      pageSize: 20,
      columns: [
        {
          type: "link",
          code: "code",
          // rendererType: "rapidLinkRenderer",
          rendererProps: {
            url: "/pages/mom_inventory_operation_details?id={{id}}",
            $exps: {
              href: "(_.get($slot.record, 'operationType') === 'out' ? '/pages/mom_inventory_out_operation_details?id=' : '/pages/mom_inventory_in_operation_details?id=') + _.get($slot.record, 'id')",
            },
          },
          width: "150px",
        },
        {
          type: "auto",
          code: "application",
          width: "150px",
          rendererType: "rapidLinkRenderer",
          rendererProps: {
            text: "{{code}}",
            url: "/pages/mom_inventory_application_details?id={{id}}",
          },
        },
        {
          type: "auto",
          code: "operationType",
          width: "150px",
        },
        {
          type: "auto",
          code: "businessType",
          width: "150px",
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          type: "auto",
          code: "createdAt",
          width: "150px",
        },
        {
          type: "auto",
          code: "state",
          width: "100px",
        },
        {
          type: "auto",
          code: "approvalState",
          width: "100px",
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
          entityCode: "MomInventoryOperation",
        },
      ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
      $exps: {
        "newForm.fixedFields.state": "'processing'",
        "newForm.fixedFields.approvalState": "'uninitiated'",
      },
    },
  ],
};

export default page;

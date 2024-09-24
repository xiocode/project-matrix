import { cloneDeep } from "lodash";
import type { RapidPage, RapidEntityFormConfig } from "@ruiapp/rapid-extension";

const formConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      type: "auto",
      code: "code",
    },
    {
      type: "auto",
      code: "applicant",
      required: true,
    },
    {
      type: "auto",
      code: "orderNumb",
      required: true,
    },
    {
      type: "auto",
      code: "supplier",
      required: true,
    },
    {
      type: "auto",
      code: "deliveryOrder",
      label: "送货委托书",
    },
    {
      type: "auto",
      code: "qualityInspectionReport",
      label: "质检报告",
    },
    {
      type: "auto",
      code: "sealNumPicture",
      label: "铅封号照片",
    },
    {
      type: "auto",
      code: "state",
    },
    {
      type: "auto",
      code: "approvalState",
    },
  ],
  defaultFormFields: {
    state: "pending",
    approvalState: "uninitiated",
  },
};

const page: RapidPage = {
  code: "mom_transport_operation_list",
  name: "运输单列表",
  title: "运输单列表",
  // permissionCheck: {any: []},
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "MomTransportOperation",
      viewMode: "table",
      selectionMode: "none",
      listActions: [
        {
          $type: "sonicToolbarNewEntityButton",
          text: "新建",
          icon: "PlusOutlined",
          actionStyle: "primary",
          // $permissionCheck: "inventoryOperation.manage",
        },
      ],
      extraActions: [
        {
          $type: "sonicToolbarFormItem",
          formItemType: "search",
          placeholder: "搜索编号",
          actionEventName: "onSearch",
          filterMode: "contains",
          filterFields: ["code"],
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
          rendererType: "rapidLinkRenderer",
          rendererProps: {
            url: "/pages/mom_transport_operation_details?id={{id}}",
          },
          width: "150px",
        },
        {
          type: "auto",
          code: "orderNum",
          width: "150px",
        },
        {
          type: "auto",
          code: "supplier",
          width: "150px",
        },
        {
          type: "auto",
          code: "createdAt",
          width: "150px",
        },
        {
          type: "auto",
          code: "deliveryOrder",
          width: "150px",
          // rendererProps: {
          //   item: {
          //     $type: "antdListItemMeta",
          //     title: {
          //       $type: "antdSpace",
          //       children: [
          //         {
          //           $type: "text",
          //           text: "",
          //         },
          //         {
          //           $type: "anchor",
          //           href: "",
          //           children: "下载",
          //         },
          //       ],
          //     },
          //     $exps: {
          //       "title.children[0].text": "$slot.value.name",
          //       "title.children[1].href": "'/api/download/document?documentId=' + $slot.value.id",
          //       description:
          //         "$functions.formatFileSize($slot.value.size) + ' | ' + $slot.record.createdBy.name + ' 创建于 ' + $functions.formatDateTime($slot.value.createdAt)",
          //     },
          //   },
          // },
        },
        {
          type: "auto",
          code: "qualityInspectionReport",
          width: "150px",
          // rendererProps: {
          //   item: {
          //     $type: "antdListItemMeta",
          //     title: {
          //       $type: "antdSpace",
          //       children: [
          //         {
          //           $type: "text",
          //           text: "",
          //         },
          //         {
          //           $type: "anchor",
          //           href: "",
          //           children: "下载",
          //         },
          //       ],
          //     },
          //     $exps: {
          //       "title.children[0].text": "$slot.value.name",
          //       "title.children[1].href": "'/api/download/document?documentId=' + $slot.value.id",
          //       description:
          //         "$functions.formatFileSize($slot.value.size) + ' | ' + $slot.record.createdBy.name + ' 创建于 ' + $functions.formatDateTime($slot.value.createdAt)",
          //     },
          //   },
          // },
        },
        {
          type: "auto",
          code: "sealNumPicture",
          width: "150px",
          // rendererProps: {
          //   item: {
          //     $type: "antdListItemMeta",
          //     title: {
          //       $type: "antdSpace",
          //       children: [
          //         {
          //           $type: "text",
          //           text: "",
          //         },
          //         {
          //           $type: "anchor",
          //           href: "",
          //           children: "下载",
          //         },
          //       ],
          //     },
          //     $exps: {
          //       "title.children[0].text": "$slot.value.name",
          //       "title.children[1].href": "'/api/download/document?documentId=' + $slot.value.id",
          //       description:
          //         "$functions.formatFileSize($slot.value.size) + ' | ' + $slot.record.createdBy.name + ' 创建于 ' + $functions.formatDateTime($slot.value.createdAt)",
          //     },
          //   },
          // },
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
          // $permissionCheck: "inventoryOperation.manage",
        },
        {
          $type: "sonicRecordActionDeleteEntity",
          code: "delete",
          actionType: "delete",
          actionText: "删除",
          dataSourceCode: "list",
          entityCode: "MomTransportOperation",
          // $permissionCheck: "inventoryOperation.manage",
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

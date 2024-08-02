import { cloneDeep } from "lodash";
import type { RapidPage, RapidEntityFormConfig } from "@ruiapp/rapid-extension";

const projectRoleFormConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      type: "auto",
      code: "orderNum",
    },
    {
      type: "auto",
      code: "name",
    },
    {
      type: "textarea",
      code: "description",
    },
    {
      type: "auto",
      code: "users",
    },
  ],
};

const page: RapidPage = {
  code: "pm_project_settings",
  name: "项目设置",
  title: "项目设置",
  permissionCheck: { any: ["pmProject.setting"] },
  view: [
    {
      $type: "rapidEntityForm",
      entityCode: "PmProject",
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
        {
          type: "auto",
          code: "category",
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          type: "auto",
          code: "projectManager",
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          type: "auto",
          code: "stage",
        },
        {
          type: "auto",
          code: "state",
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
          key: "projectRoles",
          label: "项目团队",
          children: [
            {
              $id: "projectRoleList",
              $type: "sonicEntityList",
              entityCode: "PmProjectRole",
              viewMode: "table",
              selectionMode: "none",
              fixedFilters: [
                {
                  field: "project",
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
                },
                {
                  $type: "sonicToolbarRefreshButton",
                  text: "刷新",
                  icon: "ReloadOutlined",
                },
              ],
              pageSize: 20,
              orderBy: [
                {
                  field: "orderNum",
                },
              ],
              columns: [
                {
                  type: "auto",
                  code: "orderNum",
                  width: "80px",
                },
                {
                  type: "auto",
                  code: "name",
                  width: "150px",
                },
                {
                  type: "auto",
                  code: "description",
                  width: "200px",
                },
                {
                  type: "auto",
                  code: "users",
                  rendererProps: {
                    item: {
                      $type: "rapidLinkRenderer",
                      url: "/pages/oc_user_details?id={{id}}",
                      text: "{{name}}",
                    },
                  },
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
                  entityCode: "PmProjectRole",
                },
              ],
              newForm: cloneDeep(projectRoleFormConfig),
              editForm: cloneDeep(projectRoleFormConfig),
              $exps: {
                "fixedFilters[0].filters[0].value": "$rui.parseQuery().id",
                "newForm.fixedFields.project_id": "$rui.parseQuery().id",
              },
            },
          ],
        },
        {
          key: "projectWorkItemTypes",
          label: "工作项类型",
          children: [
            {
              $id: "projectWorkItemTypeList",
              $type: "sonicEntityList",
              entityCode: "PmProjectWorkItemType",
              viewMode: "table",
              fixedFilters: [
                {
                  field: "project",
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
                  $type: "sonicToolbarSelectEntityButton",
                  text: "添加",
                  icon: "PlusOutlined",
                  actionStyle: "primary",
                  entityCode: "PmWorkItemType",
                  quickSearchFields: ["code", "name"],
                  columns: [
                    {
                      type: "auto",
                      code: "code",
                      width: "100px",
                    },
                    {
                      type: "auto",
                      code: "name",
                    },
                    {
                      type: "auto",
                      code: "state",
                      width: "100px",
                    },
                  ],
                  onSelected: [
                    {
                      $action: "sendHttpRequest",
                      method: "POST",
                      url: "/api/app/pm_projects/operations/add_relations",
                      data: {
                        property: "workItemTypes",
                      },
                      $exps: {
                        "data.id": "$rui.parseQuery().id",
                        "data.relations": "_.map($event.args[0].selectedIds, function(id) {return {id: id}})",
                      },
                    },
                    {
                      $action: "loadStoreData",
                      scopeId: "projectWorkItemTypeList-scope",
                      storeName: "list",
                    },
                  ],
                },
                {
                  $type: "sonicToolbarRefreshButton",
                  text: "刷新",
                  icon: "ReloadOutlined",
                },
              ],
              columns: [
                {
                  key: "workItemTypeCode",
                  type: "auto",
                  code: "workItemType",
                  fieldName: "workItemType.code",
                  width: "100px",
                },
                {
                  key: "workItemTypeName",
                  type: "link",
                  code: "workItemType",
                  fieldName: "workItemType.name",
                  width: "150px",
                  rendererProps: {
                    url: "/",
                    $exps: {
                      href: `"/pages/pm_project_work_item_type_settings?id=" + $slot.record.id + "&projectId=" + $rui.parseQuery().id + "&workItemTypeId=" + $slot.record.workItemType.id`,
                    },
                  },
                },
                {
                  type: "auto",
                  code: "workItemType",
                  fieldName: "workItemType.description",
                },
              ],
              actions: [
                {
                  $type: "rapidTableAction",
                  code: "remove",
                  actionText: "移除",
                  confirmText: "您确定要从项目中移除此工作项类型吗？",
                  onAction: [
                    {
                      $action: "sendHttpRequest",
                      method: "POST",
                      url: "/api/app/pm_projects/operations/remove_relations",
                      data: {
                        property: "workItemTypes",
                      },
                      $exps: {
                        "data.id": "$rui.parseQuery().id",
                        "data.relations": "[{id: $event.sender['data-record-id']}]",
                      },
                    },
                    {
                      $action: "loadStoreData",
                      storeName: "list",
                    },
                  ],
                },
              ],
              $exps: {
                "fixedFilters[0].filters[0].value": "$rui.parseQuery().id",
              },
            },
          ],
        },
      ],
    },
  ],
};

export default page;

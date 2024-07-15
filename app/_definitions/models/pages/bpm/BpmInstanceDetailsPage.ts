import type { RapidPage } from "@ruiapp/rapid-extension";

const page: RapidPage = {
  code: "bpm_instance_details",
  name: "审批详情",
  title: "审批详情",
  permissionCheck: { any: [] },
  view: [
    {
      $type: "rapidEntityForm",
      entityCode: "BpmInstance",
      mode: "view",
      column: 3,
      extraProperties: ["jobs", "currentJob"],
      items: [
        {
          type: "auto",
          code: "code",
        },
        {
          type: "auto",
          code: "title",
        },
        {
          type: "auto",
          code: "state",
        },
        {
          type: "auto",
          code: "initiator",
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          type: "auto",
          code: "initiatedAt",
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
          key: "jobs",
          label: "审批活动",
          children: [
            {
              $id: "activityList",
              $type: "sonicEntityList",
              entityCode: "BpmJob",
              viewMode: "table",
              selectionMode: "none",
              fixedFilters: [
                {
                  operator: "eq",
                  field: "instance_id",
                  value: "",
                },
              ],
              extraProperties: ["tasks"],
              pageSize: -1,
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
                  code: "name",
                },
                {
                  type: "auto",
                  code: "kind",
                  width: "100px",
                },
                {
                  type: "auto",
                  code: "state",
                  width: "100px",
                },
                {
                  type: "auto",
                  code: "startedAt",
                  width: "150px",
                },
                {
                  type: "auto",
                  code: "completedAt",
                  width: "150px",
                },
                {
                  type: "auto",
                  code: "resolution",
                  width: "100px",
                },
              ],
              $exps: {
                "fixedFilters[0].value": "$rui.parseQuery().id",
              },
            },
          ],
        },
      ],
    },
    {
      $type: "rapidToolbar",
      items: [
        {
          $id: "btnApprove",
          $type: "rapidToolbarFormModalButton",
          text: "批准",
          actionStyle: "primary",
          size: "large",
          modalTitle: "审批意见",
          modalBody: [
            {
              $type: "rapidEntityForm",
              $id: "approveForm",
              entityCode: "BpmManualTask",
              mode: "edit",
              layout: "vertical",
              items: [
                {
                  type: "textarea",
                  code: "comment",
                  label: null,
                },
              ],
              $exps: {
                "fixedFields.$operation.type": "'approve'",
                "fixedFields.$stateProperties": "['state']",
                "fixedFields.state": "'finished'",
                "fixedFields.resolution": "'approved'",
                entityId: "_.get($page.getStore('pendingTasks'), 'data.list[0].id')",
              },
              onSaveSuccess: [
                {
                  $action: "setVars",
                  vars: {
                    "modal-open": false,
                  },
                },
                {
                  $action: "reloadPage",
                },
              ],
            },
          ],
          onModalOpen: [
            {
              $action: "loadScopeData",
              scopeId: "btnApprove-scope",
            },
            {
              $action: "sendComponentMessage",
              componentId: "approveForm",
              message: {
                name: "resetFields",
              },
            },
          ],
          onModalOk: [
            {
              $action: "sendComponentMessage",
              componentId: "approveForm",
              message: {
                name: "submit",
              },
            },
          ],
          $exps: {
            _hidden: "!_.get($page.getStore('pendingTasks'), 'data.list[0]')",
          },
        },
        {
          $id: "btnReject",
          $type: "rapidToolbarFormModalButton",
          text: "拒绝",
          danger: true,
          size: "large",
          modalTitle: "审批意见",
          modalBody: [
            {
              $type: "rapidEntityForm",
              $id: "approveForm",
              entityCode: "BpmManualTask",
              mode: "edit",
              layout: "vertical",
              items: [
                {
                  type: "textarea",
                  code: "comment",
                  label: null,
                },
              ],
              $exps: {
                "fixedFields.$operation.type": "'approve'",
                "fixedFields.$stateProperties": "['state']",
                "fixedFields.state": "'finished'",
                "fixedFields.resolution": "'rejected'",
                entityId: "_.get($page.getStore('pendingTasks'), 'data.list[0].id')",
              },
              onSaveSuccess: [
                {
                  $action: "setVars",
                  vars: {
                    "modal-open": false,
                  },
                },
                {
                  $action: "reloadPage",
                },
              ],
            },
          ],
          onModalOpen: [
            {
              $action: "loadScopeData",
              scopeId: "btnReject-scope",
            },
            {
              $action: "sendComponentMessage",
              componentId: "approveForm",
              message: {
                name: "resetFields",
              },
            },
          ],
          onModalOk: [
            {
              $action: "sendComponentMessage",
              componentId: "approveForm",
              message: {
                name: "submit",
              },
            },
          ],
          $exps: {
            _hidden: "!_.get($page.getStore('pendingTasks'), 'data.list[0]')",
          },
        },
      ],
    },
  ],
  stores: [
    {
      type: "entityStore",
      name: "pendingTasks",
      entityCode: "BpmManualTask",
      properties: ["id", "job", "assignee", "state"],
      filters: [
        {
          operator: "eq",
          field: "job_id",
          value: "",
        },
        {
          operator: "eq",
          field: "assignee_id",
          value: "",
        },
        {
          operator: "eq",
          field: "state",
          value: "pending",
        },
      ],
      orderBy: [
        {
          field: "id",
          desc: true,
        },
      ],
      $exps: {
        "filters[0].value": "$rui.parseQuery().currentJobId || 0",
        "filters[1].value": "_.get(me, 'profile.id')",
      },
    },
  ],
};

export default page;

import type { RapidPage, SonicEntityListRockConfig } from "@ruiapp/rapid-extension";

const page: RapidPage = {
  code: "bpm_my_finished_approval_list",
  name: "已处理审批",
  title: "已处理审批",
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "BpmInstance",
      viewMode: "table",
      extraProperties: ["code", "process", 'currentJob'],
      fixedFilters: [
        {
          operator: "eq",
          field: "state",
          value: "finished",
        },
        {
          operator: "exists",
          field: "currentJob",
          filters: [
            {
              operator: "exists",
              field: "tasks",
              filters: [
                {
                  operator: "eq",
                  field: "assignee_id",
                  value: "",
                },
                {
                  operator: "eq",
                  field: "state",
                  value: "finished",
                }
              ]
            }
          ]
        }
      ],
      orderBy: [
        {
          field: "id",
          desc: true,
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
          code: "title",
          fixed: "left",
          width: "250px",
          cell: [
            {
              $type: "antdListItemMeta",
              title: {
                $type: "anchor",
                href: "",
                children: "",
              },
              $exps: {
                "title.children": "$slot.record.title",
                "title.href": "'/pages/bpm_instance_details?id=' + $slot.record.id + '&currentJobId=' + _.get($slot.record, 'currentJob.id', '')",
                description: "'流程编号：' + $slot.record.code",
              },
            },
          ],
        },
        {
          type: "auto",
          code: "formData",
          title: "摘要",
          minWidth: "200px",
          rendererType: "rapidDescriptionsRenderer",
          rendererProps: {
            size: "small",
            $exps: {
              items: "_.get($slot.record, 'process.listConfig.listSummaryColumnRenderProps.items') || []",
            },
          },
        },
        {
          type: "auto",
          code: "initiator",
          width: "150px",
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          type: "auto",
          code: "initiatedAt",
          width: "150px",
        },
        {
          type: "auto",
          code: "state",
          width: "150px",
        },
      ],
      $exps: {
        "fixedFilters[1].filters[0].filters[0].value": "_.get(me, 'profile.id')",
      }
    } as SonicEntityListRockConfig,
  ],
};

export default page;

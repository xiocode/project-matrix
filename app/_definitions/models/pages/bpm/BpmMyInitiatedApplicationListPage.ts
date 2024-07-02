import type { RapidPage } from "@ruiapp/rapid-extension";

const page: RapidPage = {
  code: "bpm_my_initiated_application_list",
  name: "我发起的审批",
  title: "我发起的审批",
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "BpmInstance",
      viewMode: "table",
      extraProperties: ["code", "process", 'currentJob'],
      fixedFilters: [
        {
          operator: "eq",
          field: "initiator_id",
          value: "",
        },
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
        "fixedFilters[0].value": "_.get(me, 'profile.id')",
      }
    },
  ],
};

export default page;

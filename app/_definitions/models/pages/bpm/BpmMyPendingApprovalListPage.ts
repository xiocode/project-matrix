import type { RapidPage } from "@ruiapp/rapid-extension";

const page: RapidPage = {
  code: "bpm_my_pending_approval_list",
  name: "待处理审批",
  title: "待处理审批",
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "BpmInstance",
      viewMode: "table",
      extraProperties: ["code", "process", 'currentActivity'],
      orderBy: [
        {
          field: "id",
          desc: true,
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
                "title.href": "'/pages/bpm_instance_details?id=' + $slot.record.id + '&currentActivityId=' + _.get($slot.record, 'currentActivity.id', '')",
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
    },
  ],
};

export default page;

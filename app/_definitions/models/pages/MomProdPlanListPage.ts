import { cloneDeep } from 'lodash';
import type { RapidPage, RapidEntityFormConfig } from '@ruiapp/rapid-extension';

const formConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      type: 'auto',
      code: 'code',
    },
    {
      type: 'auto',
      code: 'scheduledStartDate',
    },
    {
      type: 'auto',
      code: 'scheduledFinishDate',
    },
    {
      type: 'auto',
      code: 'scheduleState',
    },
    {
      type: 'auto',
      code: 'executionState',
    },
  ],
}

const page: RapidPage = {
  code: 'mom_prod_plan_list',
  name: '生产计划列表',
  title: '生产计划',
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "MomProductionPlan",
      viewMode: "table",
      listActions: [
        {
          $type: "sonicToolbarNewEntityButton",
          text: "新建",
          icon: "PlusOutlined",
          actionStyle: "primary",
        }
      ],
      extraActions: [
        {
          $type: "sonicToolbarFormItem",
          formItemType: "search",
          placeholder: "Search",
          actionEventName: "onSearch",
          filterMode: "contains",
          filterFields: ["code"],
        }
      ],
      columns: [
        {
          type: 'link',
          code: 'code',
          fixed: 'left',
          // rendererType: "link",
          rendererProps: {
            url: "/pages/mom_prod_plan_details?id={{id}}",
          },
        },
        {
          type: 'auto',
          code: 'scheduledStartDate',
          width: '100px',
        },
        {
          type: 'auto',
          code: 'scheduledFinishDate',
          width: '100px',
        },
        {
          type: 'auto',
          code: 'scheduleState',
          width: '100px',
        },
        {
          type: 'auto',
          code: 'executionState',
          width: '100px',
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
          entityCode: "MomProductionPlan",
        },
      ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
      searchForm: {
        entityCode: 'OcUser',
        items: [
          {
            type: 'auto',
            code: 'code',
            filterMode: 'contains',
          },
        ],
      },
    },
  ],
};

export default page;

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
      code: 'name',
    },
    {
      type: 'auto',
      code: 'description',
    },
    {
      type: 'auto',
      code: 'category',
    },
    {
      type: 'auto',
      code: 'customer',
    },
    {
      type: 'auto',
      code: 'owner',
    },
    {
      type: 'auto',
      code: 'salesman',
    },
    {
      type: 'auto',
      code: 'projectManager',
    },
    {
      type: 'auto',
      code: 'distributor',
    },
    {
      type: 'auto',
      code: 'stage',
    },
    {
      type: 'auto',
      code: 'state',
    },
  ],
}

const page: RapidPage = {
  code: 'pm_project_list',
  name: '项目列表',
  title: '项目列表',
  permissionCheck: {any: ["pmProject.view", "pmProject.new", "pmProject.manage", "pmProject.delete"]},
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "PmProject",
      viewMode: "table",
      listActions: [
        {
          $type: "sonicToolbarNewEntityButton",
          text: "新建",
          icon: "PlusOutlined",
          actionStyle: "primary",
          $permissionCheck: 'pmProject.new',
        }
      ],
      extraActions: [
        {
          $type: "sonicToolbarFormItem",
          formItemType: "search",
          placeholder: "Search",
          actionEventName: "onSearch",
          filterMode: "contains",
          filterFields: ["code", "name"],
        }
      ],
      pageSize: 20,
      orderBy: [
        {
          field: 'code',
          desc: true,
        }
      ],
      columns: [
        {
          type: 'link',
          code: 'code',
          fixed: 'left',
          width: '100px',
          rendererProps: {
            url: "/pages/pm_project_details?id={{id}}",
          },
        },
        {
          type: 'link',
          code: 'name',
          fixed: 'left',
          width: '200px',
          rendererProps: {
            url: "/pages/pm_project_details?id={{id}}",
          },
        },
        {
          type: 'auto',
          code: 'category',
          fieldName: 'category.name',
          width: '100px',
        },
        {
          type: 'auto',
          code: 'customer',
          fieldName: 'customer.name',
          width: '150px',
        },
        {
          type: 'auto',
          code: 'owner',
          fieldName: 'owner.name',
          width: '100px',
        },
        {
          type: 'auto',
          code: 'salesman',
          fieldName: 'salesman.name',
          width: '100px',
        },
        {
          type: 'auto',
          code: 'projectManager',
          fieldName: 'projectManager.name',
          width: '100px',
        },
        {
          type: 'auto',
          code: 'distributor',
          fieldName: 'distributor.name',
          width: '150px',
        },
        {
          type: 'auto',
          code: 'stage',
          width: '100px',
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
      actions: [
        {
          $type: "sonicRecordActionEditEntity",
          code: 'edit',
          actionType: "edit",
          actionText: '修改',
          $permissionCheck: 'pmProject.manage',
        },
        {
          $type: "sonicRecordActionDeleteEntity",
          code: 'delete',
          actionType: 'delete',
          actionText: '删除',
          dataSourceCode: "list",
          entityCode: "PmProject",
          $permissionCheck: 'pmProject.delete',
        },
      ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
    },
  ],
};

export default page;

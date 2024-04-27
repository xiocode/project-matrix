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
      code: 'material',
      formControlProps: {
        listTextFormat: "{{code}} {{name}}",
        listFilterFields: ['label']
      }
    },
    {
      type: 'auto',
      code: 'lotNum',
    },
    {
      type: 'auto',
      code: 'serialNum',
    },
    {
      type: 'auto',
      code: 'sender',
    },
    {
      type: 'auto',
      code: 'state',
    },
  ],
}

const page: RapidPage = {
  code: 'mom_inspection_sheet_list',
  name: '检验记录列表',
  title: '检验记录',
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "MomInspectionSheet",
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
      orderBy: [
        {
          field: "id",
          desc: true,
        },
      ],
      columns: [
        {
          type: 'auto',
          code: 'state',
          width: '100px',
        },
        {
          type: 'link',
          code: 'code',
          width: '200px',
          fixed: 'left',
          rendererType: "link",
          rendererProps: {
            url: "/pages/mom_inspection_sheet_details?id={{id}}",
          },
        },
        {
          type: 'auto',
          code: 'material',
          fixed: 'left',
          rendererType: "anchor",
          rendererProps: {
            children: {
              $type: 'materialLabelRenderer',
              $exps: {
                value: '$slot.value',
              }
            },
            $exps: {
              href: "$rui.execVarText('/pages/base_material_details?id={{id}}', $slot.value)",
            },
          },
        },
        {
          type: 'auto',
          code: 'lotNum',
          width: '150px',
        },
        {
          type: 'auto',
          code: 'serialNum',
          width: '150px',
        },
        {
          type: 'auto',
          code: 'sender',
          width: '150px',
          rendererProps: {
            format: '{{name}}',
          },
        },
        {
          type: 'auto',
          code: 'inspector',
          width: '150px',
          rendererProps: {
            format: '{{name}}',
          },
        },
        {
          type: 'auto',
          code: 'reviewer',
          width: '150px',
          rendererProps: {
            format: '{{name}}',
          },
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
          entityCode: "MomInspectionSheet",
        },
      ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
      $exps: {
        'newForm.fixedFields.state': '"pending"',
      }
    },
  ],
};

export default page;

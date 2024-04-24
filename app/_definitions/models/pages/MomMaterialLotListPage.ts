import { cloneDeep } from 'lodash';
import type { RapidPage, RapidEntityFormConfig } from '@ruiapp/rapid-extension';

const formConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      type: 'auto',
      code: 'lotNum',
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
      code: 'sourceType',
    },
    {
      type: 'auto',
      code: 'expireTime',
    },
    {
      type: 'auto',
      code: 'qualificationState',
    },
    {
      type: 'auto',
      code: 'isAOD',
    },
  ],
}

const page: RapidPage = {
  code: 'mom_material_lot_list',
  name: '货品批次列表',
  title: '货品批次',
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "BaseLot",
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
          filterFields: ["lotNum"],
        }
      ],
      orderBy: [
        {
          field: 'createdAt',
          desc: true,
        }
      ],
      columns: [
        {
          type: 'link',
          code: 'lotNum',
          width: '200px',
          fixed: 'left',
          rendererType: "link",
          rendererProps: {
            url: "/pages/mom_material_lot_details?id={{id}}",
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
          code: 'sourceType',
          width: '100px',
        },
        {
          type: 'auto',
          code: 'expireTime',
          width: '150px',
        },
        {
          type: 'auto',
          code: 'qualificationState',
          width: '100px',
        },
        {
          type: 'auto',
          code: 'isAOD',
          width: '120px',
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
          entityCode: "BaseLot",
        },
      ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
    },
  ],
};

export default page;

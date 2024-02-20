import { cloneDeep } from 'lodash';
import type { RapidPage, RapidEntityFormRockConfig } from '@ruiapp/rapid-extension';

const mainFormConfig: Partial<RapidEntityFormRockConfig> = {
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
      code: 'orderNum',
    },
  ],
};

const secondaryFormConfig: Partial<RapidEntityFormRockConfig> = {
  items: [
    {
      type: 'auto',
      code: 'category',
    },
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
      code: 'standardCycleTime',
    },
    {
      type: 'auto',
      code: 'orderNum',
    },
  ],
};

const page: RapidPage = {
  code: 'mom_process_list',
  name: '工序列表',
  title: '工序管理',
  view: [
    {
      $type: "sonicMainSecondaryLayout",
      mainTitle: "工序分类",
      mainColSpan: 8,
      secondaryTitle: "工序",
      secondaryColSpan: 16,
      main: {
        $type: "sonicEntityList",
        entityCode: "MomProcessCategory",
        viewMode: "table",
        selectionMode: "single",
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
            filterFields: ["code", "name"],
          }
        ],
        orderBy: [
          {
            field: "orderNum",
          },
        ],
        pageSize: -1,
        columns: [
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
            code: 'orderNum',
            width: '100px',
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
            entityCode: "MomProcessCategory",
          },
        ],
        actionsColumnWidth: "80px",
        newForm: cloneDeep(mainFormConfig),
        editForm: cloneDeep(mainFormConfig),
      },
      secondary: [
        {
          $type: "sonicEntityList",
          entityCode: "MomProcess",
          viewMode: "table",
          selectionMode: "none",
          actionsColumnWidth: "80px",
          fixedFilters: [
            {
              field: "category_id",
              operator: "eq",
              value: "",
            }
          ],
          orderBy: [
            {
              field: "orderNum",
            },
          ],
          pageSize: -1,
          listActions: [
            {
              $type: "sonicToolbarNewEntityButton",
              text: "新建",
              icon: "PlusOutlined",
              actionStyle: "primary",
            },
          ],
          extraActions: [
            {
              $type: "sonicToolbarFormItem",
              formItemType: "search",
              placeholder: "Search",
              actionEventName: "onSearch",
              filterMode: "contains",
              filterFields: ["name"],
            }
          ],
          columns: [
            {
              type: 'auto',
              code: 'code',
              width: '100px',
              fixed: 'left',
            },
            {
              type: 'auto',
              code: 'name',
              fixed: 'left',
            },
            {
              type: 'auto',
              code: 'standardCycleTime',
              width: '100px',
            },
            {
              type: 'auto',
              code: 'orderNum',
              width: '100px',
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
              entityCode: "MomProcess",
            },
          ],
          newForm: cloneDeep(secondaryFormConfig),
          editForm: cloneDeep(secondaryFormConfig),
          $exps: {
            "_hidden": "!$scope.vars.activeId",
            "fixedFilters[0].value": "$scope.vars.activeId",
            "newForm.defaultFormFields.category.id": "$scope.vars.activeId"
          },
        },
      ]
    },
  ],
};

export default page;

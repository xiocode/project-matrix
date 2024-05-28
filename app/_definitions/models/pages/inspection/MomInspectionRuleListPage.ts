import { cloneDeep } from "lodash";
import type { RapidPage, RapidEntityFormConfig } from "@ruiapp/rapid-extension";

const formConfig: Partial<RapidEntityFormConfig> = {
    items: [
        {
            type: "auto",
            code: "category",
        },
        {
            type: "auto",
            code: "material",
        },
        {
            type: "auto",
            code: "routeProcess",
        },
        {
            type: "auto",
            code: "config",
        },
    ],
};

const page: RapidPage = {
    code: "mom_inspection_rule_list",
    name: "检验规则",
    title: "检验规则",
    permissionCheck: { any: [] },
    view: [
        {
            $type: "sonicEntityList",
            entityCode: "MomInspectionRule",
            viewMode: "table",
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
                    filterFields: ["code"],
                },
            ],
            orderBy: [
                {
                    field: "material",
                },
            ],
            pageSize: 20,
            columns: [            
                {
                    type: "auto",
                    code: "category",
                    rendererProps: {
                        format: "{{name}}",
                    },
                },
                {
                    type: "auto",
                    code: "material",
                    rendererProps: {
                        format: "{{name}}",
                    },
                },
                {
                    type: "auto",
                    code: "routeProcess",
                    rendererProps: {
                        format: "{{aliasName}}",
                    },
                },
                {
                    type: "auto",
                    code: "config",
                },
                {
                    type: "auto",
                    code: "createdAt",
                    width: "150px",
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
                    entityCode: "MomInspectionRule",
                },
            ],
            newForm: cloneDeep(formConfig),
            editForm: cloneDeep(formConfig),
        },
    ],
};

export default page;

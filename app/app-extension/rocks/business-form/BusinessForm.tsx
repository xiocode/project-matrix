import type { RockEvent, Rock, RockEventHandler } from "@ruiapp/move-style";
import { handleComponentEvent } from "@ruiapp/move-style";
import { renderRock } from "@ruiapp/react-renderer";
import BusinessFormMeta from "./BusinessFormMeta";
import type { BusinessFormRockConfig } from "./business-form-types";
import { filter, map, uniq } from "lodash";
import { message } from "antd";
import { EntityStoreConfig, RapidFieldType, RapidFormItemConfig, RapidFormItemType, RapidFormRockConfig } from "@ruiapp/rapid-extension";

const fieldTypeToFormItemTypeMap: Record<RapidFieldType, RapidFormItemType | null> = {
  text: "text",
  boolean: "switch",
  integer: "number",
  long: "number",
  float: "number",
  double: "number",
  decimal: "number",
  date: "date",
  time: "time",
  datetime: "datetime",
  datetimetz: "datetime",
  option: "select",
  relation: "select",
  "relation[]": "select",
  json: "json",
};

const validationMessagesByFieldType: Partial<Record<RapidFieldType, any>> = {
  option: {
    // eslint-disable-next-line no-template-curly-in-string
    required: "请选择${label}",
  },

  relation: {
    // eslint-disable-next-line no-template-curly-in-string
    required: "请选择${label}",
  },
};

const defaultValidationMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: "请输入${label}",
};

export interface GenerateEntityFormItemOption {
  formItemConfig: RapidFormItemConfig;
}

function generateDataFormItem(option: GenerateEntityFormItemOption) {
  const { formItemConfig } = option;

  let valueFieldType = formItemConfig.valueFieldType || "text";

  let formItem: Omit<RapidFormItemConfig, "$type"> = {
    type: formItemConfig.type,
    code: formItemConfig.code,
    required: formItemConfig.required,
    label: formItemConfig.label,
    hidden: formItemConfig.hidden,
    valueFieldType,
    valueFieldName: formItemConfig.valueFieldName,
    multipleValues: formItemConfig.multipleValues,
    formControlType: formItemConfig.formControlType,
    formControlProps: formItemConfig.formControlProps,
    rendererType: formItemConfig.rendererType,
    rendererProps: formItemConfig.rendererProps,
    $exps: formItemConfig.$exps,
  };

  return formItem;
}

export default {
  onInit(context, props) {
    for (const formItem of props.items) {
      let fieldType = formItem.valueFieldType || "text";
      if (formItem.type === "auto") {
        // 根据字段的类型选择合适的表单项类型
        formItem.type = fieldTypeToFormItemTypeMap[fieldType] || "text";
      }
    }

    if (props.mode != "new") {
      const properties: string[] = uniq(
        props.queryProperties || [
          "id",
          ...map(
            filter(props.items, (item) => !!item.code),
            (item) => item.code,
          ),
          ...(props.extraProperties || []),
        ],
      );
      const detailDataStoreConfig: EntityStoreConfig = {
        type: "entityStore",
        name: props.dataSourceCode || "detail",
        properties,
        filters: [
          {
            field: "id",
            operator: "eq",
            value: "",
          },
        ],
        // TODO: Expression should be a static string, so that we can configure it at design time.
        $exps: {
          frozon: `!(${props.$exps?.entityId || `${props.entityId}`})`,
          "filters[0].value": props.$exps?.entityId || `${props.entityId}`,
        },
      };
      context.scope.addStore(detailDataStoreConfig);
    }
  },

  onReceiveMessage(message, state, props) {
    if (message.name === "submit") {
      message.page.sendComponentMessage(`${props.$id}-rapidForm`, {
        name: "submit",
      });
    } else if (message.name === "setFieldsValue") {
      message.page.sendComponentMessage(`${props.$id}-rapidForm`, {
        name: "setFieldsValue",
        payload: message.payload,
      });
    } else if (message.name === "resetFields") {
      message.page.sendComponentMessage(`${props.$id}-rapidForm`, {
        name: "resetFields",
      });
    } else if (message.name === "refreshView") {
      message.page.sendComponentMessage(`${props.$id}-rapidForm`, {
        name: "refreshView",
      });
    }
  },

  Renderer(context, props, state) {
    const { logger } = context;
    const formConfig = props;

    const formItems: RapidFormItemConfig[] = [];

    if (formConfig && formConfig.items) {
      formConfig.items.forEach((formItemConfig) => {
        const formItem = generateDataFormItem({ formItemConfig });

        if (formConfig.mode === "view") {
          formItem.required = false;
          formItem.mode = "display";
        } else {
          // auto config formItem.rules
          const validationMessagesOfFieldType = validationMessagesByFieldType[formItem.valueFieldType!];
          if (formItem.required) {
            if (!formItem.rules || !formItem.rules.length) {
              formItem.rules = [
                {
                  required: true,
                  message: validationMessagesOfFieldType?.required || defaultValidationMessages.required,
                },
              ];
            }
          }
        }
        formItems.push(formItem as RapidFormItemConfig);
      });
    }

    const formOnFinish: RockEventHandler[] = [
      {
        $action: "saveRapidEntity",
        customRequest: formConfig.customRequest,
        entityId: props.entityId,
        fixedFields: props.fixedFields,
        onSuccess: [
          {
            $action: "script",
            script: async (event: RockEvent) => {
              message.success("保存成功。");
              if (formConfig.onSaveSuccess) {
                await handleComponentEvent("onSaveSuccess", event.framework, event.page as any, event.scope, event.sender, formConfig.onSaveSuccess, [
                  event.args?.[0],
                ]);
              }
            },
          },
        ],
        onError: [
          {
            $action: "script",
            script: async (event: RockEvent) => {
              message.error(`保存失败：${event.args?.[0].message}`);
              if (formConfig.onSaveError) {
                await handleComponentEvent("onSaveError", event.framework, event.page as any, event.scope, event.sender, formConfig.onSaveError, [
                  event.args?.[0],
                ]);
              }
            },
          },
        ],
      },
    ];

    const rockConfig: RapidFormRockConfig = {
      $id: `${props.$id}-rapidForm`,
      $type: "rapidForm",
      size: formConfig.size,
      layout: formConfig.layout,
      column: formConfig.column,
      colon: formConfig.colon,
      actions: formConfig.actions,
      defaultFormFields: formConfig.defaultFormFields,
      onFormRefresh: formConfig.onFormRefresh,
      onValuesChange: formConfig.onValuesChange,
      items: formItems,
      dataSourceCode: formConfig.mode === "new" ? null : props.dataSourceCode || "detail",
      onFinish: formConfig.mode === "view" ? null : formOnFinish,
    };
    return renderRock({ context, rockConfig });
  },

  ...BusinessFormMeta,
} as Rock<BusinessFormRockConfig>;

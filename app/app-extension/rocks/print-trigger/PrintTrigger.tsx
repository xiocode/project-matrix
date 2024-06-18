import { IPage, RuiEvent, type Rock, type RockConfig } from "@ruiapp/move-style";
import { renderRock } from "@ruiapp/react-renderer";
import PrintTriggerMeta from "./PrintTriggerMeta";
import type { PrintTriggerRockConfig } from "./print-trigger-types";
import { message } from "antd";
import rapidApi from "~/rapidApi";
import rapidAppDefinition from "~/rapidAppDefinition";
import { useState } from "react";
import { find } from "lodash";

export default {
  onInit(context, props) {
    const printerEntity = rapidAppDefinition.entities.find((entity) => entity.code === "SvcPrinter");
    const printTemplateEntity = rapidAppDefinition.entities.find((entity) => entity.code === "MomPrintTemplate");
    const stores = [
      {
        name: "printerList",
        type: "entityStore",
        entityModel: printerEntity,
      },
      {
        name: "printTemplateList",
        type: "entityStore",
        entityModel: printTemplateEntity,
      },
    ];

    (context.scope as any).addStores(stores);
    (context.scope as any).loadData();
  },

  onResolveState(props, state) {
    const [visible, setVisible] = useState<boolean>(false);

    return {
      visible,
      open() {
        setVisible(true);
      },
      close() {
        setVisible(false);
      },
      async print(formData: { code: string; content: string }, page?: IPage) {
        try {
          await rapidApi.post(`/svc/printer/printers/${formData.code}/tasks`, {
            tasks: (props.dataSource || []).map((record) => {
              return {
                type: "zpl-label",
                name: "标签打印",
                data: replaceTemplatePlaceholder(formData.content, record),
              };
            }),
          });
          setVisible(false);

          if (page) {
            page.sendComponentMessage(`${props.$id}_print_modal_form`, { name: "resetFields" });
          }

          message.success("已下发打印指令");
        } catch (err) {
          message.error("下发打印指令失败");
        }
      },
    };
  },

  onReceiveMessage(m, state, props) {
    if (m.name === "print") {
      if (props.printerCode && props.printTemplateCode) {
        const printerStoreData = state.scope.getStore("printerList")?.data?.list || [];
        const printTemplateStoreData = state.scope.getStore("printTemplateList")?.data?.list || [];
        const printer = find(printerStoreData, (item) => item.code === props.printerCode);
        const printTemplate = find(printTemplateStoreData, (item) => item.code === props.printTemplateCode);
        if (printer && printTemplate) {
          state.print({ code: printer.code, content: printTemplate.content });
        } else {
          message.error(!printer ? `编号为：“${props.printerCode}”的打印设备未找到` : `编号为：“${props.printTemplateCode}”的打印模板不存在`);
        }
      } else {
        state.open();
      }
    }
  },

  Renderer(context, props, state) {
    const rockConfig: RockConfig = {
      $id: `${props.$id}_print_modal`,
      $type: "antdModal",
      title: "打印",
      open: state.visible,
      children: [
        {
          $id: `${props.$id}_print_modal_form`,
          $type: "rapidForm",
          items: [
            {
              type: "select",
              code: "code",
              label: "打印机",
              formControlProps: {
                listDataSourceCode: "printerList",
                listTextFieldName: "code",
                listValueFieldName: "code",
              },
              required: true,
              rules: [{ required: true, message: "打印机必选" }],
            },
            {
              type: "select",
              label: "打印模板",
              code: "content",
              formControlProps: {
                listDataSourceCode: "printTemplateList",
                listTextFieldName: "name",
                listValueFieldName: "content",
              },
              required: true,
              rules: [{ required: true, message: "打印模板机必选" }],
            },
          ],
          onFinish: [
            {
              $action: "script",
              script: async (event: RuiEvent) => {
                const formData = await event.sender.form.validateFields();
                state.print(formData, context.page);
              },
            },
          ],
        },
      ],
      onOk: [
        {
          $action: "script",
          script: (event: RuiEvent) => {
            event.page.sendComponentMessage(`${props.$id}_print_modal_form`, { name: "submit" });
          },
        },
      ],
      onCancel: [
        {
          $action: "script",
          script: () => {
            state.close();
            context.page.sendComponentMessage(`${props.$id}_print_modal_form`, { name: "resetFields" });
          },
        },
      ],
    };

    return renderRock({ context, rockConfig });
  },

  ...PrintTriggerMeta,
} as Rock<PrintTriggerRockConfig>;

function replaceTemplatePlaceholder(tpl: string, data: Record<string, any>) {
  if (!tpl) {
    return "";
  }

  let obj = data || {};

  const fields = tpl.match(/\{\{[.\w]+\}\}/g)?.map((c) => c.replace(/[\{\}\.]+/g, ""));

  return fields?.reduce((str, field) => str.replace(`{{.${field}}}`, obj[field] != null ? obj[field] : ""), tpl);
}

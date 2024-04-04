import { MoveStyleUtils, PageCommandAddComponent, type Rock, type RockChildrenConfig, type RockEvent } from "@ruiapp/move-style";
import LinkshopBuilderToolbarMeta from "./LinkshopBuilderToolbarMeta";
import type { LinkshopBuilderToolbarRockConfig } from "./linkshop-builder-toolbar-types";
import { Button, Dropdown, MenuProps, Space, message } from "antd";
import { ArrowRightOutlined, BarcodeOutlined, CalendarOutlined, CheckCircleOutlined, CheckSquareOutlined, ColumnHeightOutlined, ColumnWidthOutlined, DownSquareOutlined, FileTextOutlined, FontSizeOutlined, FormOutlined, NumberOutlined, PictureOutlined, PlusOutlined, ProfileOutlined, QrcodeOutlined, SaveFilled, SaveOutlined, StarOutlined, TableOutlined, VerticalAlignBottomOutlined, VerticalAlignMiddleOutlined, VerticalAlignTopOutlined } from "@ant-design/icons";
import { renderRockChildren } from "@ruiapp/react-renderer";
import { useCallback } from "react";
import { LinkshopAppDesignerStore } from "~/linkshop-extension/stores/LinkshopAppDesignerStore";
import { genRandomComponentId, sendDesignerCommand, sendDesignerCommand } from "~/linkshop-extension/utilities/DesignerUtility";

export default {
  Renderer(context, props: LinkshopBuilderToolbarRockConfig) {
    const { page } = context;
    const { designerStoreName } = props;
    const designerStore = context.page.getStore<LinkshopAppDesignerStore>(designerStoreName || "designerStore");

    const insertComponentItems: MenuProps['items'] = [
      {
        type: "group",
        label: "基本",
        children: [
          {
            label: '文本',
            key: 'sfText',
            icon: <FontSizeOutlined />,
          },
          {
            label: '图标',
            key: 'sfIcon',
            icon: <StarOutlined />,
          },
          {
            label: '图片',
            key: 'sfPicture',
            icon: <PictureOutlined />,
          },
          {
            label: '按钮',
            key: 'sfButton',
            icon: <ArrowRightOutlined />,
          },
        ],
      },
      {
        type: "group",
        label: "表单",
        children: [
          {
            label: '表单',
            key: 'sfForm',
            icon: <FormOutlined />,
          },
          {
            label: '文本输入',
            key: 'sfTextInput',
            icon: <FontSizeOutlined />,
          },
          {
            label: '数字输入',
            key: 'sfNumberInput',
            icon: <NumberOutlined />,
          },
          {
            label: '复选框',
            key: 'sfCheckboxGroup',
            icon: <CheckSquareOutlined />,
          },
          {
            label: '单选框',
            key: 'sfRadioGroup',
            icon: <CheckCircleOutlined />,
          },
          {
            label: '下拉选择',
            key: 'sfDropdownSelect',
            icon: <DownSquareOutlined />,
          },
          {
            label: '日期选择',
            key: 'sfDateSelect',
            icon: <CalendarOutlined />,
          },
          {
            label: '文件上传',
            key: 'sfFileUploader',
            icon: <FileTextOutlined />,
          },
        ]
      },
      {
        type: "group",
        label: "数据",
        children: [
          {
            label: '记录详情',
            key: 'sfEntityDetails',
            icon: <ProfileOutlined />,
          },
          {
            label: '数据表格',
            key: 'sfEntityTable',
            icon: <TableOutlined />,
          },
          {
            label: '条形码',
            key: 'sfBarcode',
            icon: <BarcodeOutlined />,
          },
          {
            label: '二维码',
            key: 'sfQrcode',
            icon: <QrcodeOutlined />,
          },
        ],
      },
      
    ];

    const insertComponentMenuProps = {
      items: insertComponentItems,
      onClick: (e: any) => {
        const rockType = e.key;

        const { framework, page } = context;
        const rockMeta = framework.getComponent(rockType);

        const defaultProps: any = MoveStyleUtils.getRockDefaultProps(rockMeta);
        defaultProps.$id = genRandomComponentId();

        sendDesignerCommand(page, designerStore, {
          name: "addComponent",
          payload: {
            componentType: rockType,
            parentComponentId: designerStore.selectedComponentId,
            slotPropName: designerStore.selectedSlotPropName,
            defaultProps,
          }
        } as PageCommandAddComponent);
      },
    };

    const componentsAlignMenuItems: MenuProps['items'] = [
      {
        label: '上端对齐',
        key: 'alignTop',
        icon: <VerticalAlignTopOutlined />,
      },
      {
        label: '下端对齐',
        key: 'alignBottom',
        icon: <VerticalAlignBottomOutlined />,
      },
      {
        label: '垂直居中',
        key: 'verticalAlignMiddle',
        icon: <VerticalAlignMiddleOutlined />,
      },
      {
        label: '左对齐',
        key: 'alignLeft',
        icon: <VerticalAlignTopOutlined rotate={270} />,
      },
      {
        label: '右对齐',
        key: 'alignRight',
        icon: <VerticalAlignBottomOutlined rotate={270} />,
      },
      {
        label: '水平居中',
        key: 'horizontalAlignMiddle',
        icon: <VerticalAlignMiddleOutlined rotate={90} />,
      },
    ];

    const componentsAlignMenuProps = {
      items: componentsAlignMenuItems,
      onClick: (e: any) => {
        console.log('Menu click', e)
      },
    };

    const componentsDistributeMenuItems: MenuProps['items'] = [
      {
        label: '水平分布',
        key: 'distributeHorizontally',
        icon: <ColumnWidthOutlined />,
      },
      {
        label: '垂直分布',
        key: 'distributeVertically',
        icon: <ColumnHeightOutlined />,
      },
    ];

    const clipboardRocks: RockChildrenConfig = [
      {
        $type: "antdButton",
        icon: {
          $type: "antdIcon",
          name: "ScissorOutlined",
        },
        onClick: [
          {
            $action: "script",
            script: (event: RockEvent) => {
              const designerPage = event.page;
              if (designerStore.selectedSlotPropName) {
                return;
              }

              if (!designerStore.selectedComponentId) {
                return;
              }

              sendDesignerCommand(designerPage, designerStore, {
                name: "cutComponents",
                payload: {
                  componentIds: [designerStore.selectedComponentId],
                }
              });
            },
          }
        ]
      },
      {
        $type: "antdButton",
        icon: {
          $type: "antdIcon",
          name: "CopyOutlined",
        },
        onClick: [
          {
            $action: "script",
            script: (event: RockEvent) => {
              const designerPage = event.page;
              if (designerStore.selectedSlotPropName) {
                return;
              }

              if (!designerStore.selectedComponentId) {
                return;
              }

              sendDesignerCommand(designerPage, designerStore, {
                name: "copyComponents",
                payload: {
                  componentIds: [designerStore.selectedComponentId],
                }
              });
            },
          }
        ]
      },
      {
        $type: "antdButton",
        icon: {
          $type: "antdIcon",
          name: "SnippetsOutlined",
        },
        onClick: [
          {
            $action: "script",
            script: (event: RockEvent) => {
              const designerPage = event.page;
              sendDesignerCommand(designerPage, designerStore, {
                name: "pasteComponents",
                payload: {
                  parentComponentId: designerStore.selectedComponentId,
                  slotPropName: designerStore.selectedSlotPropName,
                }
              });
            },
          }
        ]
      },
      {
        $type: "antdButton",
        icon: {
          $type: "antdIcon",
          name: "DeleteOutlined",
        },
        onClick: [
          {
            $action: "script",
            script: (event: RockEvent) => {
              const designerPage = event.page;
              if (designerStore.selectedSlotPropName) {
                return;
              }

              if (!designerStore.selectedComponentId) {
                return;
              }

              sendDesignerCommand(designerPage, designerStore, {
                name: "removeComponents",
                payload: {
                  componentIds: [designerStore.selectedComponentId],
                }
              });
            },
          }
        ]
      },
      {
        $type: "antdTooltip",
        title: "撤销",
        children: {
          $type: "antdButton",
          icon: {
            $type: "antdIcon",
            name: "UndoOutlined",
          },
        },
      },
      {
        $type: "antdTooltip",
        title: "重做",
        children: {
          $type: "antdButton",
          icon: {
            $type: "antdIcon",
            name: "RedoOutlined",
          },
        },
      },
    ];

    const componentsDistributeMenuProps = {
      items: componentsDistributeMenuItems,
      onClick: (e: any) => {
        console.log('Menu click', e)
      },
    };

    const handleSaveButtonClick = useCallback(async () => {
      await designerStore.saveAppConfig()
      message.success("保存成功。");
    }, [designerStore]);

    return <div className="lsb-toolbar">
      <div className="lsb-toolbar-items">
        <Space>
          <Button icon={<ProfileOutlined />}>添加步骤</Button>
          <Dropdown menu={insertComponentMenuProps}>
            <Button icon={<PlusOutlined />}>插入</Button>
          </Dropdown>
          <Dropdown menu={componentsAlignMenuProps}>
            <Button icon={<VerticalAlignMiddleOutlined />}>对齐</Button>
          </Dropdown>
          <Dropdown menu={componentsDistributeMenuProps}>
            <Button icon={<ColumnWidthOutlined />}>排列</Button>
          </Dropdown>
          {
            renderRockChildren({
              context,
              rockChildrenConfig: clipboardRocks,
            })
          }
        </Space>
      </div>
      <div className="lsb-toolbar-extras">
        <Space>
          <Button icon={<SaveFilled />} onClick={handleSaveButtonClick}>保存</Button>
        </Space>
      </div>
    </div>
  },

  ...LinkshopBuilderToolbarMeta,
} as Rock;
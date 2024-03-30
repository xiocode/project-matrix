import type { Rock, RockChildrenConfig, RockConfig, RockEvent } from "@ruiapp/move-style";
import ShopfloorAppBuilderMeta from "./LinkshopBuilderToolbarMeta";
import type { LinkshopBuilderToolbarRockConfig } from "./linkshop-builder-toolbar-types";
import { Button, Dropdown, MenuProps, Space } from "antd";
import { ArrowRightOutlined, BarcodeOutlined, CalendarOutlined, CheckCircleOutlined, CheckSquareOutlined, ColumnHeightOutlined, ColumnWidthOutlined, DownSquareOutlined, FileTextOutlined, FontSizeOutlined, FormOutlined, NumberOutlined, PictureOutlined, PlusOutlined, ProfileOutlined, QrcodeOutlined, SaveFilled, SaveOutlined, StarOutlined, TableOutlined, VerticalAlignBottomOutlined, VerticalAlignMiddleOutlined, VerticalAlignTopOutlined } from "@ant-design/icons";
import { DesignerStore, DesignerUtility } from "@ruiapp/designer-extension";
import { renderRockChildren } from "@ruiapp/react-renderer";

export default {
  Renderer(context, props: LinkshopBuilderToolbarRockConfig) {
    const { shopfloorApp } = props;

    const insertComponentItems: MenuProps['items'] = [
      {
        type: "group",
        label: "基本",
        children: [
          {
            label: '文本',
            key: 'text',
            icon: <FontSizeOutlined />,
          },
          {
            label: '图标',
            key: 'icon',
            icon: <StarOutlined />,
          },
          {
            label: '图片',
            key: 'picture',
            icon: <PictureOutlined />,
          },
          {
            label: '按钮',
            key: 'button',
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
            key: 'form',
            icon: <FormOutlined />,
          },
          {
            label: '文本输入',
            key: 'textInput',
            icon: <FontSizeOutlined />,
          },
          {
            label: '数字输入',
            key: 'numberInput',
            icon: <NumberOutlined />,
          },
          {
            label: '复选框',
            key: 'checkboxGroup',
            icon: <CheckSquareOutlined />,
          },
          {
            label: '单选框',
            key: 'radioGroup',
            icon: <CheckCircleOutlined />,
          },
          {
            label: '下拉选择',
            key: 'dropdownSelect',
            icon: <DownSquareOutlined />,
          },
          {
            label: '日期选择',
            key: 'dateSelect',
            icon: <CalendarOutlined />,
          },
          {
            label: '文件上传',
            key: 'fileUploader',
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
            key: 'entityDetails',
            icon: <ProfileOutlined />,
          },
          {
            label: '数据表格',
            key: 'entityTable',
            icon: <TableOutlined />,
          },
          {
            label: '条形码',
            key: 'barcode',
            icon: <BarcodeOutlined />,
          },
          {
            label: '二维码',
            key: 'qrcode',
            icon: <QrcodeOutlined />,
          },
        ],
      },
      
    ];

    const insertComponentMenuProps = {
      items: insertComponentItems,
      onClick: (e: any) => {
        console.log('Menu click', e)
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
              const designerStore = designerPage.getStore<DesignerStore>("designerStore");
              if (designerStore.selectedSlotName) {
                return;
              }

              DesignerUtility.sendDesignerCommand(designerPage, designerStore, {
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
              const designerStore = designerPage.getStore<DesignerStore>("designerStore");
              if (designerStore.selectedSlotName) {
                return;
              }

              DesignerUtility.sendDesignerCommand(designerPage, designerStore, {
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
              const designerStore = designerPage.getStore<DesignerStore>("designerStore");
              DesignerUtility.sendDesignerCommand(designerPage, designerStore, {
                name: "pasteComponents",
                payload: {
                  parentComponentId: designerStore.selectedComponentId,
                  slotName: designerStore.selectedSlotName,
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
              const designerStore = designerPage.getStore<DesignerStore>("designerStore");
              if (designerStore.selectedSlotName) {
                return;
              }

              DesignerUtility.sendDesignerCommand(designerPage, designerStore, {
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
          <Button icon={<SaveFilled />}>保存</Button>
        </Space>
      </div>
    </div>
  },

  ...ShopfloorAppBuilderMeta,
} as Rock;
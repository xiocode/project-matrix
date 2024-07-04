import { MoveStyleUtils, RockChildrenConfig, type Rock } from "@ruiapp/move-style";
import { renderRockChildren } from "@ruiapp/react-renderer";
import { Button, Modal } from "antd";
import { ReactNode, useState } from "react";
import LotNumDetailTable from "./lotnum-detail-table";
import BinNumDetailTable from "./binnum-detail-table";
import LocationDetailTable from "./location-detail-table";

export default {
  $type: "inventoryDetailViewer",

  slots: {},

  propertyPanels: [],

  Renderer(context, props) {
    const [open, setOpen] = useState<boolean>(false);

    let title: string = "明细";
    let content: ReactNode = "";
    switch (props.contentType) {
      case "lotNumDetail":
        title = "批次明细";
        content = <LotNumDetailTable record={props.record} show={open} />;
        break;
      case "binNumDetail":
        title = "组托明细";
        content = <BinNumDetailTable record={props.record} show={open} />;
        break;
      case "locationDetail":
        title = "库位明细";
        content = <LocationDetailTable record={props.record} show={open} />;
        break;
    }

    const rockChildrenConfig: RockChildrenConfig = [
      {
        ...(MoveStyleUtils.omitSystemRockConfigFields(props) as any),
        $type: "rapidTableAction",
        onAction: [
          {
            $action: "script",
            script: () => {
              setOpen(true);
            },
          },
        ],
      },
    ];

    return (
      <>
        {renderRockChildren({ context, rockChildrenConfig })}
        <Modal
          open={open}
          width={800}
          title={title}
          onCancel={() => {
            setOpen(false);
          }}
          footer={null}
          // footer={
          //   <div style={{ display: "flex", justifyContent: "flex-end" }}>
          //     <Button
          //       type="primary"
          //       onClick={() => {
          //         setOpen(false);
          //       }}
          //     >
          //       关闭
          //     </Button>
          //   </div>
          // }
        >
          {content}
        </Modal>
      </>
    );
  },
} as Rock<any>;

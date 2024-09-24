import type { Rock } from "@ruiapp/move-style";
import RapidImportXLSXMeta from "./RapidImportXLSXMeta";
import type { RapidImportXLSXRockConfig } from "./rapid-import-xlsx-types";
import { Steps } from "antd";
import { useState } from "react";
import XLSXUploader from "./XLSXUploader";
import PreviewTable from "./PreviewTable";
import UploadResult from "./UploadResult";

import "./rapid-import-xlsx-style.css";

export default {
  Renderer(context, props: RapidImportXLSXRockConfig) {
    const [sheetData, setSheetData] = useState<any>(null);
    const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

    const stepItems = [
      {
        title: "上传文件",
      },
      {
        title: "预览",
      },
      {
        title: "结果",
      },
    ];

    let stepContent = <></>;
    switch (currentStepIndex) {
      case 0:
        stepContent = (
          <XLSXUploader
            ruleCode={props.importRuleCode}
            onNextStep={(data) => {
              setSheetData(data);
              setCurrentStepIndex(1);
            }}
          />
        );
        break;
      case 1:
        stepContent = (
          <PreviewTable
            sheetData={sheetData}
            onNextStep={() => {
              setCurrentStepIndex(2);
            }}
            onPrevStep={() => {
              setSheetData(null);
              setCurrentStepIndex(0);
            }}
          />
        );
        break;
      case 2:
        stepContent = (
          <UploadResult
            onReimport={() => {
              setSheetData(null);
              setCurrentStepIndex(0);
            }}
          />
        );
        break;
    }

    return (
      <div className="rapid-import-xlsx">
        {props.title && <div className="rapid-import-xlsx--title">{props.title}</div>}
        <div style={{ marginBottom: 16 }}>
          <Steps current={currentStepIndex} items={stepItems} />
        </div>
        <div className="rapid-import-xlsx--body">{stepContent}</div>
      </div>
    );
  },

  ...RapidImportXLSXMeta,
} as Rock;

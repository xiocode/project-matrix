import { memo, useEffect, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { message, Spin, Upload } from "antd";
import { get, last, split } from "lodash";
import { RcFile } from "antd/lib/upload";
import rapidApi from "~/rapidApi";

const { Dragger } = Upload;

interface IProps {
  ruleCode: string;
  onNextStep(data: any): void;
}

const XLSXUploader = memo<IProps>((props) => {
  const { loadImportRule, loading, importRule } = useImportRule(props.ruleCode);
  const { uploadFile, uploading } = useUploadFile({
    ruleCode: props.ruleCode,
    onSuccess: props.onNextStep,
  });

  useEffect(() => {
    loadImportRule();
  }, [props.ruleCode]);

  const uploadProps: UploadProps = {
    name: "file",
    multiple: false,
    fileList: [],
    showUploadList: false,
    maxCount: 1,
    accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
    beforeUpload(file) {
      const extensionName = last(split(file.name, "."));
      if (!["xlsx", "xls"].includes(extensionName!)) {
        message.error(`${extensionName}格式不支持，请上传xlsx、xls格式的文件`);
        return false;
      }

      return file;
    },
    customRequest(option) {
      const file = option.file as RcFile;
      if (!file) {
        return;
      }

      uploadFile(file);
    },
  };

  return (
    <Spin spinning={loading || uploading}>
      <Dragger {...uploadProps} className="rapid-import-xlsx--uploadBtn">
        <p className="ant-upload-drag-icon">
          <InboxOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
        </p>
        <p className="ant-upload-text">点击或拖拽文件到当前区域进行上传</p>
        <p className="ant-upload-hint">支持 .xlsx 、.xls 文件上传</p>
      </Dragger>
      <div style={{ margin: "8px 0" }}>
        <span style={{ color: "#999" }}>示例模板下载：</span>
        <a
          download={true}
          href={`/api/download/file?fileKey=${encodeURIComponent(get(importRule, "templateFile.key"))}&fileName=${encodeURIComponent(
            get(importRule, "templateFile.name"),
          )}`}
          onClick={(e) => e.stopPropagation()}
        >
          下载模板
        </a>
      </div>
    </Spin>
  );
});

export default XLSXUploader;

function useUploadFile(options: { ruleCode: string; onSuccess?: (data: any) => void }) {
  const { ruleCode } = options;

  const [uploading, setUploading] = useState<boolean>(false);

  const uploadFile = async (file: File) => {
    if (uploading) {
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const { result, error } = await new Promise<{ result?: any; error?: { code: number; message?: string } }>((resolve) => {
      rapidApi
        .post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          const data = res.data;
          if (res.status >= 200 && res.status < 300) {
            const fileInfo = {
              key: data.fileKey,
              name: file.name,
              size: file.size,
              type: file.type,
            };

            resolve({ result: fileInfo });
          } else {
            const msg = data?.message || res.statusText || "文件上传失败";
            const code = data?.code || res.status || 400;
            resolve({ error: { code, message: msg } });
          }
        })
        .catch((err) => {
          const res = err.response;
          const msg = res?.data?.message || res?.statusText || "文件上传失败";
          const code = res?.data?.code || res?.status || 400;
          resolve({ error: { code, message: msg } });
        });
    });

    if (!error) {
      await rapidApi
        .post(`/app/import`, {
          code: ruleCode,
          file: result,
        })
        .then((res) => {
          const data = res.data;
          if (res.status >= 200 && res.status < 300) {
            options.onSuccess?.(data);
          } else {
            const msg = data?.message || res.statusText || "导入预览失败";
            message.error(msg);
          }
        })
        .catch((err) => {
          const res = err.response;
          const msg = res?.data?.message || res?.statusText || "导入预览失败";
          message.error(msg);
        })
        .finally(() => {
          setUploading(false);
        });
    } else {
      message.error(error.message);
    }
  };

  return { uploadFile, uploading };
}

function useImportRule(ruleCode: string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [importRule, setImportRule] = useState<any>(null);

  const loadImportRule = async () => {
    if (!ruleCode) {
      return;
    }

    if (loading) {
      return;
    }

    setLoading(true);
    await rapidApi
      .post("/app/import_rules/operations/find", {
        filters: [
          {
            field: "code",
            operator: "eq",
            value: ruleCode,
          },
        ],
      })
      .then((response) => {
        const data = response.data;
        if (response.status >= 200 && response.status < 300) {
          const firstItem = get(data, "list[0]");
          setImportRule(firstItem);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { loadImportRule, loading, importRule };
}

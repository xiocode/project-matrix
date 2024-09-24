import { useNavigate } from "@remix-run/react";
import { Button, Result } from "antd";
import { memo } from "react";

interface IProps {
  onReimport(): void;
}

const UploadResult = memo<IProps>((props) => {
  const navigate = useNavigate();

  return (
    <Result
      className="rapid-import-xlsx--uploadResult"
      status="success"
      title="导入成功"
      extra={[
        <Button
          key="cancel"
          type="primary"
          onClick={() => {
            navigate(-1);
          }}
        >
          确认
        </Button>,
        <Button
          key="again"
          onClick={() => {
            props.onReimport();
          }}
        >
          再次导入
        </Button>,
      ]}
    />
  );
});

export default UploadResult;

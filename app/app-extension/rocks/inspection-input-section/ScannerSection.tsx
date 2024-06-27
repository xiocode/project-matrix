import { ScanOutlined } from "@ant-design/icons";
import { useScannerByGun } from "~/hooks/use-scanner";
import { memo } from "react";
import qs from "qs";

interface InspctionQRCodeInfo {
  bt: string;
  sn: string;
  sample: string;
}

interface IProps {
  onScan(info: InspctionQRCodeInfo): void;
}

const ScannerSection = memo<IProps>((props) => {
  useScannerByGun((code) => {
    const params = qs.parse(code, { ignoreQueryPrefix: true });
    props.onScan(params as any);
  });

  return (
    <div className="pm_scanner-section">
      <div className="pm_scanner-icon">
        <ScanOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
      </div>
      <div className="pm_scanner-placeholder">请扫描检验单二维码</div>
    </div>
  );
});

export default ScannerSection;

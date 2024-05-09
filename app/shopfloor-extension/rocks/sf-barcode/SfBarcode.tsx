import { CommonProps, type Rock } from '@ruiapp/move-style';
import SfBarcodeMeta from './SfBarcodeMeta';
import type { SfBarcodeRockConfig } from './sf-barcode-types';
import { pick, subtract } from 'lodash';
import Barcode from 'react-barcode';

const BARCODE_MARGIN = 8;

export default {
  Renderer(context, props: SfBarcodeRockConfig) {
    const { value, color, height, width, displayValue } = props;

    const wrapStyle: React.CSSProperties = pick(props, CommonProps.PositionStylePropNames) as any;
    wrapStyle.position = 'absolute';

    let barcodeHeight = subtract(height, 2 * BARCODE_MARGIN);
    if (displayValue) {
      barcodeHeight = subtract(barcodeHeight, 22);
    }

    return (
      <div data-component-id={props.$id} style={wrapStyle}>
        <Barcode
          renderer="svg"
          background="#f1f2f3"
          height={barcodeHeight}
          displayValue={displayValue}
          value={value || ''}
          lineColor={color}
          margin={BARCODE_MARGIN}
        />
      </div>
    );
  },

  ...SfBarcodeMeta,
} as Rock;

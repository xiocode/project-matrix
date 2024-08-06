import { get, isNil, isNumber, sum } from "lodash";

export function fmtCharacteristicNorminal(characteristic: Record<string, any>) {
  if (!characteristic) {
    return;
  }

  const { kind, upperLimit, lowerLimit, upperTol, lowerTol, determineType } = characteristic;

  const norminal = characteristic.norminal != null ? characteristic.norminal : "";

  switch (kind) {
    // 定量
    case "quantitative":
      switch (determineType) {
        case "inLimit":
          let inLimitInfo: string = "";
          if (isNil(lowerLimit) && isNumber(upperLimit)) {
            inLimitInfo = `/${upperLimit}`;
          } else if (isNil(upperLimit) && isNumber(lowerLimit)) {
            inLimitInfo = `${lowerLimit}/`;
          } else if (isNumber(upperLimit) && isNumber(lowerLimit)) {
            inLimitInfo = lowerLimit !== upperLimit && sum([upperLimit, lowerLimit]) === 0 ? `±${upperLimit}` : `${lowerLimit}/${upperLimit}`;
          }

          return inLimitInfo ? `${norminal}(${inLimitInfo})` : norminal;
        case "inTolerance":
          let inToleranceInfo: string = "";
          if (isNil(lowerTol) && isNumber(upperTol)) {
            inToleranceInfo = `/${upperTol}`;
          } else if (isNil(upperTol) && isNumber(lowerTol)) {
            inToleranceInfo = `${lowerTol}/`;
          } else if (isNumber(upperTol) && isNumber(lowerTol)) {
            inToleranceInfo = lowerTol !== upperTol && sum([upperTol, lowerTol]) === 0 ? `±${upperTol}` : `${lowerTol}/${upperTol}`;
          }

          return inToleranceInfo ? `${norminal}(${inToleranceInfo})` : norminal;
        case "gt":
          return norminal ? `>${norminal}` : norminal;
        case "ge":
          return norminal ? `≥${norminal}` : norminal;
        case "lt":
          return norminal ? `<${norminal}` : norminal;
        case "le":
          return norminal ? `≤${norminal}` : norminal;
      }
    // 定性
    case "qualitative":
      return norminal;
  }
}

export const materialFormatStrTemplate = "{{code}}-{{name}}（{{specification}}）";

import { get, isNil, isNumber, sum } from "lodash";

export function fmtCharacteristicNorminal(characteristic: Record<string, any>) {
  if (!characteristic) {
    return;
  }

  const { kind, norminal, upperLimit, lowerLimit, upperTol, lowerTol, determineType } = characteristic;

  switch (kind) {
    // 定量
    case "quantitative":
      switch (determineType) {
        case "inLimit":
          if (isNil(lowerLimit) && isNumber(upperLimit)) {
            return `/${upperLimit}`;
          } else if (isNil(upperLimit) && isNumber(lowerLimit)) {
            return `${lowerLimit}/`;
          } else if (isNumber(upperLimit) && isNumber(lowerLimit)) {
            return lowerLimit !== upperLimit && sum([upperLimit, lowerLimit]) === 0 ? `±${upperLimit}` : `${lowerLimit}/${upperLimit}`;
          }
        case "inTolerance":
          if (isNil(lowerTol) && isNumber(upperTol)) {
            return `/${upperTol}`;
          } else if (isNil(upperTol) && isNumber(lowerTol)) {
            return `${lowerTol}/`;
          } else if (isNumber(upperTol) && isNumber(lowerTol)) {
            return lowerTol !== upperTol && sum([upperTol, lowerTol]) === 0 ? `±${upperTol}` : `${lowerTol}/${upperTol}`;
          }
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

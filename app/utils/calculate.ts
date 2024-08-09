import { eq, gt, gte, lt, lte } from "lodash";
import { decimalSum } from "./decimal";

export function calculateInspectionResult(characteristic: Record<string, any>, measuredValue: any) {
  if (!characteristic) {
    return;
  }

  const { kind, norminal, upperLimit, lowerLimit, upperTol, lowerTol, determineType } = characteristic;

  switch (kind) {
    // 定量
    case "quantitative":
      switch (determineType) {
        case "inLimit":
          return norminal - lowerLimit <= measuredValue && measuredValue <= norminal + upperLimit;
        case "inTolerance":
          return decimalSum(lowerTol, norminal) <= measuredValue && measuredValue <= decimalSum(upperTol, norminal);
        case "gt":
          return gt(measuredValue, norminal);
        case "ge":
          return gte(measuredValue, norminal);
        case "lt":
          return lt(measuredValue, norminal);
        case "le":
          return lte(measuredValue, norminal);
      }
    // 定性
    case "qualitative":
      return eq(norminal, measuredValue);
  }
}

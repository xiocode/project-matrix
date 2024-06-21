import { Decimal } from "decimal.js";
import { padEnd, padStart } from "lodash";

export function parseToStr(num: number) {
  if (typeof num !== "number") {
    return num;
  }

  const n_str = num.toString().toLowerCase();
  if (!/e/.test(n_str)) {
    return n_str;
  }

  const isDecimal = /e-/.test(n_str);

  const [n, p] = n_str.split("e");
  const index = Math.abs(+p);
  const basis = n.replace(/\./, "");

  if (!isDecimal) {
    return padEnd(basis, index + 1, "0");
  } else {
    return padStart(basis, index + basis.length, "0").replace(/^0/, "0.");
  }
}

export function getNumPlaces(num: number | string) {
  let n = new Decimal(num || 0).toNumber();
  if (!n) {
    return 0;
  }

  const places = parseToStr(n)?.replace(".", "")?.length || 0;
  return places;
}

/** 求和 */
export function decimalSum(...args: number[]): number {
  let sum: number = 0;
  args.forEach((num, index) => {
    num = +num;

    if (!isNaN(num) && isFinite(num)) {
      sum = Decimal.add(sum, num || 0).toNumber();
      return;
    }

    console.warn(`The ${index + 1} parameter is not a valid number type`);
  });

  return sum;
}

/** 求差 */
export function decimalMinus(...args: number[]): number {
  let diff: number = 0;
  args.forEach((num, index) => {
    num = +num;

    if (!isNaN(num) && isFinite(num)) {
      diff = index === 0 ? num || 0 : new Decimal(diff || 0).minus(num || 0).toNumber();
      return;
    }

    console.warn(`The ${index + 1} parameter is not a valid number type`);
  });

  return diff;
}

/** 求积 */
export function decimalTimes(...args: number[]) {
  let product: number = 0;
  args.forEach((num, index) => {
    num = +num;

    if (!isNaN(num) && isFinite(num)) {
      product = index === 0 ? num || 0 : new Decimal(product || 0).times(num || 0).toNumber();
      return;
    }

    console.warn(`The ${index + 1} parameter is not a valid number type`);
  });

  return product;
}

/** 求商 */
export function decimalDiv(...args: number[]) {
  let quotient: number = 0;
  args.forEach((num, index) => {
    num = +num;

    if (!isNaN(num) && isFinite(num)) {
      quotient = index === 0 ? num || 0 : new Decimal(quotient || 0).div(num || 0).toNumber();
      return;
    }

    console.warn(`The ${index + 1} parameter is not a valid number type`);
  });

  return quotient;
}

/** 设置小数点后的精确度 */
export function decimalFixed(num: number | string, precision = 8) {
  const n = new Decimal(+num);

  if (n.decimalPlaces() > precision) {
    return n.toFixed(precision, Decimal.ROUND_DOWN);
  }

  return num?.toString();
}

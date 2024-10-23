import {IRpdServer} from "@ruiapp/rapid-core";
import IotDBSDK from "~/sdk/iotdb/sdk";

class IotDBHelper {
  private server: IRpdServer;

  constructor(server: IRpdServer) {
    this.server = server;
  }

  public async NewAPIClient() {
    return new IotDBSDK({
      baseURL: "http://192.168.1.10:6670"
    });
  }
}


export interface IotDBQueryInput {
  sql: string,
}

export interface TimeSeriesQueryOutput {
  expressions: string[],
  column_names: string[],
  timestamps: number[],
  values: Array<Array<number | string | null>>,
}

// 定义单个时间戳和值的结构
interface DataPoint {
  timestamp: number;
  value: number | string | null;
}

// 定义每个设备下的度量数据（例如: b_temperature, a_temperature 等）
interface DeviceMetrics {
  [metricCode: string]: DataPoint[];
}

// 定义整个数据结构，设备代码 (deviceCode) 是动态的
interface DevicesData {
  [deviceCode: string]: DeviceMetrics;
}

export default IotDBHelper;

export function ParseDeviceData(payload: TimeSeriesQueryOutput): DevicesData {
  const { expressions, timestamps, values } = payload;

  // Create a result object that conforms to DevicesData
  const result: DevicesData = {};

  // Loop through expressions to dynamically extract device_code and metric_code
  expressions.forEach((expression, idx) => {
    // Match the expression to extract the device_code and metric_code
    const match = expression.match(/root\.devices\.(\w+)\.(\w+)/);

    if (match) {
      const deviceCode = match[1];   // Extract device_code (e.g., HT_2_3)
      const metricCode = match[2];   // Extract metric_code (e.g., b_temperature)

      // Initialize deviceCode and metricCode in result if not already initialized
      if (!result[deviceCode]) {
        result[deviceCode] = {};
      }
      if (!result[deviceCode][metricCode]) {
        result[deviceCode][metricCode] = [];
      }

      // For each timestamp, add the corresponding value to the result
      timestamps.forEach((timestamp, i) => {
        result[deviceCode][metricCode].push({
          timestamp: timestamp,
          value: values[idx][i] // Corresponding value at the current timestamp
        });
      });
    }
  });

  return result;
}

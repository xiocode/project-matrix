import axios, { AxiosRequestConfig, AxiosError } from "axios";
import ruiPlayerConfig from "./rui-player-config";

const rapidApi = axios.create({
  baseURL: "/api",
  validateStatus: null,
});

export default rapidApi;

export const rapidApiCancelToken = axios.CancelToken;

export { type CancelTokenSource } from "axios";

export async function rapidApiRequest(config: AxiosRequestConfig<any>) {
  const data = await new Promise<{ result?: any; error?: { code: number; message: string } }>((resolve) => {
    rapidApi
      .request(config)
      .then((response) => {
        const data = response.data;
        if (response.status >= 200 && response.status < 400) {
          resolve({ result: data });
        } else {
          resolve({
            error: {
              message: data?.message || response.statusText,
              code: data?.code || response.status,
            },
          });
        }
      })
      .catch((err: AxiosError) => {
        const response = err.response;
        const data: any = response?.data;
        resolve({
          error: {
            message: data?.message || response?.statusText,
            code: data?.code || response?.status,
          },
        });
      });
  });

  return data;
}

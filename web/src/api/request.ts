import { createAlova } from "alova";
import VueHook from "alova/vue";
import type { VueHookExportType } from "alova/vue";
import adapterFetch from "alova/fetch";
import { getToken } from "@/store/modules/auth/shared";

export const request = createAlova<
  Api.RequestConfig,
  Response,
  unknown,
  any,
  any,
  VueHookExportType<any>
>({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  statesHook: VueHook,
  requestAdapter: adapterFetch() as any,
  responded: {
    async onSuccess(response) {
      const res = (await response.json()) as Api.CommonResponseSchema;
      if (res.code === 200) {
        return res.data;
      }
      throw new Error(res.message);
    },
    onError(error, method) {
      if (method.config.unErrMsg) {
        return;
      }
      window.$message?.error?.(error.message);
    },
  },
  beforeRequest(method) {
    method.config.headers.Authorization = `Bearer ${getToken()}`;
  },
});

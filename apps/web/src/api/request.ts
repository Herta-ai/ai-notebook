import { createAlova } from 'alova'
import VueHook from 'alova/vue'
import adapterFetch from 'alova/fetch'
import { getToken } from '@/store/modules/auth/shared'

export const request = createAlova({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  statesHook: VueHook,
  requestAdapter: adapterFetch(),
  responded: {
    async onSuccess(response, method) {
      const res = (await response.json()) as Api.CommonResponse<unknown>
      if (res.success) {
        return {
          data: res.data,
          error: null,
        }
      }
      if (!method.config.meta?.unErrMsg) {
        window.$message?.error(res.message)
      }
      return {
        data: null,
        error: res.message,
      }
    },
    onError(error, method) {
      if (method.config.meta?.unErrMsg) {
        return
      }
      window.$message?.error(error.message)
    },
  },
  beforeRequest(method) {
    method.config.headers.Authorization = `Bearer ${getToken()}`
  },
})

import { createAlova } from 'alova'
import VueHook from 'alova/vue'
import adapterFetch from 'alova/fetch'
import { getToken } from '@/store/modules/user/shared'
import { useStore } from '@/hooks'

export const request = createAlova({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  statesHook: VueHook,
  requestAdapter: adapterFetch(),
  responded: {
    async onSuccess(response, method) {
      const { resetStore } = useStore('user')
      if (method.config.meta?.responseType && method.config.meta?.responseType !== 'json') {
        return await response[method.config.meta.responseType]()
      }
      const res = (await response.json()) as Api.CommonResponse<unknown>
      if (res.success) {
        return res.data
      }
      if (!method.config.meta?.unErrMsg) {
        window.$message?.error(res.message)
      }
      if (res.code === 401) {
        return resetStore()
      }
      return Promise.reject(res.message)
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

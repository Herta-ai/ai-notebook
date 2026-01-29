import 'alova'

declare module 'alova' {
  export interface AlovaCustomTypes {
    meta: {
      unErrMsg?: boolean
      responseType?: 'json' | 'text' | 'blob' | 'arrayBuffer'
    }
  }
}

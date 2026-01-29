import { invoke } from '@tauri-apps/api/core'
import type { Service } from './types'

export const service: Service = {
  profile: () => {
    return invoke<Api.User.UserInfo>('get_current_user')
  },
}

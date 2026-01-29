import { login, profile, register } from '@/api'
import type { Service } from './types'

export const service: Service = {
  login,
  register,
  profile,
}

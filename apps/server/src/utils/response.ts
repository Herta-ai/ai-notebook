import type { Result } from '../models/response.model'

export function success<T>(data: T, msg: string = 'success'): Result<T> {
  return {
    data,
    msg,
    code: 200,
    isSuccess: true,
  }
}

export function error(msg: string = 'error', code: number = 500): Result<null> {
  return {
    data: null,
    msg,
    code,
    isSuccess: false,
  }
}

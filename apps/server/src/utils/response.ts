import type { Result } from '../models/response.model'

export function success<T>(data: T, message: string = 'success'): Result<T> {
  return {
    data,
    message,
    code: 200,
    success: true,
  }
}

export function error(message: string = 'error', code: number = 500): Result<null> {
  return {
    data: null,
    message,
    code,
    success: false,
  }
}

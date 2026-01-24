export interface Result<T = any> {
  data: T | null
  msg: string
  code: number
  isSuccess: boolean
}

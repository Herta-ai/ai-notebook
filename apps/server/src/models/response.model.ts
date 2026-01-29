export interface Result<T = any> {
  data: T | null
  message: string
  code: number
  success: boolean
}

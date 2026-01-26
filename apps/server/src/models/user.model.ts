import { t } from 'elysia'
import type { RecordId } from 'surrealdb'

export interface User {
  id: RecordId
  username: string
  password?: string
  nickname: string
}

export const UserDTO = t.Object({
  username: t.String({ minLength: 4, maxLength: 20, error: '用户名长度在 4 到 20 个字符之间' }),
  password: t.String({ minLength: 4, maxLength: 20, error: '密码长度在 4 到 20 个字符之间' }),
  nickname: t.Optional(t.String()),
})

export const LoginDTO = t.Object({
  username: t.String({ minLength: 4, maxLength: 20, error: '用户名长度在 4 到 20 个字符之间' }),
  password: t.String({ minLength: 4, maxLength: 20, error: '密码长度在 4 到 20 个字符之间' }),
})

export const UpdateUserDTO = t.Object({
  nickname: t.Optional(t.String()),
  password: t.Optional(t.String({ minLength: 4, maxLength: 20, error: '密码长度在 4 到 20 个字符之间' })),
})

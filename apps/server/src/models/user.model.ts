import { t } from 'elysia'

export interface User {
  id?: string
  username: string
  password?: string
  nickname: string
}

export const UserDTO = t.Object({
  username: t.String(),
  password: t.String(),
  nickname: t.Optional(t.String()),
})

export const LoginDTO = t.Object({
  username: t.String(),
  password: t.String(),
})

export const UpdateUserDTO = t.Object({
  nickname: t.Optional(t.String()),
  password: t.Optional(t.String()),
})

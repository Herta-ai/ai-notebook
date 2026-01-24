import { Elysia } from 'elysia'
import { jwt } from '@elysiajs/jwt'
import { error } from '../utils/response'

export const authPlugin = new Elysia({ name: 'auth-plugin' })
  .use(
    jwt({
      name: 'jwt',
      secret: process.env.JWT_SECRET || 'supersecretkey',
    }),
  )
  .derive({ as: 'global' }, async ({ jwt, headers }) => {
    const auth = headers.authorization
    if (!auth || !auth.startsWith('Bearer ')) {
      return { user: null }
    }

    const token = auth.slice(7)
    const profile = await jwt.verify(token)

    if (!profile) {
      return { user: null }
    }

    return { user: profile as { id: string, username: string } }
  })
  .macro(({ onBeforeHandle }) => ({
    isAuth(enabled: boolean) {
      if (!enabled)
        return
      onBeforeHandle(({ user, set }: { user: any, set: any }) => {
        if (!user) {
          set.status = 401
          return error('Unauthorized', 401)
        }
      })
    },
  }))

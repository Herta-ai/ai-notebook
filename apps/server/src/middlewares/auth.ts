import { Elysia } from 'elysia'
import { jwt } from '@elysiajs/jwt'
import { error } from '../utils/response'

export const authPlugin = new Elysia({ name: 'auth-plugin' })
  .use(
    jwt({
      name: 'jwt',
      secret: process.env.JWT_SECRET || 'supersecretkey',
      exp: process.env.JWT_EXPIRES_IN || '7d',
    }),
  )
  .use(
    jwt({
      name: 'refreshJwt',
      secret: process.env.JWT_REFRESH_SECRET || 'supersecretrefreshkey',
      exp: process.env.JWT_REFRESH_EXPIRES_IN || '14d',
    }),
  )
  .derive({ as: 'global' }, async ({ jwt, headers }) => {
    const auth = headers.authorization
    if (!auth || !auth.startsWith('Bearer ')) {
      return { user: { id: '', username: '' } }
    }

    const token = auth.slice(7)
    const profile = await jwt.verify(token)

    if (!profile) {
      return { user: { id: '', username: '' } }
    }

    return { user: profile as { id: string, username: string } }
  })
  .macro({
    isAuth(enabled: boolean) {
      if (!enabled)
        return
      return {
        beforeHandle({ user, set }: { user: any, set: any }) {
          if (!user) {
            set.status = 401
            return error('Unauthorized', 401)
          }
        },
      }
    },
  })

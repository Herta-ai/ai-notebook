import { Elysia } from 'elysia'
import { jwt } from '@elysiajs/jwt'
import { error } from '../utils/response'
import { AUTH_CONFIG, getExpInSeconds } from '../config/auth.config'

export const authPlugin = new Elysia({ name: 'auth-plugin' })
  .use(
    jwt({
      name: 'jwt',
      secret: AUTH_CONFIG.jwt.secret,
      exp: AUTH_CONFIG.jwt.exp,
    }),
  )
  .use(
    jwt({
      name: 'refreshJwt',
      secret: AUTH_CONFIG.refreshJwt.secret,
      exp: AUTH_CONFIG.refreshJwt.exp,
    }),
  )
  .derive({ as: 'global' }, async ({ jwt, refreshJwt, cookie: { accessToken, refreshToken } }) => {
    // 1. Try verify access token
    if (accessToken.value) {
      const profile = await jwt.verify(accessToken.value as string)
      if (profile) {
        return { user: profile as { id: string, username: string } }
      }
    }

    // 2. If access token invalid, try refresh token
    if (refreshToken.value) {
      const payload = await refreshJwt.verify(refreshToken.value as string)
      if (payload) {
        // Refresh access token
        const newAccessToken = await jwt.sign({
          id: payload.id as string,
          username: payload.username as string,
        })

        accessToken.set({
          value: newAccessToken,
          httpOnly: true,
          path: '/',
          maxAge: getExpInSeconds(AUTH_CONFIG.jwt.exp),
        })

        return { user: { id: payload.id as string, username: payload.username as string } }
      }
    }

    return { user: null }
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

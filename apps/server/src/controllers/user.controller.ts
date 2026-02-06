import { Elysia } from 'elysia'
import { LoginDTO, UpdateUserDTO, UserDTO } from '../models/user.model'
import * as userService from '../services/user.service'
import { error, success } from '../utils/response'
import { authPlugin } from '../middlewares/auth'
import { surreal } from '../utils/db'
import { AUTH_CONFIG, getExpInSeconds } from '../config/auth.config'

export const userController = new Elysia({ prefix: '/user' })
  .use(surreal)
  .use(authPlugin)

  // Register
  .post('/register', async ({ db, jwt, refreshJwt, body, cookie: { accessToken, refreshToken } }) => {
    const { username, password, nickname } = body

    // Check if user exists
    const existing = await userService.findByUsername(db, username)
    if (existing) {
      return error('User already exists', 400)
    }

    // Hash password
    const hashedPassword = await Bun.password.hash(password)

    const user = await userService.createUser(db, {
      username,
      password: hashedPassword,
      nickname: nickname || username,
    })

    // Remove password from response
    const token = await jwt.sign({
      id: user.id.toString(),
      username: user.username,
    })
    const rToken = await refreshJwt.sign({
      id: user.id.toString(),
      username: user.username,
    })

    accessToken.set({
      value: token,
      httpOnly: true,
      path: '/',
      maxAge: getExpInSeconds(AUTH_CONFIG.jwt.exp),
    })

    refreshToken.set({
      value: rToken,
      httpOnly: true,
      path: '/',
      maxAge: getExpInSeconds(AUTH_CONFIG.refreshJwt.exp),
    })

    const { password: _, ...safeUser } = user as any
    return success(safeUser, 'User registered successfully')
  }, {
    body: UserDTO,
  })

  // Login
  .post('/login', async ({ db, jwt, refreshJwt, body, cookie: { accessToken, refreshToken } }) => {
    const { username, password } = body

    const user = await userService.findByUsername(db, username)
    if (!user || !user.password) {
      return error('Invalid credentials', 401)
    }

    const isMatch = await Bun.password.verify(password, user.password)
    if (!isMatch) {
      return error('Invalid credentials', 401)
    }

    const token = await jwt.sign({
      id: user.id.toString(),
      username: user.username,
    })
    const rToken = await refreshJwt.sign({
      id: user.id.toString(),
      username: user.username,
    })

    accessToken.set({
      value: token,
      httpOnly: true,
      path: '/',
      maxAge: getExpInSeconds(AUTH_CONFIG.jwt.exp),
    })

    refreshToken.set({
      value: rToken,
      httpOnly: true,
      path: '/',
      maxAge: getExpInSeconds(AUTH_CONFIG.refreshJwt.exp),
    })

    const { password: _, ...safeUser } = user as any
    return success(safeUser, 'Login successful')
  }, {
    body: LoginDTO,
  })

// Refresh token endpoint removed

  // Get Profile
  .get('/profile', async ({ db, user }) => {
    const userProfile = await userService.findById(db, user.id)
    if (!userProfile)
      return error('Unauthorized', 401)

    const { password: _, ...safeUser } = userProfile as any
    return success(safeUser)
  }, {
    isAuth: true,
  })

  // Update Profile
  .put('/profile', async ({ db, user, body }) => {
    if (!user)
      return error('Unauthorized', 401)

    const updateData: any = {}
    if (body.nickname)
      updateData.nickname = body.nickname
    if (body.password) {
      updateData.password = await Bun.password.hash(body.password)
    }

    const updated = await userService.updateUser(db, user.id, updateData)
    if (!updated)
      return error('Update failed', 500)

    const { password: _, ...safeUser } = updated as any
    return success(safeUser, 'Profile updated successfully')
  }, {
    body: UpdateUserDTO,
    isAuth: true,
  })

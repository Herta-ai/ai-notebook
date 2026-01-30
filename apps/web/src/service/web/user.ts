import { request } from './request'

/**
 * Login
 *
 * @param username User name
 * @param password Password
 */
export function login(username: string, password: string): Promise<Api.User.LoginToken> {
  return request.Post('/user/login', {
    username,
    password,
  })
}

/**
 * Register
 *
 * @param username User name
 * @param password Password
 */
export function register(username: string, password: string): Promise<Api.User.LoginToken> {
  return request.Post('/user/register', {
    username,
    password,
  })
}

/** Get user info */
export function profile(): Promise<Api.User.UserInfo> {
  return request.Get<Api.User.UserInfo>('/user/profile')
}

import { request } from './request'

/**
 * Login
 *
 * @param username User name
 * @param password Password
 */
export function fetchLogin(username: string, password: string) {
  return request.Post<Api.CommonResponse<Api.User.LoginToken>>('/auth/login', {
    username,
    password,
  })
}

/** Get user info */
export function fetchGetUserInfo() {
  return request.Get<Api.CommonResponse<Api.User.UserInfo>>('/auth/getUserInfo')
}

/**
 * Refresh token
 *
 * @param refreshToken Refresh token
 */
export function fetchRefreshToken(refreshToken: string) {
  return request.Post<Api.CommonResponse<Api.User.LoginToken>>('/auth/refreshToken', {
    refreshToken,
  })
}

import { request } from './request';

/**
 * Login
 *
 * @param userName User name
 * @param password Password
 */
export function fetchLogin(userName: string, password: string) {
  return request.Post<Api.User.LoginToken>('/auth/login', {
      userName,
      password
    });
}

/** Get user info */
export function fetchGetUserInfo() {
  return request.Get<Api.User.UserInfo>('/auth/getUserInfo');
}

/**
 * Refresh token
 *
 * @param refreshToken Refresh token
 */
export function fetchRefreshToken(refreshToken: string) {
  return request.Post<Api.User.LoginToken>('/auth/refreshToken', {
      refreshToken
    });
}

/**
 * return custom backend error
 *
 * @param code error code
 * @param msg error message
 */
export function fetchCustomBackendError(code: string, msg: string) {
  return request.Get('/auth/error', { params: { code, msg} });
}

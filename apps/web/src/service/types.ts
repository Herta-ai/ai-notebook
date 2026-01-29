export interface Service {
  login?: (username: string, password: string) => Promise<Api.User.LoginToken>
  register?: (username: string, password: string) => Promise<Api.User.LoginToken>
  profile: () => Promise<Api.User.UserInfo>
}

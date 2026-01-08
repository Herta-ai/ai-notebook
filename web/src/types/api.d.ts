declare namespace Api {
  interface RequestConfig {
    // disable error message
    unErrMsg?: boolean
  }
  interface PageInfo {
    /** current page number */
    pageNum: number
    /** page size */
    pageSize: number
    /** total number of records */
    total: number
  }
  interface CommonResponse<T> {
    code: number
    message: string
    data: T
    success: boolean
  }
  interface PageResponse<T> extends CommonResponse<T> {
    pageInfo: PageInfo
  }
  /**
   * namespace Auth
   *
   * backend api module: "auth"
   */
  namespace User {
    interface LoginToken {
      token: string
      refreshToken: string
    }

    interface UserInfo {
      userId: string
      userName: string
      roles: string[]
      buttons: string[]
    }
  }
}

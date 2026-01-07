declare namespace Api {
  interface RequestConfig {
    // disable error message
    unErrMsg?: boolean;
  }
  interface CommonResponseSchema {
    code: number;
    message: string;
    data: any;
    success: boolean;
  }
  /**
   * namespace Auth
   *
   * backend api module: "auth"
   */
  namespace User {
    interface LoginToken {
      token: string;
      refreshToken: string;
    }

    interface UserInfo {
      userId: string;
      userName: string;
      roles: string[];
      buttons: string[];
    }
  }
}

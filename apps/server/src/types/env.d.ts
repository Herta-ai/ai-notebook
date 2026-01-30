declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /**
       * 是否使用node内嵌引擎
       * node内嵌引擎不需要配置用户名密码
       */
      SURREAL_NODE_ENGINE: 'true' | string
      SURREAL_URL: string
      SURREAL_USER: string
      SURREAL_PASS: string
      SURREAL_NS: string
      SURREAL_DB: string
      JWT_SECRET: string
      JWT_REFRESH_SECRET: string
      JWT_EXPIRES_IN: string
      JWT_REFRESH_EXPIRES_IN: string
    }
  }
}

export {}

/**
 * Namespace Env
 *
 * It is used to declare the type of the import.meta object
 */
declare namespace Env {
  /** The router history mode */
  type RouterHistoryMode = 'hash' | 'history' | 'memory'

  /** Interface for import.meta */
  interface ImportMeta extends ImportMetaEnv {
    /** The base url of the application */
    readonly VITE_BASE_URL: string
    /** The title of the application */
    readonly VITE_APP_TITLE: string
    /** The description of the application */
    readonly VITE_APP_DESC: string
    /** The router history mode */
    readonly VITE_ROUTER_HISTORY_MODE?: RouterHistoryMode
    /** Used to differentiate storage across different domains */
    readonly VITE_STORAGE_PREFIX?: string
    /** used to control whether the program automatically detects updates */
    readonly VITE_AUTOMATICALLY_DETECT_UPDATE: CommonType.YesOrNo
    /** show proxy url log in terminal */
    readonly VITE_PROXY_LOG?: CommonType.YesOrNo
    /** backend api base url */
    readonly VITE_API_BASE_URL: string
    /**
     * Application mode
     *
     * WEB: The application is running in the browser
     *
     * TAURI: The application is running in the tauri environment
     */
    readonly VITE_APP_MODE: 'WEB' | 'TAURI'
  }
}

interface ImportMeta {
  readonly env: Env.ImportMeta
}

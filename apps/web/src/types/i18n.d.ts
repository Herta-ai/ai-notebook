/**
 * I18n namespace
 *
 * Locales type
 */
declare namespace I18n {
  type RouteKey = Route.RouteKey

  type LangType = 'en-US' | 'zh-CN'

  interface LangOption {
    label: string
    key: LangType
  }

  type I18nRouteKey = Exclude<Route.RouteKey, 'root' | 'not-found'>

  interface FormMsg {
    required: string
    invalid: string
  }

  interface Schema {
    system: {
      title: string
      updateTitle: string
      updateContent: string
      updateConfirm: string
      updateCancel: string
    }
    common: {
      action: string
      add: string
      addSuccess: string
      backToHome: string
      batchDelete: string
      cancel: string
      close: string
      check: string
      expandColumn: string
      columnSetting: string
      config: string
      confirm: string
      delete: string
      deleteSuccess: string
      confirmDelete: string
      edit: string
      warning: string
      error: string
      index: string
      keywordSearch: string
      logout: string
      logoutConfirm: string
      lookForward: string
      modify: string
      modifySuccess: string
      noData: string
      operate: string
      pleaseCheckValue: string
      refresh: string
      reset: string
      search: string
      switch: string
      tip: string
      trigger: string
      update: string
      updateSuccess: string
      userCenter: string
      yesOrNo: {
        yes: string
        no: string
      }
    }
    request: {
      logout: string
      logoutMsg: string
      logoutWithModal: string
      logoutWithModalMsg: string
      refreshToken: string
      tokenExpired: string
    }
    theme: {
      themeDrawerTitle: string
      tabs: {
        appearance: string
        layout: string
        general: string
        preset: string
      }
      appearance: {
        themeSchema: { title: string } & Record<UnionKey.ThemeScheme, string>
        grayscale: string
        colorWeakness: string
        themeColor: {
          title: string
          followPrimary: string
        } & Record<Theme.ThemeColorKey, string>
        recommendColor: string
        recommendColorDesc: string
        themeRadius: {
          title: string
        }
        preset: {
          title: string
          apply: string
          applySuccess: string
          [key: string]:
            | {
              name: string
              desc: string
            }
            | string
        }
      }
      layout: {
        tab: {
          title: string
          visible: string
          cache: string
          cacheTip: string
          height: string
          mode: { title: string } & Record<UnionKey.ThemeTabMode, string>
          closeByMiddleClick: string
          closeByMiddleClickTip: string
        }
        header: {
          title: string
          height: string
          breadcrumb: {
            visible: string
            showIcon: string
          }
        }
        sider: {
          title: string
          inverted: string
          width: string
          collapsedWidth: string
          mixWidth: string
          mixCollapsedWidth: string
          mixChildMenuWidth: string
          autoSelectFirstMenu: string
          autoSelectFirstMenuTip: string
        }
        footer: {
          title: string
          visible: string
          fixed: string
          height: string
          right: string
        }
        content: {
          title: string
          scrollMode: { title: string, tip: string } & Record<
            UnionKey.ThemeScrollMode,
            string
          >
          page: {
            animate: string
            mode: { title: string } & Record<
              UnionKey.ThemePageAnimateMode,
              string
            >
          }
          fixedHeaderAndTab: string
        }
      }
      general: {
        title: string
        watermark: {
          title: string
          visible: string
          text: string
          enableUserName: string
          enableTime: string
          timeFormat: string
        }
        multilingual: {
          title: string
          visible: string
        }
        globalSearch: {
          title: string
          visible: string
        }
      }
      configOperation: {
        copyConfig: string
        copySuccessMsg: string
        resetConfig: string
        resetSuccessMsg: string
      }
    }
    route: Record<I18nRouteKey, string>
    page: {
      login: {
        form: {
          required: string
          username: FormMsg
          password: FormMsg
          confirmPassword: FormMsg
        }
        common: {
          loginOrRegister: string
          usernamePlaceholder: string
          passwordPlaceholder: string
          confirmPasswordPlaceholder: string
          confirm: string
          validateSuccess: string
          loginSuccess: string
          welcomeBack: string
        }
        login: {
          title: string
          rememberMe: string
          forgetPassword: string
          register: string
        }
        register: {
          title: string
          agreement: string
          protocol: string
          policy: string
        }
      }
      home: {
        branchDesc: string
        greeting: string
        weatherDesc: string
        projectCount: string
        todo: string
        message: string
        downloadCount: string
        registerCount: string
        schedule: string
        study: string
        work: string
        rest: string
        entertainment: string
        visitCount: string
        turnover: string
        dealCount: string
        projectNews: {
          title: string
          moreNews: string
          desc1: string
          desc2: string
          desc3: string
          desc4: string
          desc5: string
        }
        creativity: string
      }
    }
    dropdown: Record<Global.DropdownKey, string>
    icon: {
      themeConfig: string
      themeSchema: string
      lang: string
      fullscreen: string
      fullscreenExit: string
      reload: string
      collapse: string
      expand: string
      pin: string
      unpin: string
    }
    datatable: {
      itemCount: string
    }
  }

  type GetI18nKey<
    T extends Record<string, unknown>,
    K extends keyof T = keyof T,
  > = K extends string
    ? T[K] extends Record<string, unknown>
      ? `${K}.${GetI18nKey<T[K]>}`
      : K
    : never

  type I18nKey = GetI18nKey<Schema>

  type TranslateOptions<Locales extends string>
    = import('vue-i18n').TranslateOptions<Locales>

  interface $T {
    (key: I18nKey): string
    (
      key: I18nKey,
      plural: number,
      options?: TranslateOptions<LangType>,
    ): string
    (
      key: I18nKey,
      defaultMsg: string,
      options?: TranslateOptions<I18nKey>,
    ): string
    (
      key: I18nKey,
      list: unknown[],
      options?: TranslateOptions<I18nKey>,
    ): string
    (key: I18nKey, list: unknown[], plural: number): string
    (key: I18nKey, list: unknown[], defaultMsg: string): string
    (
      key: I18nKey,
      named: Record<string, unknown>,
      options?: TranslateOptions<LangType>,
    ): string
    (key: I18nKey, named: Record<string, unknown>, plural: number): string
    (key: I18nKey, named: Record<string, unknown>, defaultMsg: string): string
  }
}

import { computed, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { defineStore } from 'pinia'
import to from 'await-to-js'
import { service } from '@service'
import { useLoading, useRouterPush } from '@/hooks'
import { localStg } from '@/utils/storage'
import { SetupStoreId } from '@/const'
import { $t } from '@/locales'
import { useTabStore } from '../tab'
import { clearAuthStorage, getToken } from './shared'

const { login: fetchLogin, register: fetchRegister, profile } = service

export const useUserStore = defineStore(SetupStoreId.User, () => {
  const route = useRoute()
  // const userStore = useUserStore()
  const tabStore = useTabStore()
  const { toLogin, redirectFromLogin } = useRouterPush(false)
  const { loading: loginLoading, startLoading, endLoading } = useLoading()

  const token = ref(getToken())

  const userInfo: Api.User.UserInfo = reactive({
    userId: '',
    username: '',
    roles: [],
    buttons: [],
  })

  /** is super role in static route */
  const isStaticSuper = computed(() => {
    const { VITE_STATIC_SUPER_ROLE } = import.meta.env

    return userInfo.roles.includes(VITE_STATIC_SUPER_ROLE)
  })

  /** Is login */
  const isLogin = computed(() => Boolean(token.value))

  /** Reset auth store */
  async function resetStore() {
    recordUserId()

    clearAuthStorage()

    // userStore.$reset()

    if (!route.meta.constant) {
      await toLogin()
    }

    tabStore.cacheTabs()
  }

  /** Record the user ID of the previous login session Used to compare with the current user ID on next login */
  function recordUserId() {
    if (!userInfo.userId) {
      return
    }

    // Store current user ID locally for next login comparison
    localStg.set('lastLoginUserId', userInfo.userId)
  }

  /**
   * Check if current login user is different from previous login user If different, clear all tabs
   *
   * @returns {boolean} Whether to clear all tabs
   */
  function checkTabClear(): boolean {
    if (!userInfo.userId) {
      return false
    }

    const lastLoginUserId = localStg.get('lastLoginUserId')

    // Clear all tabs if current user is different from previous user
    if (!lastLoginUserId || lastLoginUserId !== userInfo.userId) {
      localStg.remove('globalTabs')
      tabStore.clearTabs()

      localStg.remove('lastLoginUserId')
      return true
    }

    localStg.remove('lastLoginUserId')
    return false
  }

  /**
   * Login
   *
   * @param username User name
   * @param password Password
   * @param [redirect] Whether to redirect after login. Default is `true`
   */
  async function login(username: string, password: string, redirect = true) {
    startLoading()

    const [error, loginToken] = await to(fetchLogin!(username, password))

    if (!error) {
      const pass = await loginByToken(loginToken)

      if (pass) {
        // Check if the tab needs to be cleared
        const isClear = checkTabClear()
        let needRedirect = redirect

        if (isClear) {
          // If the tab needs to be cleared,it means we don't need to redirect.
          needRedirect = false
        }
        await redirectFromLogin(needRedirect)

        window.$notification?.success({
          title: $t('page.login.common.loginSuccess'),
          content: $t('page.login.common.welcomeBack', { username: userInfo.username }),
          duration: 4500,
        })
      }
    }
    else {
      resetStore()
    }

    endLoading()
  }

  /**
   * Register
   *
   * @param username User name
   * @param password Password
   * @param [redirect] Whether to redirect after login. Default is `true`
   */
  async function register(username: string, password: string, redirect = true) {
    startLoading()

    const [error, loginToken] = await to(fetchRegister!(username, password))

    if (!error) {
      const pass = await loginByToken(loginToken)

      if (pass) {
        // Check if the tab needs to be cleared
        const isClear = checkTabClear()
        let needRedirect = redirect

        if (isClear) {
          // If the tab needs to be cleared,it means we don't need to redirect.
          needRedirect = false
        }
        await redirectFromLogin(needRedirect)

        window.$notification?.success({
          title: $t('page.login.common.loginSuccess'),
          content: $t('page.login.common.welcomeBack', { username: userInfo.username }),
          duration: 4500,
        })
      }
    }
    else {
      resetStore()
    }

    endLoading()
  }

  async function loginByToken(loginToken: Api.User.LoginToken) {
    // 1. stored in the localStorage, the later requests need it in headers
    localStg.set('token', loginToken.token)

    // 2. get user info
    const pass = await getUserInfo()

    if (pass) {
      token.value = loginToken.token

      return true
    }

    return false
  }

  async function getUserInfo() {
    const [error, info] = await to(profile())

    if (!error) {
      // update store
      Object.assign(userInfo, info)

      return true
    }

    return false
  }

  async function initUserInfo() {
    const hasToken = getToken()

    if (hasToken) {
      const pass = await getUserInfo()

      if (!pass) {
        resetStore()
      }
    }
  }

  return {
    token,
    userInfo,
    isStaticSuper,
    isLogin,
    loginLoading,
    resetStore,
    login,
    register,
    initUserInfo,
  }
})

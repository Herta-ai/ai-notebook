import type {
  NavigationGuardNext,
  RouteLocationNormalized,
  Router,
} from 'vue-router'
import { useAuthStore } from '@/store/modules/auth'
import { localStg } from '@/utils/storage'

/**
 * create route guard
 *
 * @param router router instance
 */
export function createRouteGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore()

    const rootRoute: Route.RouteKey = 'root'
    const loginRoute: Route.RouteKey = 'login'
    const noAuthorizationRoute: Route.RouteKey = '403'

    const isLogin = Boolean(localStg.get('token'))
    const needLogin = !to.meta.constant
    const routeRoles = to.meta.roles || []

    const hasRole = authStore.userInfo.roles.some(role => routeRoles.includes(role))
    const hasAuth = authStore.isStaticSuper || !routeRoles.length || hasRole

    // if it is login route when logged in, then switch to the root page
    if (to.name === loginRoute && isLogin) {
      next({ name: rootRoute })
      return
    }

    // if the route does not need login, then it is allowed to access directly
    if (!needLogin) {
      handleRouteSwitch(to, from, next)
      return
    }

    // the route need login but the user is not logged in, then switch to the login page
    if (!isLogin) {
      next({ name: loginRoute, query: { redirect: to.fullPath } })
      return
    }

    // if the user is logged in but does not have authorization, then switch to the 403 page
    if (!hasAuth) {
      next({ name: noAuthorizationRoute })
      return
    }

    // switch route normally
    handleRouteSwitch(to, from, next)
  })
}

function handleRouteSwitch(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  // route with href
  if (to.meta.href) {
    window.open(to.meta.href, '_blank')

    next({ path: from.fullPath, replace: true, query: from.query, hash: to.hash })

    return
  }

  next()
}

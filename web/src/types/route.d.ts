declare namespace Route {
  interface RouteMap {
    'root': '/'
    '404': '/404'
    '403': '/403'
    'login': '/login'
    'home': '/notebook/home'
    'space': '/notebook/space'
    'setting': '/notebook/setting'
    'not-found': '/:pathMatch(.*)*'
  }

  type RouteKey = keyof RouteMap

  type RoutePath = RouteMap[RouteKey]

  /**
   * the last level route key, which has the page file
   */
  type LastLevelRouteKey = Extract<
    RouteKey,
    | 'login'
    | 'home'
  >
}

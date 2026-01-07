declare namespace Route {
  interface RouteMap {
    "root": "/"
    "not-found": "/:pathMatch(.*)*"
    "home": "/home"
    "login": "/login"
  }

  type RouteKey = keyof RouteMap

  type RoutePath = RouteMap[RouteKey]

    /**
   * the last level route key, which has the page file
   */
  export type LastLevelRouteKey = Extract<
    RouteKey,
    | "login"
    | "home"
  >;
}

import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Root',
    redirect: '/notebook/home',
  },
  {
    path: '/notebook',
    name: 'notebook',
    component: () => import('@/layouts/main/index.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/notebook/home/index.vue'),
        meta: {
          i18nKey: 'route.home',
          title: 'Home',
        },
      },
      {
        path: 'space',
        name: 'space',
        component: () => import('@/views/notebook/space/index.vue'),
        meta: {
          i18nKey: 'route.space',
          title: 'Space',
        },
      },
      {
        path: 'setting',
        name: 'setting',
        component: () => import('@/views/notebook/setting/index.vue'),
        meta: {
          i18nKey: 'route.setting',
          title: 'Setting',
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      i18nKey: 'route.login',
      title: 'Login',
      constant: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/exceptions/404/index.vue'),
    meta: {
      i18nKey: 'route.404',
      title: 'Not Found',
      constant: true,
    },
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/exceptions/403/index.vue'),
    meta: {
      i18nKey: 'route.403',
      title: 'Forbidden',
      constant: true,
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/exceptions/404/index.vue'),
    meta: {
      i18nKey: 'route.404',
      title: 'Not Found',
      constant: true,
    },
  },
]

export const routeMap: Route.RouteMap = {
  'root': '/',
  'home': '/notebook/home',
  'space': '/notebook/space',
  'setting': '/notebook/setting',
  'login': '/login',
  'not-found': '/:pathMatch(.*)*',
  '403': '/403',
  '404': '/404',
}

/**
 * get route name by route path
 * @param path route path
 */
export function getRouteName(path: Route.RoutePath) {
  const routeEntries = Object.entries(routeMap) as [Route.RouteKey, Route.RoutePath][]

  const routeName: Route.RouteKey | null = routeEntries.find(([, routePath]) => routePath === path)?.[0] || null

  return routeName
}

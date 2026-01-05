import type { RouteRecordRaw } from 'vue-router'

export const rootRoute: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: '/home',
}

export const homeRoute: RouteRecordRaw = {
  path: '/home',
  name: 'Home',
  component: () => import('@/views/home/index.vue'),
  meta: {
    i18nKey: 'home',
    title: 'Home',
  },
}

export const loginRoute: RouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login/index.vue'),
  meta: {
    i18nKey: 'login',
    title: 'Login',
  },
}

export const notFoundRoute: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: () => import('@/views/execptions/404/index.vue'),
  meta: {
    i18nKey: 'notFound',
    title: 'Not Found',
  },
}

export const routes: RouteRecordRaw[] = [
  rootRoute,
  homeRoute,
  loginRoute,
  notFoundRoute,
]

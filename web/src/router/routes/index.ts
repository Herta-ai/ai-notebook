import type { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Root",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home/index.vue"),
    meta: {
      i18nKey: "home",
      title: "Home",
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      i18nKey: "login",
      title: "Login",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/views/exceptions/404/index.vue"),
    meta: {
      i18nKey: "notFound",
      title: "Not Found",
      constant: true
    },
  },
];

export const routeMap: Route.RouteMap = {
  root: "/",
  home: "/home",
  login: "/login",
  'not-found': "/:pathMatch(.*)*",
}

import { createRouteGuard } from './route'
import { createProgressGuard } from './progress'
import { createDocumentTitleGuard } from './title'
import type { Router } from 'vue-router'

/**
 * Router guard
 *
 * @param router - Router instance
 */
export function createRouterGuard(router: Router) {
  createProgressGuard(router)
  createRouteGuard(router)
  createDocumentTitleGuard(router)
}

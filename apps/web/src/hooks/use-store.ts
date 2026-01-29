/**
 * inspired by https://github.com/Allen-1998/pinia-auto-refs
 */

import { storeToRefs } from 'pinia'
import { useAppStore, useThemeStore, useUserStore } from '@/store/modules'
import type { StoreDefinition } from 'pinia'
import type { ToRef, UnwrapRef } from 'vue'

type StoreToRefs<T extends StoreDefinition> = {
  [K in keyof ReturnType<T>]: ReturnType<T>[K] extends (...arg: any[]) => any
    ? ReturnType<T>[K]
    : ToRef<UnwrapRef<ReturnType<T>[K]>>
}

interface StoreExports {
  app: typeof useAppStore
  theme: typeof useThemeStore
  user: typeof useUserStore
}

/**
 * A utility function to access a specific Pinia store with auto-ref capabilities.
 *
 * This wrapper automatically converts state properties and getters into Vue Refs
 * (using `storeToRefs`) while keeping actions as callable functions. This allows
 * for direct destructuring in components without losing reactivity.
 *
 * @template T - The key of the store to access (e.g., 'app', 'theme', 'user').
 * @param {T} storeName - The name of the store module to use.
 * @returns {StoreToRefs<StoreExports[T]>} An object containing the store's reactive state/getters (as refs) and actions.
 *
 * @example
 * // Usage in a component:
 * const { count, increment } = useStore('app');
 * // 'count' is a Ref and maintains reactivity
 * // 'increment' is a function
 */
export function useStore<T extends keyof typeof storeExports>(storeName: T): StoreToRefs<StoreExports[T]> {
  const storeExports = {
    app: useAppStore,
    theme: useThemeStore,
    user: useUserStore,
  }

  const targetStore = storeExports[storeName]()
  const storeRefs = storeToRefs(targetStore)
  return { ...targetStore, ...storeRefs } as StoreToRefs<(typeof storeExports)[T]>
}
